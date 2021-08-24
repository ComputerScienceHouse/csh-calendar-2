from google.oauth2 import service_account
from googleapiclient.discovery import build
from datetime import datetime, timedelta, date
import pytz
from concurrent.futures import ThreadPoolExecutor

class Calendar:
    def __init__(self, credentials_file, calendar, collection, timezone='US/Eastern', days_back=50):
        SCOPES = ['https://www.googleapis.com/auth/calendar']
        SERVICE_ACCOUNT_FILE = credentials_file

        # Load credentials
        self.credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        self.service = build('calendar', 'v3', credentials=self.credentials)
        self.calendar = calendar
        self.timezone = timezone
        self.days_back = days_back
        self.collection = collection
        print(self.collection.name)
    
    def load_events_to_mongodb(self):
        calendar = self.service.events().list(
            calendarId=self.calendar,
            orderBy='startTime',
            singleEvents=True,
            timeMin=pytz.timezone(self.timezone).localize(datetime.now() - timedelta(days=int(abs(self.days_back)))).isoformat(),
            timeMax=pytz.timezone(self.timezone).localize(datetime.now() + timedelta(days=1000)).isoformat(),
            maxResults=9000
        ).execute()
        for event in calendar['items']:
            expanded_event = event.copy()
            if 'dateTime' in event['start'].keys():
                start_dt = datetime.fromisoformat(event['start']['dateTime'])
                end_dt = datetime.fromisoformat(event['end']['dateTime'])
                expanded_event['end']['expanded'] = {
                    'year': end_dt.year,
                    'month': end_dt.month,
                    'date': end_dt.day,
                    'hour': end_dt.hour,
                    'minute': end_dt.minute,
                    'second': end_dt.second
                }
                expanded_event['start']['expanded'] = {
                    'year': start_dt.year,
                    'month': start_dt.month,
                    'date': start_dt.day,
                    'hour': start_dt.hour,
                    'minute': start_dt.minute,
                    'second': start_dt.second
                }
            else:
                start_dt = date.fromisoformat(event['start']['date'])
                end_dt = date.fromisoformat(event['end']['date'])
                expanded_event['end']['expanded'] = {
                    'year': end_dt.year,
                    'month': end_dt.month,
                    'date': end_dt.day,
                    'hour': 23,
                    'minute': 59,
                    'second': 59
                }
                expanded_event['start']['expanded'] = {
                    'year': start_dt.year,
                    'month': start_dt.month,
                    'date': start_dt.day,
                    'hour': 0,
                    'minute': 0,
                    'second': 0
                }
            self.collection.replace_one({'id': event['id']}, expanded_event, upsert=True)
        
