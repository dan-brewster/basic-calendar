// JavaScript functionality for a basic calendar

var localeOptions = { month: 'long' };

var basicCalendar = {
  displayedCalendarTitle: "",
  displayedMonth: null,
  displayedYear: null,

  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),

  // Generate 2D array contains dates in the month, indexed by week and day of week
  generateMonthArray: function(month, year) {
    // Find length of month by using 0th date of next month
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    // Generate calendar title based on english month and year
    this.displayedCalendarTitle = firstDate.toLocaleString('en-US', localeOptions) + " " + year;
    // where is the 1st? (use to start filling in arrays
    var firstDate = new Date(year, month, 1);
    var dayOfWeek = firstDate.getDay(); 
    // fill in week arrays
    var weeks = [];
    for(var i = 0; i < 6; i++) {
      weeks[i] = [];
    }
    // loop through each week and fill with days
    var dateAssigned = 1;
    var currentWeek = 0;
    while(dateAssigned <= daysInMonth) {
      weeks[currentWeek][dayOfWeek] = dateAssigned;
      dayOfWeek++;
      if(dayOfWeek > 6) {
        currentWeek++;
	dayOfWeek = 0;
      }
      dateAssigned++;
    }
    return weeks;
  },

  // generate HTML for a month, ready to be inserted
  renderMonth: function(monthArray) {
    var monthTable = document.createElement('table');
    monthTable.setAttribute('cellSpacing', '16px');
    for(var i = 0; i < monthArray.length; i++) {
      var weekRow = this.renderWeek(monthArray[i]);
      monthTable.appendChild(weekRow);
    }
    return monthTable;
  },

  // generate HTML for a week
  renderWeek: function(week) {
    var weekRow = document.createElement('tr');
    for(var i = 0; i < week.length; i++) {
      var dateCell = this.renderDay(week[i]);
      weekRow.appendChild(dateCell);
    }
    return weekRow;
  },

  // generate HTML for a day
  renderDay: function(date) {
    var dateCell = document.createElement('td');
    if (typeof date !== 'undefined') {
      dateCell.innerText = '0'.slice(("" + date).length - 1) + date;
    } else {
      // days before the 1st
      dateCell.className = 'noDate';
      dateCell.innerText = '';
    }
    return dateCell;
  },

  // Move to the previous month. Special logic for switching years.
  moveToPriorMonth: function() {
    if(this.displayedMonth === 0) {
      this.displayedMonth = 11;
      this.displayedYear -= 1;
    } else {
      this.displayedMonth -= 1;
    }
    this.moveToMonth(this.displayedMonth, this.displayedYear);
  },

  // Move to the next month. Special logic for switching years.
  moveToNextMonth: function() {
    if(this.displayedMonth === 11) {
      this.displayedMonth = 0;
      this.displayedYear += 1;
    } else {
      this.displayedMonth += 1;
    } 
    this.moveToMonth(this.displayedMonth, this.displayedYear);
  },

  // Generic method that handles updating the HTML of the calendar for the new month
  moveToMonth: function(month, year) {
    var monthArray = this.generateMonthArray(month, year);
    var newMonthNode = this.renderMonth(monthArray);
    
    var calendarParentNode = document.getElementById('calendar');
    var existingMonthNode = calendarParentNode.childNodes[0];
    if (existingMonthNode) {
      calendarParentNode.replaceChild(newMonthNode, existingMonthNode);
    } else {
      calendarParentNode.appendChild(newMonthNode);
    }
    document.getElementById('currentMonth').innerText = this.displayedCalendarTitle;

    // update state
    this.displayedMonth = month;
    this.displayedYear = year;
  },

  // Entrance function that just moves the calendar to the current month
  loadCurrentMonth: function() {
    this.moveToMonth(this.currentMonth, this.currentYear);
  }
};

// On page load, render the current month's calendar

basicCalendar.loadCurrentMonth();

// Set up click events on the next/previous buttons

document.getElementById('moveLeft').addEventListener('click', function() { basicCalendar.moveToPriorMonth.call(basicCalendar) } );
document.getElementById('moveRight').addEventListener('click', function() { basicCalendar.moveToNextMonth.call(basicCalendar) } );
