// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const currentDay = $("#currentDay");
const timeBlock = $(".time-block");
const saveButton = $(".saveBtn");
const description = $(".description");
const textArea = $("textarea");
const currentTime = new Date();
const currentHour = currentTime.getHours();

$(function () {
  saveButton.on("click", function () {
    var description = $(this).siblings("textarea").val().trim();
    var timeBlockId = $(this).parent().attr("id");
    localStorage.setItem(timeBlockId, description);
  });

  timeBlock.each(function () {
    // get the hour value from the element's id
    var hour = parseInt($(this).attr("id").split("-")[1]);

    // add the appropriate class based on the current time
    if (hour < currentHour) {
      $(this).addClass("past");
    } else if (hour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var savedDescription = localStorage.getItem(timeBlockId);
    if (savedDescription !== null) {
      $(this).find("textarea").val(savedDescription);
    }
  });

  $(document).ready(function () {
    var now = new Date();
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var currentDate = now.toLocaleDateString("en-UK", options);
    currentDay.text(currentDate);
  });
});
