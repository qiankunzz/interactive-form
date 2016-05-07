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
var totalPrice = 0;

activities.change(function() {
  $("#activity-error").detach();
  totalPrice = 0;
  for (i = 0; i < 7; i++) {
    if (activities[i].checked) {
      totalPrice += money[i];
    }
  }
  var priceHtml
  priceHtml = "<h5 id='price'>Total Price: $" + totalPrice + "</h5>";
  $("#price").remove();
  $(".activities").append(priceHtml);
  console.log(totalPrice);
});

var tuesdayAm = $(".tuesday-am")
var tuesdayPm = $(".tuesday-pm")
// Malking mutually exclusive checkboxes
function setMutualExclusiveCheckboxes(tuesdayAm) {
  tuesdayAm.click(function() {
      var checkedState = $(this).is(":checked");
      tuesdayAm.attr('disabled', checkedState);
      $(this).attr('disabled',false);
      // Adding/removing class="disabled" to parent label
      tuesdayAm.each(function(index) {
        if (tuesdayAm.eq(index).is(":disabled")) {
          tuesdayAm.eq(index).parent().attr("class","disabled")
        } else {
          tuesdayAm.eq(index).parent().removeAttr("class");
        }
      });
    });
  }
setMutualExclusiveCheckboxes(tuesdayAm);
setMutualExclusiveCheckboxes(tuesdayPm);


// show payment fucntion accordingly;
var options = $("#payment").siblings();
options.slice(2).hide()
$("#payment").change(function() {
  options.slice(2).hide()
  if ($("option[value='credit card']").is(":selected")) {
    options.eq(2).show();
  };
  if ($("option[value='paypal']").is(":selected")) {
    options.eq(3).show();
  };
  if ($("option[value='bitcoin']").is(":selected")) {
    options.eq(4).show();
  };
});

// error messages
var nameFieldTest = $("#name").val();
var email = $("#mail").val();

var nameError = "<span id='name-error' class='error'>please input your name</span>";
var activityError = "<div id='activity-error' class='error' style='font-size:0.8em'>Please select one activity</div>"
//.attr("value")

$("button[type='submit']").click(function(){
  $("#name-error").detach();
  $("#activity-error").detach();
  // Name error message
  if (nameFieldTest.length == 0) {
    event.preventDefault();
    console.log("hi");
    $("label[for='name']").append(nameError);
//    $("label[for='name']").attr("class","error")
  }

  // activity error message
  if (totalPrice == 0) {
    event.preventDefault();
    $(".activities legend").append(activityError);
    console.log("acthi");
  }

});
