# API Documentation

## The `event` Resource
The `event` resource is returned by all GET API endpoints.
```json
{
    "kind": "calendar#event",
    "etag": "\"tag value\"",
    "id": "Calendar event ID",
    "status": "confirmed",
    "htmlLink": "Link to event in GCal",
    "created": "ISO-formatted timestamp",
    "updated": "ISO-formatted timestamp",
    "summary": "Title",
    "creator": { "email": "creator@email" },
    "organizer": {
        "email": "Calendar ID",
        "displayName": "Calendar name",
        "self": true
    },
    "start": {
        "date": "yyyy-mm-dd",
        "expanded": {
            "year": int year,
            "month": int month,
            "date": int date,
            "hour": int hour,
            "minute": int minute,
            "second": int second
        },
        "timestamp": Timestamp (seconds since epoch)
    },
    "end": {
        "date": "yyyy-mm-dd",
        "expanded": {
            "year": int year,
            "month": int month,
            "date": int date,
            "hour": int hour,
            "minute": int minute,
            "second": int second
        },
        "timestamp": Timestamp (seconds since epoch)
    },
    "iCalUID": "iCalUID",
    "sequence": Sequence #,
    "reminders": { "useDefault": boolean },
    "eventType": "event type",
    "allDay": boolean,
    "location": "string location" or null,
    "description": "string description" or null,
    "days": [{ "year": yyyy, "month": m, "day": d }, ...], Days encompassed by event
    "cycleId": "For internal use",
    "tags": [list of tag names]
}
```

## Methods
- `GET /events/{year}/{month}`: Returns list of all events in a month, sorted by date.
- `GET /events/{year}/{month}/{day_num}`: Returns a list of all events on one day.
- `GET /events/{eid}`: Returns event with ID `eid`.