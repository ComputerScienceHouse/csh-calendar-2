function daysInMonth(month, year) { // Get number of days in month for display
    return new Date(year, month + 1, 0).getDate();
}
function getWeekDay(month, year, day) { // Get the day of the week of the first day of a month
    return new Date(year, month, day).getDay();
}

var DAYS = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri', 'Sat.'];

function condition(c, t, f) {
    if (c) {
        return t;
    } else {
        return f;
    }
}

function zero(n) {
    var v = n.toString();
    if (v.length == 1) {
        return '0'+v;
    } else {
        return v;
    }
}

function timestr(hours, minutes) {
    if (hours == 12) {
        return hours.toString() + condition(minutes != 0, ':' + condition(minutes < 10, '0', '') + minutes.toString(), '') + ' PM';
    }
    if (hours == 0) {
        return "12" + condition(minutes != 0, ':' + condition(minutes < 10, '0', '') + minutes.toString(), '') + ' AM';
    }
    if (hours > 12) {
        return (hours - 12).toString() + condition(minutes != 0, ':' + condition(minutes < 10, '0', '') + minutes.toString(), '') + ' PM';
    } else {
        return hours.toString() + condition(minutes != 0, ':' + condition(minutes < 10, '0', '') + minutes.toString(), '') + ' AM';
    }
}

function MaterialValue(props) { // icon, value, title, styleOverride, isLink
    if (props.styleOverride) {
        var style = props.styleOverride;
    } else {
        var style = {};
    }
    if (props.isLink) {
        style.cursor = 'pointer';
        return <div className="material-value" title={props.title}>
            <span className="material-icons">{props.icon}</span>
            <div className="value" style={style}><a href={props.value}>{props.value}</a></div>
        </div>;
    } else {
        return <div className="material-value" title={props.title}>
            <span className="material-icons">{props.icon}</span>
            <div className="value" style={style}>{props.value}</div>
        </div>;
    }
    
}

function EventView(props) { // event
    var e = props.event;
    var end = new Date(e.end.expanded.year, e.end.expanded.month-1, e.end.expanded.date);
    if (e.end.expanded.hour <= 2) {
        end.setDate(end.getDate() - 1);
    }
    var event_time = (
        zero(e.start.expanded.month) + '/' + zero(e.start.expanded.date) + '/' + e.start.expanded.year +
        condition(
            e.allDay,
            '', ' at ' + timestr(e.start.expanded.hour, e.start.expanded.minute)
        ) + condition(
            e.days.length == 1,
            condition(
                e.allDay,
                ' (All Day)', ' - ' + timestr(e.end.expanded.hour, e.end.expanded.minute)
            ),
            condition(
                e.allDay,
                ' - ' + zero(end.getMonth() + 1) + '/' + zero(end.getDate()) + '/' + end.getFullYear(),
                ' - ' + zero(end.getMonth() + 1) + '/' + zero(end.getDate()) + '/' + end.getFullYear() +
                    ' at ' + timestr(e.end.expanded.hour, e.end.expanded.minute)
            )
        )
    );
    return <div className="event-view view">
        <MaterialValue icon="event" value={e.summary} title="Event Title"/>
        <MaterialValue icon="schedule" value={event_time} title="Event Time"/>
        <MaterialValue icon="room" value={condition(!e.location, 'None Specified', e.location)} title="Event Location"/>
        <MaterialValue icon="article" value={condition(!e.description, 'None Specified', e.description)} title="Event Description" styleOverride={{
            height: "calc(95vh - (6 * 52px) - 35px)",
            "min-height": "220px",
            "white-space": "normal"
        }} />
        <MaterialValue icon="link" value={e.htmlLink} title="Event Link" isLink={true} />
        <MaterialValue icon="person" value={e.creator.email} title="Creator Email" />
        <MaterialValue icon="label" value={e.tags.join(', ')} title="Creator Email" />
    </div>;
}

function handle_event_clicked(e) {
    if (e.target.className == 'event') {
        var eid = e.target.dataset.id;
    } else {
        var eid = e.target.parentElement.dataset.id;
    }
    fetch('/events/'+eid).then(function (data) {
        data.json().then(function (jdata) {
            console.log(jdata);
            ReactDOM.render(<EventView event={jdata} />, document.querySelector('.view-root > .view-area'));
            document.querySelector('.view-root').classList.add('active');
        });
    }, function () {alert('Fetching event with ID '+eid+' failed.')});
}

function Event(props) { // year, month, day, data
    var event = props.data;
    var classes = ['event'];
    if (event.allDay) { classes.push('all-day-event'); }
    if (event.days.length > 1) { classes.push('multi-day-event'); classes.push('shadow-small'); }
    if (event.days.length > 1 && (
        props.year == event.days[0].year &&
        props.month + 1 == event.days[0].month &&
        props.day == event.days[0].day
    )) { classes.push('multi-start'); }
    if (event.days.length > 1 && (
        props.year == event.days[event.days.length - 1].year &&
        props.month + 1 == event.days[event.days.length - 1].month &&
        props.day == event.days[event.days.length - 1].day
    )) { classes.push('multi-end'); }
    var title = condition(
        event.allDay, '', condition(
            event.days.length > 1 && !(
                props.year == event.days[0].year &&
                props.month + 1 == event.days[0].month &&
                props.day == event.days[0].day
            ), '', timestr(event.start.expanded.hour, event.start.expanded.minute) + ' - '
        )
    ) + event.summary + condition(
        event.allDay, '', condition(
            event.days.length > 1 && (
                props.year == event.days[event.days.length - 1].year &&
                props.month + 1 == event.days[event.days.length - 1].month &&
                props.day == event.days[event.days.length - 1].day
            ), ' - ' + timestr(event.end.expanded.hour, event.end.expanded.minute), ''
        )
    );
    return (<span className={classes.join(' ')} data-id={event.id} onClick={handle_event_clicked} title={event.summary}>
        <span className="arrow-start material-icons">chevron_left</span>
        <span className="event-title">{title}<span className="overflow-shroud"></span></span>
        <span className="arrow-end material-icons">chevron_right</span>
    </span>);
}

function Day(props) { // year, month, day, events, dayHeight
    if (!props.events) {
        var events = [];
    } else {
        var events = JSON.parse(props.events);
    }
    var maxDays = daysInMonth(props.month, props.year);
    if (props.day < 1 || props.day > (maxDays)) {
        return (
            <td className="day buffer">

            </td>
        );
    } else {
        var currentDate = new Date(props.year, props.month, props.day);
        var today = new Date(Date.now());
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        var event_elements = [];
        var finalEvent_elements = [];
        for (e of events) {
            var eobj = <Event
                year={props.year}
                month={props.month}
                day={props.day}
                data={e}
            />;
            if (e.allDay || e.days.length > 1) {
                finalEvent_elements.push(eobj);
            } else {
                event_elements.push(eobj);
            }
        }
        for (e of event_elements) {
            finalEvent_elements.push(e);
        }

        var original_length = finalEvent_elements.length;
        if (finalEvent_elements.length * 20 > props.dayHeight - 20) {
            finalEvent_elements = finalEvent_elements.slice(0, Math.floor(props.dayHeight / 20) - 2);
        }
        return (
            <td className={'day' + condition((
                currentDate.getFullYear() == today.getFullYear() && 
                currentDate.getMonth() == today.getMonth() && 
                currentDate.getDate() == today.getDate()
            ), ' today', '') + condition((
                props.day < today.getDate() && 
                currentDate.getMonth() == today.getMonth() && 
                currentDate.getFullYear() == today.getFullYear()
            ), ' past', '') + condition(
                original_length > finalEvent_elements.length, ' incomplete', ''
            )} date={currentDate.getTime()} day={currentDate.getDate()}>
                <span className="day-number"><span>{props.day}</span></span>
                <span className="day-name">{DAYS[currentDate.getDay()]}</span>
                <div className="day-events">
                    {finalEvent_elements}
                    <span className="incomplete-number">+{original_length - finalEvent_elements.length} more.</span>
                </div>
            </td>
        );
    }
}

function CalendarDays(props) { // month, year, events
    var events = JSON.parse(props.events);
    var days = daysInMonth(props.month, props.year);
    var firstDayWeekDay = getWeekDay(props.month, props.year, 1);
    
    var numRows = Math.ceil((firstDayWeekDay + days) / 7);
    var calendarRows = [];

    if (window.innerWidth <= 1100) {
        var dayHeight = 115;
    } else {
        var dayHeight = Math.floor(((window.innerHeight * 0.95) - 88) / numRows) - 45;
    }

    var currentDay = -firstDayWeekDay + 1;
    for (var row = 0; row < numRows; row++) {
        var rowItems = [];
        for (var day = 0; day < 7; day++) {
            rowItems.push(<Day
                year={props.year}
                month={props.month}
                day={currentDay}
                events={JSON.stringify(events[currentDay])}
                dayHeight={dayHeight}
            />);
            currentDay++;
        }
        const calRowStyle = {
            height: 'calc(100% / '+numRows.toString()+')'
        };
        var calendarRow = (<tr style={calRowStyle}>
            {rowItems}
        </tr>);
        calendarRows.push(calendarRow);
    }

    var desktopCalendar = (
        <table className='day-table desktop'>
            <tbody>
                {calendarRows}
            </tbody>
        </table>
    );
    
    var mobileCalendarItems = [];
    for (var day = 1; day <= days; day++) {
        mobileCalendarItems.push(
            <tr>
                <Day
                    year={props.year}
                    month={props.month}
                    day={day}
                    events={JSON.stringify(events[day])}
                    dayHeight={115}
                />
            </tr>
        );
    }
    var mobileCalendar = (
        <table className='day-table mobile'>
            <tbody>
                {mobileCalendarItems}
            </tbody>
        </table>
    );
    return [desktopCalendar, mobileCalendar];
}