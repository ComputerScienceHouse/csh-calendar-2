function daysInMonth(month, year) { // Get number of days in month for display
    return new Date(year, month, 0).getDate();
}
function getWeekDay(month, year, day) { // Get the day of the week of the first day of a month
    return new Date(year, month, day).getDay();
}

function TopBar(props) {
    return (
        <div className="top-bar shadow">
            <img src={props.src} alt={props.alt}></img>
            <span className="title">{props.title}</span>
        </div>
    );
}

function CalendarDays(props) { // month, year
    var calendarDayObjects = [];
    var days = daysInMonth(props.month, props.year);
    var wd = getWeekDay(props.month, props.year, 1);
    var lwd = 6 - getWeekDay(props.month, props.year, days);
    for (var pd = 0; pd < wd; pd++) {
        calendarDayObjects.push((
            <div className="calendar-day non-day"></div>
        ));
    }
    for (var day = 0; day < days; day++) {
        calendarDayObjects.push((
            <div className="calendar-day" dataDay={day}>
                <span className="day-number">{day + 1}</span>
                <div className="day-events">

                </div>
            </div>
        ));
    }
    for (var pd = 0; pd < lwd; pd++) {
        calendarDayObjects.push((
            <div className="calendar-day non-day"></div>
        ));
    }
    console.log(calendarDayObjects);
    return React.Children.toArray(calendarDayObjects);
}