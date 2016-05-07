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
  var priceHtml
  priceHtml = "<h5 id='price'>Total Price: $" + totalPrice + "</h5>";
  $("#price").remove();
  $(".activities").append(priceHtml);
  console.log(totalPrice);
});

// Malking mutually exclusive checkboxes
$(".tuesday-am").click(function() {
    var checkedState = $(this).is(":checked");
    $(".tuesday-am").parent().removeAttr("class");
    $(".tuesday-am").attr('disabled', checkedState);
    $(this).attr('disabled',false);
    $(".tuesday-am:disabled").parent().attr("class","disabled");
});

$(".tuesday-pm").click(function() {
    var checkedState = $(this).is(":checked");
    $(".tuesday-pm").parent().removeAttr("class");
    $(".tuesday-pm").attr('disabled', checkedState);
    $(this).attr('disabled',false);
    $(".tuesday-pm:disabled").parent().attr("class","disabled");
});


// show payment fucntion accordingly;
$("#payment").change(function() {
  $("option[value='credit card']:selected").parent().siblings().eq(2).show();
  $("option[value='credit card']:selected").parent().siblings().eq(3).hide();
  $("option[value='credit card']:selected").parent().siblings().eq(4).hide();
  $("option[value='paypal']:selected").parent().siblings().eq(2).hide();
  $("option[value='paypal']:selected").parent().siblings().eq(3).show();
  $("option[value='paypal']:selected").parent().siblings().eq(4).hide();
  $("option[value='bitcoin']:selected").parent().siblings().eq(2).hide();
  $("option[value='bitcoin']:selected").parent().siblings().eq(3).hide();
  $("option[value='bitcoin']:selected").parent().siblings().eq(4).show();
});
