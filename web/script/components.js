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

function Day(props) {
    // year, month, day, events
    if (!props.events) {
        var events = [];
    } else {
        var events = JSON.parse(props.events);
    }
    console.log(events, props.day);
    var maxDays = daysInMonth(props.month, props.year);
    if (props.day < 1 || props.day > maxDays) {
        return React.createElement('td', { className: 'day buffer', __source: {
                fileName: _jsxFileName,
                lineNumber: 28
            },
            __self: this
        });
    } else {
        var currentDate = new Date(props.year, props.month, props.day);
        var today = new Date(Date.now());
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return React.createElement(
            'td',
            { className: 'day' + condition(currentDate.getFullYear() == today.getFullYear() && currentDate.getMonth() == today.getMonth() && currentDate.getDate() == today.getDate(), ' today', '') + condition(props.day < today.getDate() && currentDate.getMonth() == today.getMonth() && currentDate.getFullYear() == today.getFullYear(), ' past', ''), date: currentDate.getTime(), day: currentDate.getDate(), __source: {
                    fileName: _jsxFileName,
                    lineNumber: 37
                },
                __self: this
            },
            React.createElement(
                'span',
                { className: 'day-number', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 46
                    },
                    __self: this
                },
                React.createElement(
                    'span',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 46
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
                        lineNumber: 47
                    },
                    __self: this
                },
                DAYS[currentDate.getDay()]
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

    var currentDay = -firstDayWeekDay + 1;
    for (var row = 0; row < numRows; row++) {
        var rowItems = [];
        for (var day = 0; day < 7; day++) {
            rowItems.push(React.createElement(Day, {
                year: props.year,
                month: props.month,
                day: currentDay,
                events: JSON.stringify(events[currentDay]),
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 65
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
                    lineNumber: 76
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
                lineNumber: 83
            },
            __self: this
        },
        React.createElement(
            'tbody',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 84
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
                    lineNumber: 93
                },
                __self: this
            },
            React.createElement(Day, {
                year: props.year,
                month: props.month,
                day: day,
                events: JSON.stringify(events[day]),
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 94
                },
                __self: this
            })
        ));
    }
    var mobileCalendar = React.createElement(
        'table',
        { className: 'day-table mobile', __source: {
                fileName: _jsxFileName,
                lineNumber: 104
            },
            __self: this
        },
        React.createElement(
            'tbody',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 105
                },
                __self: this
            },
            mobileCalendarItems
        )
    );
    return [desktopCalendar, mobileCalendar];
}