var _jsxFileName = 'src/components.js';
function daysInMonth(month, year) {
    // Get number of days in month for display
    return new Date(year, month + 1, 0).getDate();
}
function getWeekDay(month, year, day) {
    // Get the day of the week of the first day of a month
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

function handle_event_clicked(e) {
    if (e.target.className == 'event') {
        var eid = e.target.dataset.id;
    } else {
        var eid = e.target.parentElement.dataset.id;
    }
    fetch('/events/' + eid).then(function (data) {
        data.json().then(function (jdata) {
            console.log(jdata);
        });
    }, function () {
        alert('Fetching event with ID ' + eid + ' failed.');
    });
}

function Event(props) {
    // year, month, day, data
    var event = props.data;
    var classes = ['event'];
    if (event.allDay) {
        classes.push('all-day-event');
    }
    if (event.days.length > 1) {
        classes.push('multi-day-event');classes.push('shadow-small');
    }
    if (event.days.length > 1 && props.year == event.days[0].year && props.month + 1 == event.days[0].month && props.day == event.days[0].day) {
        classes.push('multi-start');
    }
    if (event.days.length > 1 && props.year == event.days[event.days.length - 1].year && props.month + 1 == event.days[event.days.length - 1].month && props.day == event.days[event.days.length - 1].day) {
        classes.push('multi-end');
    }
    var title = condition(event.allDay, '', condition(event.days.length > 1 && !(props.year == event.days[0].year && props.month + 1 == event.days[0].month && props.day == event.days[0].day), '', timestr(event.start.expanded.hour, event.start.expanded.minute) + ' - ')) + event.summary + condition(event.allDay, '', condition(event.days.length > 1 && props.year == event.days[event.days.length - 1].year && props.month + 1 == event.days[event.days.length - 1].month && props.day == event.days[event.days.length - 1].day, ' - ' + timestr(event.end.expanded.hour, event.end.expanded.minute), ''));
    return React.createElement(
        'span',
        { className: classes.join(' '), 'data-id': event.id, onClick: handle_event_clicked, title: event.summary, __source: {
                fileName: _jsxFileName,
                lineNumber: 77
            },
            __self: this
        },
        React.createElement(
            'span',
            { className: 'arrow-start material-icons', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 78
                },
                __self: this
            },
            'chevron_left'
        ),
        React.createElement(
            'span',
            { className: 'event-title', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 79
                },
                __self: this
            },
            title,
            React.createElement('span', { className: 'overflow-shroud', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 79
                },
                __self: this
            })
        ),
        React.createElement(
            'span',
            { className: 'arrow-end material-icons', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 80
                },
                __self: this
            },
            'chevron_right'
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
        return React.createElement('td', { className: 'day buffer', __source: {
                fileName: _jsxFileName,
                lineNumber: 93
            },
            __self: this
        });
    } else {
        var currentDate = new Date(props.year, props.month, props.day);
        var today = new Date(Date.now());
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        var event_elements = [];
        var finalEvent_elements = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                e = _step.value;

                var eobj = React.createElement(Event, {
                    year: props.year,
                    month: props.month,
                    day: props.day,
                    data: e,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 104
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

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = event_elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                e = _step2.value;

                finalEvent_elements.push(e);
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

        var original_length = finalEvent_elements.length;
        if (finalEvent_elements.length * 20 > props.dayHeight - 20) {
            finalEvent_elements = finalEvent_elements.slice(0, Math.floor(props.dayHeight / 20) - 2);
        }
        return React.createElement(
            'td',
            { className: 'day' + condition(currentDate.getFullYear() == today.getFullYear() && currentDate.getMonth() == today.getMonth() && currentDate.getDate() == today.getDate(), ' today', '') + condition(props.day < today.getDate() && currentDate.getMonth() == today.getMonth() && currentDate.getFullYear() == today.getFullYear(), ' past', '') + condition(original_length > finalEvent_elements.length, ' incomplete', ''), date: currentDate.getTime(), day: currentDate.getDate(), __source: {
                    fileName: _jsxFileName,
                    lineNumber: 125
                },
                __self: this
            },
            React.createElement(
                'span',
                { className: 'day-number', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 136
                    },
                    __self: this
                },
                React.createElement(
                    'span',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 136
                        },
                        __self: this
                    },
                    props.day
                )
            ),
            React.createElement(
                'span',
                { className: 'day-name', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 137
                    },
                    __self: this
                },
                DAYS[currentDate.getDay()]
            ),
            React.createElement(
                'div',
                { className: 'day-events', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 138
                    },
                    __self: this
                },
                finalEvent_elements,
                React.createElement(
                    'span',
                    { className: 'incomplete-number', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 140
                        },
                        __self: this
                    },
                    '+',
                    original_length - finalEvent_elements.length,
                    ' more.'
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
                    lineNumber: 165
                },
                __self: this
            }));
            currentDay++;
        }
        var calRowStyle = {
            height: 'calc(100% / ' + numRows.toString() + ')'
        };
        var calendarRow = React.createElement(
            'tr',
            { style: calRowStyle, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 177
                },
                __self: this
            },
            rowItems
        );
        calendarRows.push(calendarRow);
    }

    var desktopCalendar = React.createElement(
        'table',
        { className: 'day-table desktop', __source: {
                fileName: _jsxFileName,
                lineNumber: 184
            },
            __self: this
        },
        React.createElement(
            'tbody',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 185
                },
                __self: this
            },
            calendarRows
        )
    );

    var mobileCalendarItems = [];
    for (var day = 1; day <= days; day++) {
        mobileCalendarItems.push(React.createElement(
            'tr',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 194
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
                    lineNumber: 195
                },
                __self: this
            })
        ));
    }
    var mobileCalendar = React.createElement(
        'table',
        { className: 'day-table mobile', __source: {
                fileName: _jsxFileName,
                lineNumber: 206
            },
            __self: this
        },
        React.createElement(
            'tbody',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 207
                },
                __self: this
            },
            mobileCalendarItems
        )
    );
    return [desktopCalendar, mobileCalendar];
}