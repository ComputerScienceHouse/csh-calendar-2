$(document).ready(function () {
    ReactDOM.render(TopBar({
        src: 'static/index.svg',
        alt: 'CSH Logo',
        title: 'Events'
    }), document.querySelector('#topbar-root'));
    $.get({
        url: '/events/2021/8'
    }).done(console.log);
    var current = new Date(Date.now());
    ReactDOM.render(CalendarDays({
        month: current.getMonth(),
        year: current.getFullYear()
    }), document.querySelector('#calendar-root'));
});