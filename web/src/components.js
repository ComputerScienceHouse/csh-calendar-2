function daysInMonth(month, year) {
    // Get number of days in month for display
    return new Date(year, month + 1, 0).getDate();
}
function getWeekDay(month, year, day) {
    // Get the day of the week of the first day of a month
    return new Date(year, month, day).getDay();
}

var DAYS = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri", "Sat."];
var HOURS = [
    "12 AM",
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
];

function zero(n) {
    var v = n.toString();
    if (v.length == 1) {
        return "0" + v;
    } else {
        return v;
    }
}

function timestr(hours, minutes) {
    if (hours == 12) {
        return (
            hours.toString() +
            (minutes != 0
                ? ":" + (minutes < 10 ? "0" : "") + minutes.toString()
                : "") +
            " PM"
        );
    }
    if (hours == 0) {
        return (
            "12" +
            (minutes != 0
                ? ":" + (minutes < 10 ? "0" : "") + minutes.toString()
                : "") +
            " AM"
        );
    }
    if (hours > 12) {
        return (
            (hours - 12).toString() +
            (minutes != 0
                ? ":" + (minutes < 10 ? "0" : "") + minutes.toString()
                : "") +
            " PM"
        );
    } else {
        return (
            hours.toString() +
            (minutes != 0
                ? ":" + (minutes < 10 ? "0" : "") + minutes.toString()
                : "") +
            " AM"
        );
    }
}

function MaterialValue(props) {
    // icon, value, title, styleOverride, isLink
    if (props.styleOverride) {
        var style = props.styleOverride;
        if (props.value.length == 0) {
            var exclass = " empty";
        } else {
            var exclass = "";
        }
    } else {
        var style = {};
        var exclass = "";
    }
    if (props.isLink) {
        style.cursor = "pointer";
        return (
            <div className="material-value" title={props.title}>
                <span className="material-icons">{props.icon}</span>
                <div className="value" style={style}>
                    <a href={props.value}>{props.value}</a>
                    {exclass.length > 0 ? (
                        <span className="empty-indicator">{"[ EMPTY ]"}</span>
                    ) : (
                        <span></span>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div className="material-value" title={props.title}>
                <span className="material-icons">{props.icon}</span>
                <div className="value" style={style}>
                    {props.value}
                    {exclass.length > 0 ? (
                        <span className="empty-indicator">{"[ EMPTY ]"}</span>
                    ) : (
                        <span></span>
                    )}
                </div>
            </div>
        );
    }
}

function EventView(props) {
    // event
    var e = props.event;
    var end = new Date(
        e.end.expanded.year,
        e.end.expanded.month - 1,
        e.end.expanded.date
    );
    if (e.end.expanded.hour <= 2) {
        end.setDate(end.getDate() - 1);
    }
    var event_time =
        zero(e.start.expanded.month) +
        "/" +
        zero(e.start.expanded.date) +
        "/" +
        e.start.expanded.year +
        (e.allDay
            ? ""
            : " at " +
              timestr(e.start.expanded.hour, e.start.expanded.minute)) +
        (e.days.length == 1
            ? e.allDay
                ? " (All Day)"
                : " - " + timestr(e.end.expanded.hour, e.end.expanded.minute)
            : e.allDay
            ? " - " +
              zero(end.getMonth() + 1) +
              "/" +
              zero(end.getDate()) +
              "/" +
              end.getFullYear()
            : " - " +
              zero(end.getMonth() + 1) +
              "/" +
              zero(end.getDate()) +
              "/" +
              end.getFullYear() +
              " at " +
              timestr(e.end.expanded.hour, e.end.expanded.minute));
    return (
        <div className="event-view view">
            <MaterialValue icon="event" value={e.summary} title="Event Title" />
            <MaterialValue
                icon="schedule"
                value={event_time}
                title="Event Time"
            />
            <MaterialValue
                icon="room"
                value={!e.location ? "None Specified" : e.location}
                title="Event Location"
            />
            <MaterialValue
                icon="article"
                value={!e.description ? "" : e.description}
                title="Event Description"
                styleOverride={{
                    height: "calc(95vh - (6 * 52px) - 35px)",
                    "min-height": "220px",
                    "white-space": "normal",
                    "overflow-y": "auto",
                }}
            />
            <MaterialValue
                icon="link"
                value={e.htmlLink}
                title="Event Link"
                isLink={true}
            />
            <MaterialValue
                icon="person"
                value={e.creator.email}
                title="Creator Email"
            />
            <MaterialValue
                icon="label"
                value={e.tags.join(", ")}
                title="Creator Email"
            />
        </div>
    );
}

function handle_event_clicked(e) {
    if (e.target.className == "event") {
        var eid = e.target.dataset.id;
    } else {
        var eid = e.target.parentElement.dataset.id;
    }
    fetch("/events/" + eid).then(
        function (data) {
            data.json().then(function (jdata) {
                console.log(jdata);
                ReactDOM.render(
                    <EventView event={jdata} />,
                    document.querySelector(".view-root > .view-area")
                );
                document.querySelector(".view-root").classList.add("active");
            });
        },
        function () {
            alert("Fetching event with ID " + eid + " failed.");
        }
    );
}

function SingleDayEvent_allDay(props) {
    // event, date
    console.log(props.event.days, {
        date: props.date.getDate() + 1,
        month: props.date.getMonth() + 1,
        year: props.date.getFullYear(),
    });
    return (
        <div
            className={
                "event" +
                (props.event.days.length > 1 ? " multi" : "") +
                (props.event.days.length > 1 &&
                props.date.getDate() == props.event.days[0].day &&
                props.date.getMonth() + 1 == props.event.days[0].month &&
                props.date.getFullYear() == props.event.days[0].year
                    ? " start"
                    : "") +
                (props.event.days.length > 1 &&
                props.date.getDate() ==
                    props.event.days[props.event.days.length - 1].day &&
                props.date.getMonth() + 1 ==
                    props.event.days[props.event.days.length - 1].month &&
                props.date.getFullYear() ==
                    props.event.days[props.event.days.length - 1].year
                    ? " end"
                    : "")
            }
        >
            <span className="arrow-start material-icons">chevron_left</span>
            <span className="event-title">
                {(props.event.days.length > 1 &&
                props.date.getDate() == props.event.days[0].day &&
                props.date.getMonth() + 1 == props.event.days[0].month &&
                props.date.getFullYear() == props.event.days[0].year &&
                !props.event.allDay
                    ? timestr(
                          props.event.start.expanded.hour,
                          props.event.start.expanded.minute
                      ) + " - "
                    : "") +
                    props.event.summary +
                    (props.event.days.length > 1 &&
                    props.date.getDate() ==
                        props.event.days[props.event.days.length - 1].day &&
                    props.date.getMonth() + 1 ==
                        props.event.days[props.event.days.length - 1].month &&
                    props.date.getFullYear() ==
                        props.event.days[props.event.days.length - 1].year &&
                    !props.event.allDay
                        ? " - " +
                          timestr(
                              props.event.end.expanded.hour,
                              props.event.end.expanded.minute
                          )
                        : "")}
            </span>
            <span className="arrow-end material-icons">chevron_right</span>
        </div>
    );
}

function SingleDayView(props) {
    // events, date
    console.log(props.events);
    var allDayEvents = [];
    for (e of props.events) {
        if (e.allDay || e.days.length > 1) {
            allDayEvents.push(e);
        }
    }
    return (
        <div className="day-view view">
            <div className="all-day-events">
                {allDayEvents.length > 0 ? (
                    allDayEvents.map(function (e) {
                        return (
                            <SingleDayEvent_allDay
                                event={e}
                                date={props.date}
                            />
                        );
                    })
                ) : (
                    <span className="no-events">No All-Day Events</span>
                )}
            </div>
            <div className="events" style={{height: allDayEvents.length > 0 ? 'calc(100% - ' + (40 * allDayEvents.length + 15) + 'px)' : 'calc(100% - 44px)'}}>
                <div className="hours">
                    {HOURS.map(function (h) {
                        return (
                            <div className="hour">
                                <span>{h}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function Event(props) {
    // year, month, day, data
    var event = props.data;
    var classes = ["event"];
    if (event.allDay) {
        classes.push("all-day-event");
    }
    if (event.days.length > 1) {
        classes.push("multi-day-event");
        classes.push("shadow-small");
    }
    if (
        event.days.length > 1 &&
        props.year == event.days[0].year &&
        props.month + 1 == event.days[0].month &&
        props.day == event.days[0].day
    ) {
        classes.push("multi-start");
    }
    if (
        event.days.length > 1 &&
        props.year == event.days[event.days.length - 1].year &&
        props.month + 1 == event.days[event.days.length - 1].month &&
        props.day == event.days[event.days.length - 1].day
    ) {
        classes.push("multi-end");
    }
    var title =
        (event.allDay
            ? ""
            : event.days.length > 1 &&
              !(
                  props.year == event.days[0].year &&
                  props.month + 1 == event.days[0].month &&
                  props.day == event.days[0].day
              )
            ? ""
            : timestr(event.start.expanded.hour, event.start.expanded.minute) +
              " - ") +
        event.summary +
        (event.allDay
            ? ""
            : event.days.length > 1 &&
              props.year == event.days[event.days.length - 1].year &&
              props.month + 1 == event.days[event.days.length - 1].month &&
              props.day == event.days[event.days.length - 1].day
            ? " - " +
              timestr(event.end.expanded.hour, event.end.expanded.minute)
            : "");
    return (
        <span
            className={classes.join(" ")}
            data-id={event.id}
            onClick={handle_event_clicked}
            title={event.summary}
        >
            <span className="arrow-start material-icons">chevron_left</span>
            <span className="event-title">
                {title}
                <span className="overflow-shroud"></span>
            </span>
            <span className="arrow-end material-icons">chevron_right</span>
        </span>
    );
}

function Day(props) {
    // year, month, day, events, dayHeight
    if (!props.events) {
        var events = [];
    } else {
        var events = JSON.parse(props.events);
    }
    var maxDays = daysInMonth(props.month, props.year);
    if (props.day < 1 || props.day > maxDays) {
        return <td className="day buffer"></td>;
    } else {
        var currentDate = new Date(props.year, props.month, props.day);
        var today = new Date(Date.now());
        today = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
        var event_elements = [];
        var finalEvent_elements = [];
        for (e of events) {
            var eobj = (
                <Event
                    year={props.year}
                    month={props.month}
                    day={props.day}
                    data={e}
                />
            );
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
            finalEvent_elements = finalEvent_elements.slice(
                0,
                Math.floor(props.dayHeight / 20) - 2
            );
        }
        return (
            <td
                className={
                    "day" +
                    (currentDate.getFullYear() == today.getFullYear() &&
                    currentDate.getMonth() == today.getMonth() &&
                    currentDate.getDate() == today.getDate()
                        ? " today"
                        : "") +
                    (props.day < today.getDate() &&
                    currentDate.getMonth() == today.getMonth() &&
                    currentDate.getFullYear() == today.getFullYear()
                        ? " past"
                        : "") +
                    (original_length > finalEvent_elements.length
                        ? " incomplete"
                        : "")
                }
                date={currentDate.getTime()}
                day={currentDate.getDate()}
                onClick={function (e) {
                    if (
                        e.target.classList.contains("day") ||
                        e.target.classList.contains("day-events") ||
                        e.target.classList.contains("day-number")
                    ) {
                        var dayDate = new Date(
                            Number(
                                e.target.closest(".day").attributes.date.value
                            )
                        );
                        fetch(
                            "/events/" +
                                dayDate.getFullYear() +
                                "/" +
                                (dayDate.getMonth() + 1) +
                                "/" +
                                dayDate.getDate()
                        ).then(function (response) {
                            response.json().then(function (data) {
                                ReactDOM.render(
                                    <SingleDayView
                                        events={data}
                                        date={dayDate}
                                    />,
                                    document.querySelector(
                                        ".view-root > .view-area"
                                    )
                                );
                                document
                                    .querySelector(".view-root")
                                    .classList.add("active");
                            });
                        });
                    }
                }}
            >
                <span className="day-number">
                    <span>{props.day}</span>
                </span>
                <span className="day-name">{DAYS[currentDate.getDay()]}</span>
                <div className="day-events">
                    {finalEvent_elements}
                    <span className="incomplete-number">
                        +{original_length - finalEvent_elements.length} more.
                    </span>
                </div>
            </td>
        );
    }
}

function CalendarDays(props) {
    // month, year, events
    var events = JSON.parse(props.events);
    var days = daysInMonth(props.month, props.year);
    var firstDayWeekDay = getWeekDay(props.month, props.year, 1);

    var numRows = Math.ceil((firstDayWeekDay + days) / 7);
    var calendarRows = [];

    if (window.innerWidth <= 1100) {
        var dayHeight = 115;
    } else {
        var dayHeight =
            Math.floor((window.innerHeight * 0.95 - 88) / numRows) - 45;
    }

    var currentDay = -firstDayWeekDay + 1;
    for (var row = 0; row < numRows; row++) {
        var rowItems = [];
        for (var day = 0; day < 7; day++) {
            rowItems.push(
                <Day
                    year={props.year}
                    month={props.month}
                    day={currentDay}
                    events={JSON.stringify(events[currentDay])}
                    dayHeight={dayHeight}
                />
            );
            currentDay++;
        }
        const calRowStyle = {
            height: "calc(100% / " + numRows.toString() + ")",
        };
        var calendarRow = <tr style={calRowStyle}>{rowItems}</tr>;
        calendarRows.push(calendarRow);
    }

    var desktopCalendar = (
        <table className="day-table desktop">
            <tbody>{calendarRows}</tbody>
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
        <table className="day-table mobile">
            <tbody>{mobileCalendarItems}</tbody>
        </table>
    );
    return [desktopCalendar, mobileCalendar];
}
