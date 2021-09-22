# Configuration Docs

## System Configuration (`config.json`)
```json
{
    "serviceAccountCredentials": "path/to/serviceAccountCreds.json",
    "calendarId": "calendarId@group.calendar.google.com",
    "timezone": "COUNTRY/Zone",
    "recordDaysBack": Days before current date to store events,
    "database": {
        "address": "mongodb://ip:port",
        "database": "database name"
    },
    "calendarUpdateInterval": Seconds between DB updates,
    "runtime": {
        "host": "ip",
        "port": port
    },
    "dayCutoffHour": Hour to cutoff events at (events ending before this will be treated as ending during the previous day.),
    "tags": {
        "Tag Name": [
            {
                "key": "Key in event resource to check against",
                "tests": [
                    "String to look for",...
                ]
            },...
        ]
    } 
}
```

## Theme Configuration (`web/themeDays.json`)
```json
{
    "theme name": {
        "date": {
            "month": month #,
            "day": day #
        },
        "theme": {
            "primary": {
                "light": "hex code",
                "normal": "hex code",
                "dark": "hex code",
                "text": "hex code"
            },
            "secondary": {
                "light": "hex code",
                "normal": "hex code",
                "dark": "hex code",
                "text": "hex code"
            }
        }
    }, ...
}
```