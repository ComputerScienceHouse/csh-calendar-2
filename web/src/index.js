var DATE = new Date(Date.now());
var MONTHS = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
];

function setDate(date) {
    document.querySelector('.date-input-month').value = MONTHS[date.getMonth()];
    document.querySelector('.date-input-year').value = date.getFullYear();
}

window.addEventListener('load', function () {
    ReactDOM.render(<CalendarDays
        month={DATE.getMonth()}
        year={DATE.getFullYear()} />, document.querySelector('#calendar-root .day-area')
    );
    setDate(DATE);
    document.querySelector('.nav-button.next').addEventListener('click', function () {
        DATE = new Date(DATE.setMonth(DATE.getMonth()+1));
        ReactDOM.render(CalendarDays({
            month: DATE.getMonth(),
            year: DATE.getFullYear()
        }), document.querySelector('#calendar-root .day-area'));
        setDate(DATE);
    });
    document.querySelector('.nav-button.previous').addEventListener('click', function () {
        DATE = new Date(DATE.setMonth(DATE.getMonth()-1));
        ReactDOM.render(CalendarDays({
            month: DATE.getMonth(),
            year: DATE.getFullYear()
        }), document.querySelector('#calendar-root .day-area'));
        setDate(DATE);
    });
    document.querySelector('.date-input-month').addEventListener('change', function () {
        DATE = new Date(DATE.setMonth(MONTHS.indexOf(this.value)));
        ReactDOM.render(CalendarDays({
            month: DATE.getMonth(),
            year: DATE.getFullYear()
        }), document.querySelector('#calendar-root .day-area'));
        setDate(DATE);
    });
    document.querySelector('.date-input-year').addEventListener('change', function () {
        if (isNaN(Number(this.value))) {
            document.querySelector('.date-input-year').value = DATE.getFullYear();
            return;
        }
        if (Number(this.value) < 1970) {
            document.querySelector('.date-input-year').value = DATE.getFullYear();
            return;
        }
        DATE = new Date(DATE.setFullYear(Number(this.value)));
        ReactDOM.render(CalendarDays({
            month: DATE.getMonth(),
            year: DATE.getFullYear()
        }), document.querySelector('#calendar-root .day-area'));
        setDate(DATE);
    });
});