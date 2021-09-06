var DATE = new Date(Date.now());

window.addEventListener('load', function () {
    ReactDOM.render(TopBar({
        src: 'static/index.svg',
        alt: 'CSH Logo',
        title: 'Events'
    }), document.querySelector('#topbar-root'));
    ReactDOM.render(<CalendarDays
        month={DATE.getMonth()}
        year={DATE.getFullYear()} />, document.querySelector('#calendar-root .day-area'));

    document.querySelector('.nav-button.next').addEventListener('click', function () {
        DATE = new Date(DATE.setMonth(DATE.getMonth()+1));
        ReactDOM.render(CalendarDays({
            month: DATE.getMonth(),
            year: DATE.getFullYear()
        }), document.querySelector('#calendar-root .day-area'));
    });
    document.querySelector('.nav-button.previous').addEventListener('click', function () {
        DATE = new Date(DATE.setMonth(DATE.getMonth()-1));
        ReactDOM.render(CalendarDays({
            month: DATE.getMonth(),
            year: DATE.getFullYear()
        }), document.querySelector('#calendar-root .day-area'));
    });
});