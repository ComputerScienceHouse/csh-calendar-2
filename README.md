# csh-calendar-2
More appealing &amp; functional version of calendar.csh.rit.edu

## Current Feature Set
- Page responsiveness - i.e. you can use it on a phone or (almost) any other screen size and it'll work and actually look good.
- General calendar features in parity with the Google Calendar implementation (basically it works as you'd expect it to)
- Single day view, with event overlap and support for all-day and multi-day events
- Single event view, with a configurable tag system to mark certain events as directorship meetings, house meetings, etc
- High configurability in general, including the tag system, runtime address and port, MongoDB settings, calendar ID, and more.
- A simple backend REST API for other people's projects to fetch CSH calendar data from without needing to deal with the Google API
- Configurable themes for certain days

## Future Features
- Search function to find events
- Support for multiple calendars
- Integration with [BetterVent](https://github.com/ComputerScienceHouse/BetterVent)
- Integration with [Jumpstart](https://github.com/Dr-N0/Jumpstart)
  
## Documentation
- [API Docs](API.md)
- [Configuration Docs](CONFIGURATION.md)
