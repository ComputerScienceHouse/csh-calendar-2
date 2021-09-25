var _jsxFileName = "src/index.js";
var DATE = new Date(Date.now());
var MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
var DATA = {};

function setTheme(date, name) {
    fetch("static/themeDays.json").then(function (response) {
        response.json().then(function (data) {
            if (name) {
                if (Object.keys(data).includes(name)) {
                    var theme = data[name];
                } else {
                    return;
                }
            } else if (date) {
                var theme = false;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var t = _step.value;

                        if (date.getMonth() + 1 == data[t].date.month && date.getDate() == data[t].date.day) {
                            var theme = data[t];
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

                if (!theme) {
                    return;
                }
            }
            console.log("Loading theme:", theme);
            var style = document.getElementById("theme-edits");
            style.appendChild(document.createTextNode([":root {", "--pdark: #" + theme.theme.primary.dark + ";", "--p: #" + theme.theme.primary.normal + ";", "--plite: #" + theme.theme.primary.light + ";", "--ptext: #" + theme.theme.primary.text + ";", "--bdark: #" + theme.theme.secondary.dark + ";", "--b: #" + theme.theme.secondary.normal + ";", "--blite: #" + theme.theme.secondary.light + ";", "--btext: #" + theme.theme.secondary.text + ";", "}"].join("")));
        });
    });
}

function setDate(date) {
    document.querySelector(".date-input-month").value = MONTHS[date.getMonth()];
    document.querySelector(".date-input-year").value = date.getFullYear();
}

function doDayRender(date) {
    fetch("/events/" + date.getFullYear() + "/" + (1 + date.getMonth())).then(function (data) {
        data.json().then(function (data) {
            DATA = data;
            ReactDOM.render(React.createElement(CalendarDays, {
                month: date.getMonth(),
                year: date.getFullYear(),
                events: JSON.stringify(data),
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 74
                },
                __self: this
            }), document.querySelector("#calendar-root .day-area"));
            document.querySelector(".mobile .day.today").scrollIntoView();
        });
    });
}

window.addEventListener("load", function () {
    doDayRender(DATE);
    setDate(DATE);
    setTheme(DATE);
    document.querySelector(".nav-button.next").addEventListener("click", function () {
        DATE = new Date(DATE.setMonth(DATE.getMonth() + 1));
        doDayRender(DATE);
        setDate(DATE);
    });
    document.querySelector(".nav-button.previous").addEventListener("click", function () {
        DATE = new Date(DATE.setMonth(DATE.getMonth() - 1));
        doDayRender(DATE);
        setDate(DATE);
    });
    document.querySelector(".date-input-month").addEventListener("change", function () {
        DATE = new Date(DATE.setMonth(MONTHS.indexOf(this.value)));
        doDayRender(DATE);
        setDate(DATE);
        document.querySelector(".view-root").classList.remove("active");
    });
    document.querySelector(".date-input-year").addEventListener("change", function () {
        if (isNaN(Number(this.value))) {
            document.querySelector(".date-input-year").value = DATE.getFullYear();
            return;
        }
        if (Number(this.value) < 1970) {
            document.querySelector(".date-input-year").value = DATE.getFullYear();
            return;
        }
        DATE = new Date(DATE.setFullYear(Number(this.value)));
        doDayRender(DATE);
        setDate(DATE);
        document.querySelector(".view-root").classList.remove("active");
    });
    window.addEventListener("resize", function () {
        ReactDOM.render(React.createElement(CalendarDays, {
            month: DATE.getMonth(),
            year: DATE.getFullYear(),
            events: JSON.stringify(DATA),
            __source: {
                fileName: _jsxFileName,
                lineNumber: 133
            },
            __self: this
        }), document.querySelector("#calendar-root .day-area"));
    });
    document.querySelector(".view-root .close-button").addEventListener("click", function () {
        document.querySelector(".view-root").classList.remove("active");
    });
    window.addEventListener("keydown", function (e) {
        if (e.key == "Escape") {
            document.querySelector(".view-root").classList.remove("active");
        }
    });
});