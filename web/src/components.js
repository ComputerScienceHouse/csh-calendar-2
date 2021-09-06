function daysInMonth(month, year) { // Get number of days in month for display
    return new Date(year, month + 1, 0).getDate();
}
function getWeekDay(month, year, day) { // Get the day of the week of the first day of a month
    return new Date(year, month, day).getDay();
}

var DAYS = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri', 'Sat.'];

function TopBar(props) {
    return (
        <div className="top-bar shadow">
            <img src={props.src} alt={props.alt}></img>
            <span className="title">{props.title}</span>
        </div>
    );
}

function condition(c, t, f) {
    if (c) {
        return t;
    } else {
        return f;
    }
}

function Day(props) { // year, month, day
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
        return (
            <td className={'day' + condition((
                currentDate.getFullYear() == today.getFullYear() && 
                currentDate.getMonth() == today.getMonth() && 
                currentDate.getDate() == today.getDate()
            ), ' today', '') + condition((
                props.day < today.getDate() && 
                currentDate.getMonth() == today.getMonth() && 
                currentDate.getFullYear() == today.getFullYear()
            ), ' past', '')} date={currentDate.getTime()} day={currentDate.getDate()}>
                <span className="day-number"><span>{props.day}</span></span>
                <span className="day-name">{DAYS[currentDate.getDay()]}</span>
            </td>
        );
    }
}

function CalendarDays(props) { // month, year
    var days = daysInMonth(props.month, props.year);
    var firstDayWeekDay = getWeekDay(props.month, props.year, 1);
    
    var numRows = Math.ceil((firstDayWeekDay + days) / 7);
    var calendarRows = [];

    var currentDay = -firstDayWeekDay + 1;
    for (var row = 0; row < numRows; row++) {
        var rowItems = [];
        for (var day = 0; day < 7; day++) {
            rowItems.push(<Day
                year={props.year}
                month={props.month}
                day={currentDay}
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