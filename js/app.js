// Set foucs to the name field when page loaded
$("#name").focus();

// Add event listener to selection buttion
$("#title").change(function() {
  $("input#other-title").remove();
  newField = "<input type='text' id='other-title' name='user_other_title' placeholder='Your Title'>";
  $("[value='other']:selected").parents().append(newField);
});

// Add event listener to design buttion
var color = $("#color option");
$("#design").change(function() {
  $("#color").empty();
  if ($("#design option")[1].selected) {
      $("#color").append(color.slice(0,3));
    } else if ($("#design option")[2].selected) {
      $("#color").append(color.slice(3,6));
    } else {
      $("#color").append(color);
    }
});


var money = [200,100,100,100,100,100,100]
var activities = $("fieldset label [type='checkbox']")
activities.change(function() {
  var totalPrice = 0
  for (i = 0; i < 7; i++) {
    if (activities[i].checked) {
      totalPrice += money[i];
    }
  }
  console.log(totalPrice);
});

activities.eq(1).change(function() {
  if (activities[1].checked) {
    activities.eq(3).attr("disabled","false");
  }
  console.log("Tuesday Morning");
});
