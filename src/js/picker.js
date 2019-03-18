//=include _base.js

function picker(data) {
  /*Global variables*/
  let date = new Date();
  let currentDay,
    currentMonth,
    currentYear,
    setDate = { year: "", month: "", day: "" };

  let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

  /*Call main functions*/
  //example date: 2019, 10, 30 ******* if no date is parsed to loadGlobal the current date would be used
  loadGlobal(); 
  // listenForClicks();
  loadYears(100);
  loadMonths();

  function loadGlobal(year, month, day) {
    currentDay = day ? day : date.getDate();
    currentMonth = month ? month : date.getMonth();
    currentYear = year ? year : date.getFullYear();

  }

  function updateView() {
    let dayOfWeek = new Date(currentYear, currentMonth, currentDay).getDay();

    let day_view = $get(".picker .picker_header .dai");
    let year_view = $get(".picker .picker_header .year");
    let month_view = $get(".picker .picker_content .selectMonth");
    year_view.innerHTML = currentYear;
    month_view.innerHTML = monthNames[currentMonth];
    day_view.innerHTML =
      dayNames[dayOfWeek] +
      ", " +
      monthNames[currentMonth].slice(0, 3) +
      " " +
      currentDay;
  }

  /*Listen for clicks*/
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

  /*Make changes after user clicks*/
  function changeDay() {
    let day = this.getAttribute("day"),
        tar = $get("[day='"+day+"']"),
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
    var calenderType = [
      $get(".picker_content .daily"),
      $get(".picker_content .yearly")
    ];
    var calenderLabelType = [
      $get(".picker_header .dai"),
      $get(".picker_header .year")
    ];
    var curr_Active = $get(".picker_content .active");
    var head_Active = $get(".picker_header .active");
    $removeClass(curr_Active, "active");
    $removeClass(head_Active, "active");
    $addClass(type == "daily" ? calenderType[0] : calenderType[1], "active");
    $addClass(
      type == "daily" ? calenderLabelType[0] : calenderLabelType[1],
      "active"
    );
    if (type == "yearly") {
      var curr_Active = $get(".picker .picker_content .yearly .set");
      curr_Active.scrollIntoView();
    }
  }

  /*Load data to HTML*/
  function loadYears(range) {
    var range = range ? range : 100,
      curr_year = new Date().getFullYear(),
      container = $get(".picker .picker_content .yearly ul"),
      min_year = curr_year - range,
      max_year = curr_year + range,
      data = "";

    for (var c = min_year; c < max_year; c++) {
      data +=
        c == curr_year
          ? '<li class="set" year="' + c + '">' + c + "</li>"
          : '<li year="' + c + '">' + c + "</li>";
    }
    container.innerHTML = data;
    listenForClicks();
  }

  function loadMonths() {
    let firstDay = new Date(currentYear, currentMonth).getDay();
    let daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
    let days_calender = $get(".picker .picker_content .days table tbody");
    days_calender.innerHTML = "";
    days_calender.innerHTML =
      "<tr><th>SU</th><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th></tr>";

    setDate.month = currentMonth;
    setDate.year = currentYear;
    let days = 1;
    for (let i = 0; i < 6; i++) {
      let row = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          let cell = document.createElement("td");
          let cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (days > daysInMonth) {
          break;
        } else {
          let cell = document.createElement("td");
          let dayID =
            currentYear + "" + monthNames[currentMonth].slice(0, 3) + days;
          
          cell.setAttribute("day", dayID);
          let cellText = document.createTextNode(days);

          if (days === currentDay) {
            cell.classList.add("active");
            setDate.day = days;
            console.log("found: "+days+" "+currentDay)
          }
          cell.appendChild(cellText);
          row.appendChild(cell);
          days++;
        }
      }
      days_calender.appendChild(row);
    }
    listenForClicks();
    updateView();
  }

  /*Control changing months*/
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

  