/**
 * Matericious v0.10.1 (https://matericious.com/)
 * Copyright 2019 Matericious Authors
 * Licensed under MIT (https://github.com/Matericious/Matericious/blob/master/LICENSE)
 */

"use strict";

function ready(callback) {
  if (document.readyState != "loading") callback();else if (document.addEventListener) 
    document.addEventListener("DOMContentLoaded", callback);else 
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState == "complete") callback();
    });
}

function call($class, $event, $func) {
  var elems = document.querySelectorAll($class);
  elems.forEach(function (elem) {
    addEvent(elem, $event, $func);
  });
}

function $handle(callback) {
  try {
    callback();
  } catch (err) {}
}

function $getChild(parent, child, n) {
  return document.querySelectorAll("".concat(parent, " ").concat(child))[n];
}

function $get(e) {
  return document.querySelector(e);
}

function $all(e) {
  return document.querySelectorAll(e);
}

function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  var r = bigint >> 16 & 255;
  var g = bigint >> 8 & 255;
  var b = bigint & 255;
  return "".concat(r, ",").concat(g, ",").concat(b);
}

function hasClass(el, className) {
  $handle(function () {
    if (el.classList) return el.classList.contains(className);else return !!el.className.match(new RegExp("(\\s|^)".concat(className, "(\\s|$)")));
  });
}

function $addClass(el, className) {
  if (el.classList) el.classList.add(className);else if (!hasClass(el, className)) el.className += " ".concat(className);
}

function $removeClass(el, className) {
  if (el.classList) el.classList.remove(className);else if (hasClass(el, className)) {
    var reg = new RegExp("(\\s|^)".concat(className, "(\\s|$)"));
    el.className = el.className.replace(reg, " ");
  }
}

function addEvent(object, type, callback) {
  if (object == null || typeof object == 'undefined') return;

  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent("on" + type, callback);
  } else {
    object["on" + type] = callback;
  }
}

function is_string(data) {
  if (typeof data === "string" || data instanceof String) {
    return true;
  } else {
    return false;
  }
}

Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
};

function picker(data) {
  var date = new Date();
  var currentDay,
      currentMonth,
      currentYear,
      setDate = {
    year: "",
    month: "",
    day: ""
  };
  var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  loadGlobal(); 

  loadYears(100);
  loadMonths();

  function loadGlobal(year, month, day) {
    currentDay = day ? day : date.getDate();
    currentMonth = month ? month : date.getMonth();
    currentYear = year ? year : date.getFullYear();
  }

  function updateView() {
    var dayOfWeek = new Date(currentYear, currentMonth, currentDay).getDay();
    var day_view = $get(".picker .picker_header .dai");
    var year_view = $get(".picker .picker_header .year");
    var month_view = $get(".picker .picker_content .selectMonth");
    year_view.innerHTML = currentYear;
    month_view.innerHTML = monthNames[currentMonth];
    day_view.innerHTML = dayNames[dayOfWeek] + ", " + monthNames[currentMonth].slice(0, 3) + " " + currentDay;
  }


  function listenForClicks() {
    call(".picker .year", "click", btnCalendarChange);
    call(".picker .dai", "click", btnCalendarChange);
    call(".picker .picker_content .yearly li", "click", changeYear);
    call(".picker .picker_content .daily .next", "click", nextMonth);
    call(".picker .picker_content .daily .previous", "click", previousMonth);
    listenForDayClicks();
  }

  function listenForDayClicks() {
    call(".picker .picker_content .daily td[day]", "click", changeDay);
  }


  function changeDay() {
    var day = this.getAttribute("day"),
        tar = $get("[day='" + day + "']"),
        currActive = $get(".picker .picker_content .daily td.active");
    $addClass(tar, 'active');
    $removeClass(currActive, 'active');
    currentDay = parseInt(this.innerHTML);
    updateView();
  }

  function changeYear() {
    var year = this.getAttribute("year");
    var tar = $get("[year='" + year + "']");
    var curr_Active = $get(".picker .picker_content .yearly li.set");
    var set_year = $get(".picker .picker_header .year");
    set_year.innerHTML = year;
    $removeClass(curr_Active, "set");
    $addClass(tar, "set");
    curr_Active = $get(".picker .picker_content .yearly .set");
    curr_Active.scrollIntoView();
    currentYear = this.innerHTML;
    changeCalendar("daily");
    loadMonths();
    updateView();
  }

  function btnCalendarChange() {
    changeCalendar(this.className + "ly");
  }

  function changeCalendar(type) {
    var calenderType = [$get(".picker_content .daily"), $get(".picker_content .yearly")];
    var calenderLabelType = [$get(".picker_header .dai"), $get(".picker_header .year")];
    var curr_Active = $get(".picker_content .active");
    var head_Active = $get(".picker_header .active");
    $removeClass(curr_Active, "active");
    $removeClass(head_Active, "active");
    $addClass(type == "daily" ? calenderType[0] : calenderType[1], "active");
    $addClass(type == "daily" ? calenderLabelType[0] : calenderLabelType[1], "active");

    if (type == "yearly") {
      var curr_Active = $get(".picker .picker_content .yearly .set");
      curr_Active.scrollIntoView();
    }
  }


  function loadYears(range) {
    var range = range ? range : 100,
        curr_year = new Date().getFullYear(),
        container = $get(".picker .picker_content .yearly ul"),
        min_year = curr_year - range,
        max_year = curr_year + range,
        data = "";

    for (var c = min_year; c < max_year; c++) {
      data += c == curr_year ? '<li class="set" year="' + c + '">' + c + "</li>" : '<li year="' + c + '">' + c + "</li>";
    }

    container.innerHTML = data;
    listenForClicks();
  }

  function loadMonths() {
    var firstDay = new Date(currentYear, currentMonth).getDay();
    var daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
    var days_calender = $get(".picker .picker_content .days table tbody");
    days_calender.innerHTML = "";
    days_calender.innerHTML = "<tr><th>SU</th><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th></tr>";
    setDate.month = currentMonth;
    setDate.year = currentYear;
    var days = 1;

    for (var i = 0; i < 6; i++) {
      var row = document.createElement("tr");

      for (var j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          var cell = document.createElement("td");
          var cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (days > daysInMonth) {
          break;
        } else {
          var _cell = document.createElement("td");

          var dayID = currentYear + "" + monthNames[currentMonth].slice(0, 3) + days;

          _cell.setAttribute("day", dayID);

          var _cellText = document.createTextNode(days);

          if (days === currentDay) {
            _cell.classList.add("active");

            setDate.day = days;
            console.log("found: " + days + " " + currentDay);
          }

          _cell.appendChild(_cellText);

          row.appendChild(_cell);
          days++;
        }
      }

      days_calender.appendChild(row);
    }

    listenForClicks();
    updateView();
  }


  function nextMonth() {
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    loadMonths();
  }

  function previousMonth() {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    loadMonths();
  }
}