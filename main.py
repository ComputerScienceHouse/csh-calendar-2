import json
import logging
from logging import debug, info, warning, error, critical, exception
from util import Calendar
from pymongo import MongoClient
import threading
import time
from fastapi import FastAPI
import uvicorn
import os

LOGFORMAT = "{levelname} - {processName}:{pathname}:{funcName}:{lineno} @ {asctime} > {message}"
LOGLEVEL = 'INFO'

logging.basicConfig(
    format=LOGFORMAT,
    level=LOGLEVEL,
    style='{'
)

def updateCalendarLoop(calendar: Calendar, delay):
    calendar.load_events_to_mongodb()
    time.sleep(delay)

if __name__ == '__main__':
    # Load config file from config.json
    info('Loading configuration from config.json')
    try:
        with open('config.json', 'r') as c:
            CONFIG = json.loads(c.read())
        debug('Loaded config.')
    except FileNotFoundError:
        critical('Failed to load config. Make sure config.json exists.')
        exit(0)
    os.environ['csh-config'] = json.dumps(CONFIG)
    
    # Connect to mongodb instance
    debug(f'Connecting to mongodb at {CONFIG["database"]["address"]}')
    CLIENT = MongoClient(CONFIG["database"]["address"])
    mongo_db = CLIENT[CONFIG["database"]["database"]]
    mongo_collection = mongo_db['events']
else:
    # Load config from envvars
    CONFIG = json.loads(os.environ['csh-config'])

    # Connect to mongodb instance
    debug(f'Connecting to mongodb at {CONFIG["database"]["address"]}')
    CLIENT = MongoClient(CONFIG["database"]["address"])
    mongo_db = CLIENT[CONFIG["database"]["database"]]
    mongo_collection = mongo_db['events']

app = FastAPI()

@app.get('/events/{year}/{month}')
async def get_events(year: int, month: int):
    events = list(mongo_collection.find({'start.expanded.year': year, 'start.expanded.month': month}))
    for e in events:
        del e['_id']
    return events

if __name__ == '__main__':
    # Load calendar and start update thread
    debug('Loading Calendar object.')
    calendar = Calendar(
        CONFIG['serviceAccountCredentials'], 
        CONFIG['calendarId'], 
        mongo_collection,
        timezone=CONFIG['timezone'], 
        days_back=CONFIG['recordDaysBack']
    )

    info('Starting update thread.')
    threading.Thread(
        name='update-calendar-loop', 
        target=updateCalendarLoop, 
        args=[
            calendar, 
            CONFIG['calendarUpdateInterval']
        ], 
        daemon=True
    ).start()

    info('Starting FastAPI server...')
    uvicorn.run('main:app', host=CONFIG['runtime']['host'], port=CONFIG['runtime']['port'], access_log=False)