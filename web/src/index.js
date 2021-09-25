import React from 'react';
import ReactDOM from "react-dom";
import { CalendarDays } from "./components.js"
import themeDays from "../themeDays.json";
import "../style/index.css";
import "../index.svg";


var DATE = new Date(Date.now());
var MONTHS = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
];
var DATA = {};

function setTheme(date, name) {
    if (name) {
        if (Object.keys(themeDays).includes(name)) {
            var theme = themeDays[name];
        } else {
            return;
        }
    } else if (date) {
        var theme = false;
        for (var t of Object.keys(themeDays)) {
            if (
                date.getMonth() + 1 == themeDays[t].date.month &&
                date.getDate() == themeDays[t].date.day
            ) {
                var theme = themeDays[t];
            }
        }
        if (!theme) {
            return;
        }
    }
    console.log("Loading theme:", theme);
    var style = document.getElementById("theme-edits");
    style.appendChild(
        document.createTextNode(
            [
                ":root {",
                "--pdark: #" + theme.theme.primary.dark + ";",
                "--p: #" + theme.theme.primary.normal + ";",
                "--plite: #" + theme.theme.primary.light + ";",
                "--ptext: #" + theme.theme.primary.text + ";",
                "--bdark: #" + theme.theme.secondary.dark + ";",
                "--b: #" + theme.theme.secondary.normal + ";",
                "--blite: #" + theme.theme.secondary.light + ";",
                "--btext: #" + theme.theme.secondary.text + ";",
                "}",
            ].join("")
        )
    );

}

function setDate(date) {
    document.querySelector(".date-input-month").value = MONTHS[date.getMonth()];
    document.querySelector(".date-input-year").value = date.getFullYear();
}

function doDayRender(date) {
    fetch("/events/" + date.getFullYear() + "/" + (1 + date.getMonth())).then(
        function (data) {
            data.json().then(function (data) {
                DATA = data;
                ReactDOM.render(
                    <CalendarDays
                        month={date.getMonth()}
                        year={date.getFullYear()}
                        events={JSON.stringify(data)}
                    />,
                    document.querySelector("#calendar-root .day-area")
                );
                document.querySelector(".mobile .day.today").scrollIntoView();
            });
        }
    );
}

window.addEventListener("load", function () {
    doDayRender(DATE);
    setDate(DATE);
    setTheme(DATE);
    document
        .querySelector(".nav-button.next")
        .addEventListener("click", function () {
            DATE = new Date(DATE.setMonth(DATE.getMonth() + 1));
            doDayRender(DATE);
            setDate(DATE);
        });
    document
        .querySelector(".nav-button.previous")
        .addEventListener("click", function () {
            DATE = new Date(DATE.setMonth(DATE.getMonth() - 1));
            doDayRender(DATE);
            setDate(DATE);
        });
    document
        .querySelector(".date-input-month")
        .addEventListener("change", function () {
            DATE = new Date(DATE.setMonth(MONTHS.indexOf(this.value)));
            doDayRender(DATE);
            setDate(DATE);
            document.querySelector(".view-root").classList.remove("active");
        });
    document
        .querySelector(".date-input-year")
        .addEventListener("change", function () {
            if (isNaN(Number(this.value))) {
                document.querySelector(".date-input-year").value =
                    DATE.getFullYear();
                return;
            }
            if (Number(this.value) < 1970) {
                document.querySelector(".date-input-year").value =
                    DATE.getFullYear();
                return;
            }
            DATE = new Date(DATE.setFullYear(Number(this.value)));
            doDayRender(DATE);
            setDate(DATE);
            document.querySelector(".view-root").classList.remove("active");
        });
    window.addEventListener("resize", function () {
        ReactDOM.render(
            <CalendarDays
                month={DATE.getMonth()}
                year={DATE.getFullYear()}
                events={JSON.stringify(DATA)}
            />,
            document.querySelector("#calendar-root .day-area")
        );
    });
    document
        .querySelector(".view-root .close-button")
        .addEventListener("click", function () {
            document.querySelector(".view-root").classList.remove("active");
        });
    window
        .addEventListener("keydown", function (e) {
            if (e.key == "Escape") {
                document.querySelector(".view-root").classList.remove("active");
            }
        });
});
