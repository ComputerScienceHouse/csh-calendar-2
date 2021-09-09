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
var DATA = {};

function setDate(date) {
    document.querySelector('.date-input-month').value = MONTHS[date.getMonth()];
    document.querySelector('.date-input-year').value = date.getFullYear();
}

function doDayRender(date) {
    fetch('/events/'+date.getFullYear()+'/'+(1+date.getMonth())).then(function (data) {
        data.json().then(function (data) {
            DATA = data;
            ReactDOM.render(<CalendarDays
                month={date.getMonth()}
                year={date.getFullYear()}
                events={JSON.stringify(data)}
            />, document.querySelector('#calendar-root .day-area'));
        });
    });
}

window.addEventListener('load', function () {
    doDayRender(DATE);
    setDate(DATE);
    document.querySelector('.nav-button.next').addEventListener('click', function () {
        DATE = new Date(DATE.setMonth(DATE.getMonth()+1));
        doDayRender(DATE);
        setDate(DATE);
    });
    document.querySelector('.nav-button.previous').addEventListener('click', function () {
        DATE = new Date(DATE.setMonth(DATE.getMonth()-1));
        doDayRender(DATE);
        setDate(DATE);
    });
    document.querySelector('.date-input-month').addEventListener('change', function () {
        DATE = new Date(DATE.setMonth(MONTHS.indexOf(this.value)));
        doDayRender(DATE);
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
        doDayRender(DATE);
        setDate(DATE);
    });
    window.addEventListener('resize', function () {
        ReactDOM.render(<CalendarDays
            month={DATE.getMonth()}
            year={DATE.getFullYear()}
            events={JSON.stringify(DATA)}
        />, document.querySelector('#calendar-root .day-area'));
    });
    document.querySelector('.view-root .close-button').addEventListener('click', function () {
        document.querySelector('.view-root').classList.remove('active');
    });
});