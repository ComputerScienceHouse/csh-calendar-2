function daysInMonth(month, year) { // Get number of days in month for display
    return new Date(year, month, 0).getDate();
}

$(document).ready(function () {
    ReactDOM.render(TopBar({
        src: 'static/index.svg',
        alt: 'CSH Logo',
        title: 'Events'
    }), document.querySelector('body'));
    $.get({
        url: '/events/2021/8'
    }).done(console.log);
});