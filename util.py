from google.oauth2 import service_account
from googleapiclient.discovery import build
from datetime import datetime, timedelta, date
import pytz
import time, hashlib

class Calendar:
    def __init__(self, credentials_file, calendar, collection, timezone='US/Eastern', days_back=50, day_cutoff=2, tags={}):
        SCOPES = ['https://www.googleapis.com/auth/calendar']
        SERVICE_ACCOUNT_FILE = credentials_file

        # Load credentials
        self.credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        self.service = build('calendar', 'v3', credentials=self.credentials)
        self.calendar = calendar
        self.timezone = timezone
        self.days_back = days_back
        self.collection = collection
        self.cutoff = day_cutoff
        self.tags = tags
    
    def load_events_to_mongodb(self):
        calendar = self.service.events().list(
            calendarId=self.calendar,
            orderBy='startTime',
            singleEvents=True,
            timeMin=pytz.timezone(self.timezone).localize(datetime.now() - timedelta(days=int(abs(self.days_back)))).isoformat(),
            timeMax=pytz.timezone(self.timezone).localize(datetime.now() + timedelta(days=1000)).isoformat(),
            maxResults=9000
        ).execute()

        cycleid = hashlib.sha256(str(time.time()).encode('utf-8')).hexdigest()
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
                expanded_event['end']['timestamp'] = end_dt.timestamp()
                expanded_event['start']['expanded'] = {
                    'year': start_dt.year,
                    'month': start_dt.month,
                    'date': start_dt.day,
                    'hour': start_dt.hour,
                    'minute': start_dt.minute,
                    'second': start_dt.second
                }
                expanded_event['start']['timestamp'] = start_dt.timestamp()
                expanded_event['allDay'] = False
            else:
                start_dt = date.fromisoformat(event['start']['date'])
                end_dt = date.fromisoformat(event['end']['date'])
                expanded_event['end']['expanded'] = {
                    'year': end_dt.year,
                    'month': end_dt.month,
                    'date': end_dt.day,
                    'hour': 0,
                    'minute': 0,
                    'second': 0
                }
                expanded_event['end']['timestamp'] = datetime(end_dt.year, end_dt.month, end_dt.day, 0, 0, 0).timestamp()
                expanded_event['start']['expanded'] = {
                    'year': start_dt.year,
                    'month': start_dt.month,
                    'date': start_dt.day,
                    'hour': 0,
                    'minute': 0,
                    'second': 0
                }
                expanded_event['start']['timestamp'] = datetime(start_dt.year, start_dt.month, start_dt.day, 0, 0, 0).timestamp()
                expanded_event['allDay'] = True
            if not 'location' in expanded_event:
                expanded_event['location'] = None
            if not 'description' in expanded_event:
                expanded_event['description'] = None
            if all([expanded_event['start']['expanded'][i] == expanded_event['end']['expanded'][i] for i in ['year', 'month', 'date']]):
                expanded_event['days'] = [
                    {i:expanded_event['start']['expanded'][i] for i in ['year', 'month', 'date']}
                ]
                expanded_event['days'][0]['day'] = expanded_event['days'][0]['date']
                del expanded_event['days'][0]['date']
            else:
                td = date(*[
                    expanded_event['end']['expanded'][i] for i in ['year', 'month', 'date']
                ]) - date(*[
                    expanded_event['start']['expanded'][i] for i in ['year', 'month', 'date']
                ])
                days = td.days+1
                expanded_event['days'] = [{
                    k:getattr((
                        date(*[expanded_event['start']['expanded'][j] for j in ['year', 'month', 'date']]) + timedelta(days=i)
                    ), k) for k in ['year', 'month', 'day']
                } for i in range(days)]
                if expanded_event['end']['expanded']['hour'] <= self.cutoff and len(expanded_event['days']):
                    del expanded_event['days'][len(expanded_event['days']) - 1]
            expanded_event['cycleId'] = cycleid
            expanded_event['tags'] = [tag for tag in self.tags.keys() if any([
                any(
                    [expanded_event[key['key']].lower() in test.lower() or test.lower() in expanded_event[key['key']].lower() for test in key['tests']]
                ) for key in self.tags[tag]
            ])]
            self.collection.replace_one({'id': event['id']}, expanded_event, upsert=True)
        self.collection.delete_many({'cycleId': {'$not': {'$eq': cycleid}}})
        
