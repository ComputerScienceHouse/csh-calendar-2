function daysInMonth(month, year) {
    // Get number of days in month for display
    return new Date(year, month, 0).getDate();
}
function getWeekDay(month, year, day) {
    // Get the day of the week of the first day of a month
    return new Date(year, month, day).getDay();
}

function TopBar(props) {
    return React.createElement(
        "div",
        { className: "top-bar shadow" },
        React.createElement("img", { src: props.src, alt: props.alt }),
        React.createElement(
            "span",
            { className: "title" },
            props.title
        )
    );
}

function CalendarDays(props) {
    // month, year
    var calendarDayObjects = [];
    var days = daysInMonth(props.month, props.year);
    var wd = getWeekDay(props.month, props.year, 1);
    var lwd = 6 - getWeekDay(props.month, props.year, days);
    for (var pd = 0; pd < wd; pd++) {
        calendarDayObjects.push(React.createElement("div", { className: "calendar-day non-day" }));
    }
    for (var day = 0; day < days; day++) {
        calendarDayObjects.push(React.createElement(
            "div",
            { className: "calendar-day", dataDay: day },
            React.createElement(
                "span",
                { className: "day-number" },
                day + 1
            ),
            React.createElement("div", { className: "day-events" })
        ));
    }
    for (var pd = 0; pd < lwd; pd++) {
        calendarDayObjects.push(React.createElement("div", { className: "calendar-day non-day" }));
    }
    console.log(calendarDayObjects);
    return React.Children.toArray(calendarDayObjects);
}