var _jsxFileName = "src/components.js";
function daysInMonth(month, year) {
    // Get number of days in month for display
    return new Date(year, month + 1, 0).getDate();
}
function getWeekDay(month, year, day) {
    // Get the day of the week of the first day of a month
    return new Date(year, month, day).getDay();
}

var DAYS = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri", "Sat."];
var HOURS = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"];

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
        return hours.toString() + (minutes != 0 ? ":" + (minutes < 10 ? "0" : "") + minutes.toString() : "") + " PM";
    }
    if (hours == 0) {
        return "12" + (minutes != 0 ? ":" + (minutes < 10 ? "0" : "") + minutes.toString() : "") + " AM";
    }
    if (hours > 12) {
        return (hours - 12).toString() + (minutes != 0 ? ":" + (minutes < 10 ? "0" : "") + minutes.toString() : "") + " PM";
    } else {
        return hours.toString() + (minutes != 0 ? ":" + (minutes < 10 ? "0" : "") + minutes.toString() : "") + " AM";
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
        return React.createElement(
            "div",
            { className: "material-value", title: props.title, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 101
                },
                __self: this
            },
            React.createElement(
                "span",
                { className: "material-icons", __source: {
                        fileName: _jsxFileName,
                        lineNumber: 102
                    },
                    __self: this
                },
                props.icon
            ),
            React.createElement(
                "div",
                { className: "value", style: style, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 103
                    },
                    __self: this
                },
                React.createElement(
                    "a",
                    { href: props.value, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 104
                        },
                        __self: this
                    },
                    props.value
                ),
                exclass.length > 0 ? React.createElement(
                    "span",
                    { className: "empty-indicator", __source: {
                            fileName: _jsxFileName,
                            lineNumber: 106
                        },
                        __self: this
                    },
                    "[ EMPTY ]"
                ) : React.createElement("span", {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 108
                    },
                    __self: this
                })
            )
        );
    } else {
        return React.createElement(
            "div",
            { className: "material-value", title: props.title, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 115
                },
                __self: this
            },
            React.createElement(
                "span",
                { className: "material-icons", __source: {
                        fileName: _jsxFileName,
                        lineNumber: 116
                    },
                    __self: this
                },
                props.icon
            ),
            React.createElement(
                "div",
                { className: "value", style: style, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 117
                    },
                    __self: this
                },
                props.value,
                exclass.length > 0 ? React.createElement(
                    "span",
                    { className: "empty-indicator", __source: {
                            fileName: _jsxFileName,
                            lineNumber: 120
                        },
                        __self: this
                    },
                    "[ EMPTY ]"
                ) : React.createElement("span", {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 122
                    },
                    __self: this
                })
            )
        );
    }
}

function EventView(props) {
    // event
    var e = props.event;
    var end = new Date(e.end.expanded.year, e.end.expanded.month - 1, e.end.expanded.date);
    if (e.end.expanded.hour <= 2) {
        end.setDate(end.getDate() - 1);
    }
    var event_time = zero(e.start.expanded.month) + "/" + zero(e.start.expanded.date) + "/" + e.start.expanded.year + (e.allDay ? "" : " at " + timestr(e.start.expanded.hour, e.start.expanded.minute)) + (e.days.length == 1 ? e.allDay ? " (All Day)" : " - " + timestr(e.end.expanded.hour, e.end.expanded.minute) : e.allDay ? " - " + zero(end.getMonth() + 1) + "/" + zero(end.getDate()) + "/" + end.getFullYear() : " - " + zero(end.getMonth() + 1) + "/" + zero(end.getDate()) + "/" + end.getFullYear() + " at " + timestr(e.end.expanded.hour, e.end.expanded.minute));
    return React.createElement(
        "div",
        { className: "event-view view", __source: {
                fileName: _jsxFileName,
                lineNumber: 171
            },
            __self: this
        },
        React.createElement(MaterialValue, { icon: "event", value: e.summary, title: "Event Title", __source: {
                fileName: _jsxFileName,
                lineNumber: 172
            },
            __self: this
        }),
        React.createElement(MaterialValue, {
            icon: "schedule",
            value: event_time,
            title: "Event Time",
            __source: {
                fileName: _jsxFileName,
                lineNumber: 173
            },
            __self: this
        }),
        React.createElement(MaterialValue, {
            icon: "room",
            value: !e.location ? "None Specified" : e.location,
            title: "Event Location",
            __source: {
                fileName: _jsxFileName,
                lineNumber: 178
            },
            __self: this
        }),
        React.createElement(MaterialValue, {
            icon: "article",
            value: !e.description ? "" : e.description,
            title: "Event Description",
            styleOverride: {
                height: "calc(95vh - (6 * 52px) - 35px)",
                "min-height": "220px",
                "white-space": "normal",
                "overflow-y": "auto"
            },
            __source: {
                fileName: _jsxFileName,
                lineNumber: 183
            },
            __self: this
        }),
        React.createElement(MaterialValue, {
            icon: "link",
            value: e.htmlLink,
            title: "Event Link",
            isLink: true,
            __source: {
                fileName: _jsxFileName,
                lineNumber: 194
            },
            __self: this
        }),
        React.createElement(MaterialValue, {
            icon: "person",
            value: e.creator.email,
            title: "Creator Email",
            __source: {
                fileName: _jsxFileName,
                lineNumber: 200
            },
            __self: this
        }),
        React.createElement(MaterialValue, {
            icon: "label",
            value: e.tags.join(", "),
            title: "Creator Email",
            __source: {
                fileName: _jsxFileName,
                lineNumber: 205
            },
            __self: this
        })
    );
}

function handle_event_clicked(e) {
    if (e.target.className == "event") {
        var eid = e.target.dataset.id;
    } else {
        var eid = e.target.parentElement.dataset.id;
    }
    fetch("/events/" + eid).then(function (data) {
        data.json().then(function (jdata) {
            console.log(jdata);
            ReactDOM.render(React.createElement(EventView, { event: jdata, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 225
                },
                __self: this
            }), document.querySelector(".view-root > .view-area"));
            document.querySelector(".view-root").classList.add("active");
        });
    }, function () {
        alert("Fetching event with ID " + eid + " failed.");
    });
}

function SingleDayEvent_allDay(props) {
    // event, date
    console.log(props.event.days, {
        date: props.date.getDate() + 1,
        month: props.date.getMonth() + 1,
        year: props.date.getFullYear()
    });
    return React.createElement(
        "div",
        {
            className: "event" + (props.event.days.length > 1 ? " multi" : "") + (props.event.days.length > 1 && props.date.getDate() == props.event.days[0].day && props.date.getMonth() + 1 == props.event.days[0].month && props.date.getFullYear() == props.event.days[0].year ? " start" : "") + (props.event.days.length > 1 && props.date.getDate() == props.event.days[props.event.days.length - 1].day && props.date.getMonth() + 1 == props.event.days[props.event.days.length - 1].month && props.date.getFullYear() == props.event.days[props.event.days.length - 1].year ? " end" : ""),
            __source: {
                fileName: _jsxFileName,
                lineNumber: 245
            },
            __self: this
        },
        React.createElement(
            "span",
            { className: "arrow-start material-icons", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 266
                },
                __self: this
            },
            "chevron_left"
        ),
        React.createElement(
            "span",
            { className: "event-title", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 267
                },
                __self: this
            },
            (props.event.days.length > 1 && props.date.getDate() == props.event.days[0].day && props.date.getMonth() + 1 == props.event.days[0].month && props.date.getFullYear() == props.event.days[0].year && !props.event.allDay ? timestr(props.event.start.expanded.hour, props.event.start.expanded.minute) + " - " : "") + props.event.summary + (props.event.days.length > 1 && props.date.getDate() == props.event.days[props.event.days.length - 1].day && props.date.getMonth() + 1 == props.event.days[props.event.days.length - 1].month && props.date.getFullYear() == props.event.days[props.event.days.length - 1].year && !props.event.allDay ? " - " + timestr(props.event.end.expanded.hour, props.event.end.expanded.minute) : "")
        ),
        React.createElement(
            "span",
            { className: "arrow-end material-icons", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 294
                },
                __self: this
            },
            "chevron_right"
        )
    );
}

function TimedEvent(props) {
    //event, allevents, index
    var timeDelta = new Date(props.event.end.timestamp * 1000 - props.event.start.timestamp * 1000);
    var tstamp = new Date(props.event.start.timestamp * 1000);
    return React.createElement(
        "div",
        {
            className: "timed-event shadow-small",
            style: {
                width: "calc(" + 100 / props.event.overlap.length + "% - 10px)",
                height: 128 * timeDelta.getUTCHours() + 128 / 60 * timeDelta.getUTCMinutes() - 10 + "px",
                left: "calc(" + 100 / (props.event.overlap.length == 0 ? 1 : props.event.overlap.length) * function (props) {
                    for (var i = 0; i < props.event.overlap.length; i++) {
                        if (props.event.overlap[i].number == props.index) {
                            return i;
                        }
                    }
                }(props) + "% + 5px)",
                top: 128 * tstamp.getHours() + 128 / 60 * tstamp.getMinutes() + 17.5 + "px"
            },
            __source: {
                fileName: _jsxFileName,
                lineNumber: 306
            },
            __self: this
        },
        React.createElement(
            "span",
            { className: "title", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 342
                },
                __self: this
            },
            props.event.summary
        ),
        React.createElement(
            "span",
            { className: "time", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 343
                },
                __self: this
            },
            timestr(props.event.start.expanded.hour, props.event.start.expanded.minute) + " - " + timestr(props.event.end.expanded.hour, props.event.end.expanded.minute)
        )
    );
}

function SingleDayView(props) {
    // events, date
    console.log(props.events);
    var allDayEvents = [];
    var dayEvents = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = props.events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            e = _step.value;

            if (e.allDay || e.days.length > 1) {
                allDayEvents.push(e);
            } else {
                dayEvents.push(e);
            }
        }

        // Giant mega-conditional to figure out if events overlap
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    for (var e = 0; e < dayEvents.length; e++) {
        dayEvents[e].overlap = [];
        for (var s = 0; s < dayEvents.length; s++) {
            if (dayEvents[e].start.timestamp <= dayEvents[s].start.timestamp && dayEvents[e].end.timestamp >= dayEvents[s].end.timestamp || // Event encompasses check event
            dayEvents[e].start.timestamp >= dayEvents[s].start.timestamp && dayEvents[e].end.timestamp <= dayEvents[s].end.timestamp || // Event is encompassed by check event
            dayEvents[e].start.timestamp <= dayEvents[s].start.timestamp && dayEvents[e].end.timestamp > dayEvents[s].start.timestamp && dayEvents[e].end.timestamp <= dayEvents[s].end.timestamp || // Event starts before check, ends before check
            dayEvents[e].end.timestamp >= dayEvents[s].end.timestamp && dayEvents[e].start.timestamp < dayEvents[s].end.timestamp && dayEvents[e].start.timestamp >= dayEvents[s].start.timestamp // Event starts after check, ends after check
            ) {
                    dayEvents[e].overlap.push({
                        id: dayEvents[s].id,
                        number: s,
                        encompass: dayEvents[e].start.timestamp <= dayEvents[s].start.timestamp && dayEvents[e].end.timestamp >= dayEvents[s].end.timestamp,
                        encompassed: dayEvents[e].start.timestamp >= dayEvents[s].start.timestamp && dayEvents[e].end.timestamp <= dayEvents[s].end.timestamp,
                        overlapBefore: dayEvents[e].start.timestamp <= dayEvents[s].start.timestamp && dayEvents[e].end.timestamp > dayEvents[s].start.timestamp && dayEvents[e].end.timestamp <= dayEvents[s].end.timestamp,
                        overlapAfter: dayEvents[e].end.timestamp >= dayEvents[s].end.timestamp && dayEvents[e].start.timestamp < dayEvents[s].end.timestamp && dayEvents[e].start.timestamp >= dayEvents[s].start.timestamp
                    });
                }
        }
    }
    console.log(dayEvents);
    return React.createElement(
        "div",
        { className: "day-view view", __source: {
                fileName: _jsxFileName,
                lineNumber: 421
            },
            __self: this
        },
        React.createElement(
            "div",
            { className: "all-day-events", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 422
                },
                __self: this
            },
            allDayEvents.length > 0 ? allDayEvents.map(function (e) {
                return React.createElement(SingleDayEvent_allDay, {
                    event: e,
                    date: props.date,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 426
                    },
                    __self: this
                });
            }) : React.createElement(
                "span",
                { className: "no-events", __source: {
                        fileName: _jsxFileName,
                        lineNumber: 433
                    },
                    __self: this
                },
                "No All-Day Events"
            )
        ),
        React.createElement(
            "div",
            {
                className: "events",
                style: {
                    height: allDayEvents.length > 0 ? "calc(100% - " + (40 * allDayEvents.length + 15) + "px)" : "calc(100% - 44px)"
                },
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 436
                },
                __self: this
            },
            React.createElement(
                "div",
                { className: "view-main", __source: {
                        fileName: _jsxFileName,
                        lineNumber: 447
                    },
                    __self: this
                },
                React.createElement(
                    "div",
                    { className: "hours", __source: {
                            fileName: _jsxFileName,
                            lineNumber: 448
                        },
                        __self: this
                    },
                    HOURS.map(function (h) {
                        return React.createElement(
                            "div",
                            { className: "hour", __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 451
                                },
                                __self: this
                            },
                            React.createElement(
                                "span",
                                {
                                    __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 452
                                    },
                                    __self: this
                                },
                                h
                            )
                        );
                    })
                ),
                React.createElement(
                    "div",
                    { className: "event-area", __source: {
                            fileName: _jsxFileName,
                            lineNumber: 457
                        },
                        __self: this
                    },
                    dayEvents.map(function (v, i, a) {
                        return React.createElement(TimedEvent, { event: v, allevents: a, index: i, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 460
                            },
                            __self: this
                        });
                    })
                )
            )
        )
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
    if (event.days.length > 1 && props.year == event.days[0].year && props.month + 1 == event.days[0].month && props.day == event.days[0].day) {
        classes.push("multi-start");
    }
    if (event.days.length > 1 && props.year == event.days[event.days.length - 1].year && props.month + 1 == event.days[event.days.length - 1].month && props.day == event.days[event.days.length - 1].day) {
        classes.push("multi-end");
    }
    var title = (event.allDay ? "" : event.days.length > 1 && !(props.year == event.days[0].year && props.month + 1 == event.days[0].month && props.day == event.days[0].day) ? "" : timestr(event.start.expanded.hour, event.start.expanded.minute) + " - ") + event.summary + (event.allDay ? "" : event.days.length > 1 && props.year == event.days[event.days.length - 1].year && props.month + 1 == event.days[event.days.length - 1].month && props.day == event.days[event.days.length - 1].day ? " - " + timestr(event.end.expanded.hour, event.end.expanded.minute) : "");
    return React.createElement(
        "span",
        {
            className: classes.join(" "),
            "data-id": event.id,
            onClick: handle_event_clicked,
            title: event.summary,
            __source: {
                fileName: _jsxFileName,
                lineNumber: 520
            },
            __self: this
        },
        React.createElement(
            "span",
            { className: "arrow-start material-icons", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 526
                },
                __self: this
            },
            "chevron_left"
        ),
        React.createElement(
            "span",
            { className: "event-title", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 527
                },
                __self: this
            },
            title,
            React.createElement("span", { className: "overflow-shroud", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 529
                },
                __self: this
            })
        ),
        React.createElement(
            "span",
            { className: "arrow-end material-icons", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 531
                },
                __self: this
            },
            "chevron_right"
        )
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
        return React.createElement("td", { className: "day buffer", __source: {
                fileName: _jsxFileName,
                lineNumber: 545
            },
            __self: this
        });
    } else {
        var currentDate = new Date(props.year, props.month, props.day);
        var today = new Date(Date.now());
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        var event_elements = [];
        var finalEvent_elements = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = events[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                e = _step2.value;

                var eobj = React.createElement(Event, {
                    year: props.year,
                    month: props.month,
                    day: props.day,
                    data: e,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 558
                    },
                    __self: this
                });
                if (e.allDay || e.days.length > 1) {
                    finalEvent_elements.push(eobj);
                } else {
                    event_elements.push(eobj);
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = event_elements[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                e = _step3.value;

                finalEvent_elements.push(e);
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        var original_length = finalEvent_elements.length;
        if (finalEvent_elements.length * 20 > props.dayHeight - 20) {
            finalEvent_elements = finalEvent_elements.slice(0, Math.floor(props.dayHeight / 20) - 2);
        }
        return React.createElement(
            "td",
            {
                className: "day" + (currentDate.getFullYear() == today.getFullYear() && currentDate.getMonth() == today.getMonth() && currentDate.getDate() == today.getDate() ? " today" : "") + (props.day < today.getDate() && currentDate.getMonth() == today.getMonth() && currentDate.getFullYear() == today.getFullYear() ? " past" : "") + (original_length > finalEvent_elements.length ? " incomplete" : ""),
                date: currentDate.getTime(),
                day: currentDate.getDate(),
                onClick: function onClick(e) {
                    if (e.target.classList.contains("day") || e.target.classList.contains("day-events") || e.target.classList.contains("day-number")) {
                        var dayDate = new Date(Number(e.target.closest(".day").attributes.date.value));
                        fetch("/events/" + dayDate.getFullYear() + "/" + (dayDate.getMonth() + 1) + "/" + dayDate.getDate()).then(function (response) {
                            response.json().then(function (data) {
                                ReactDOM.render(React.createElement(SingleDayView, {
                                    events: data,
                                    date: dayDate,
                                    __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 623
                                    },
                                    __self: this
                                }), document.querySelector(".view-root > .view-area"));
                                document.querySelector(".view-root").classList.add("active");
                            });
                        });
                    }
                },
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 583
                },
                __self: this
            },
            React.createElement(
                "span",
                { className: "day-number", __source: {
                        fileName: _jsxFileName,
                        lineNumber: 639
                    },
                    __self: this
                },
                React.createElement(
                    "span",
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 640
                        },
                        __self: this
                    },
                    props.day
                )
            ),
            React.createElement(
                "span",
                { className: "day-name", __source: {
                        fileName: _jsxFileName,
                        lineNumber: 642
                    },
                    __self: this
                },
                DAYS[currentDate.getDay()]
            ),
            React.createElement(
                "div",
                { className: "day-events", __source: {
                        fileName: _jsxFileName,
                        lineNumber: 643
                    },
                    __self: this
                },
                finalEvent_elements,
                React.createElement(
                    "span",
                    { className: "incomplete-number", __source: {
                            fileName: _jsxFileName,
                            lineNumber: 645
                        },
                        __self: this
                    },
                    "+",
                    original_length - finalEvent_elements.length,
                    " more."
                )
            )
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
        var dayHeight = Math.floor((window.innerHeight * 0.95 - 88) / numRows) - 45;
    }

    var currentDay = -firstDayWeekDay + 1;
    for (var row = 0; row < numRows; row++) {
        var rowItems = [];
        for (var day = 0; day < 7; day++) {
            rowItems.push(React.createElement(Day, {
                year: props.year,
                month: props.month,
                day: currentDay,
                events: JSON.stringify(events[currentDay]),
                dayHeight: dayHeight,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 675
                },
                __self: this
            }));
            currentDay++;
        }
        var calRowStyle = {
            height: "calc(100% / " + numRows.toString() + ")"
        };
        var calendarRow = React.createElement(
            "tr",
            { style: calRowStyle, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 688
                },
                __self: this
            },
            rowItems
        );
        calendarRows.push(calendarRow);
    }

    var desktopCalendar = React.createElement(
        "table",
        { className: "day-table desktop", __source: {
                fileName: _jsxFileName,
                lineNumber: 693
            },
            __self: this
        },
        React.createElement(
            "tbody",
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 694
                },
                __self: this
            },
            calendarRows
        )
    );

    var mobileCalendarItems = [];
    for (var day = 1; day <= days; day++) {
        mobileCalendarItems.push(React.createElement(
            "tr",
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 701
                },
                __self: this
            },
            React.createElement(Day, {
                year: props.year,
                month: props.month,
                day: day,
                events: JSON.stringify(events[day]),
                dayHeight: 115,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 702
                },
                __self: this
            })
        ));
    }
    var mobileCalendar = React.createElement(
        "table",
        { className: "day-table mobile", __source: {
                fileName: _jsxFileName,
                lineNumber: 713
            },
            __self: this
        },
        React.createElement(
            "tbody",
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 714
                },
                __self: this
            },
            mobileCalendarItems
        )
    );
    return [desktopCalendar, mobileCalendar];
}