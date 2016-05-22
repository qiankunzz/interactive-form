// Set foucs to the name field when page loaded
$("#name").focus();
// Hide the color option when a design is not selected
$("#colors-js-puns").hide();

// append the "turnintodropdown" class to the first dropdown menu
$("select").eq(0).addClass("turnintodropdown");

// Add event listener to role selction buttion
// The part below is moved to js/select.js
// where I borrowed the code from http://www.scribbletribe.com/how-to-style-the-select-dropdown/

// $("#title").change(function() {
//   console.log("hi")
//   $("#other-title").remove();
//   newField = "<input type='text' id='other-title' name='user_other_title' placeholder='Your Title'>";
//   $("[value='other']:selected").parent().parent().append(newField);
// });

// Add event listener to design buttion
var color = $("#color option");
$("#design").change(function() {
  // show the color option when the design is selcted
  $("#colors-js-puns").show();
  $("#color").empty();
  if ($("#design option")[1].selected) {
      $("#color").append(color.slice(0,3));
    } else if ($("#design option")[2].selected) {
      $("#color").append(color.slice(3,6));
    } else {
      $("#colors-js-puns").hide();
    }
});


// Calculate Total Price
var money = [200,100,100,100,100,100,100];
var activities = $("fieldset label [type='checkbox']");
var totalPrice = 0;

activities.change(function() {
  $("#activity-error").detach();    // Detach previous error message
  totalPrice = 0;                   // Calculate the total price
  for (i = 0; i < 7; i++) {
    if (activities[i].checked) {
      totalPrice += money[i];
    }
  }
  var priceHtml;
  priceHtml = "<h4 id='price'>Total Price: $" + totalPrice + "</h4>";
  $("#price").remove();
  $(".activities").append(priceHtml);
  console.log(totalPrice);
  // If no checkbox is checked, remove the total price div
  if (totalPrice === 0) {
    $("#price").detach();
  }
});

// Bind mutually exclusive objects
var tuesdayAm = $(".tuesday-am");
var tuesdayPm = $(".tuesday-pm");
// Malking mutually exclusive checkboxes
function setMutualExclusiveCheckboxes(tuesdayAm) {
  tuesdayAm.click(function() {
      var checkedState = $(this).is(":checked");
      tuesdayAm.attr('disabled', checkedState);
      $(this).attr('disabled',false);
      // Adding/removing class="disabled" to parent label
      tuesdayAm.each(function(index) {
        if (tuesdayAm.eq(index).is(":disabled")) {
          tuesdayAm.eq(index).parent().attr("class","disabled");
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
options.slice(2).hide();
$("#payment").change(function() {
  $("#payment-error").detach();    //detach previous error message
  options.slice(2).hide();
  if ($("option[value='credit card']").is(":selected")) {
    options.eq(2).show();
  }
  if ($("option[value='paypal']").is(":selected")) {
    options.eq(3).show();
  }
  if ($("option[value='bitcoin']").is(":selected")) {
    options.eq(4).show();
  }
});

// Test if Credit Card number if valid
/*----------------
Here I used the code from DiegoSalazar/validate_credit_card.js
https://gist.github.com/DiegoSalazar/4075533
----------------*/

function valid_credit_card(value) {
  // accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(value)) return false;

  // The Luhn Algorithm. It's so pretty.
  var nCheck = 0, nDigit = 0, bEven = false;
  value = value.replace(/\D/g, "");

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);

    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return (nCheck % 10) === 0;
}

/*----------------
Above is the code from DiegoSalazar/validate_credit_card.js
https://gist.github.com/DiegoSalazar/4075533
----------------*/


// Bind Submit button event
$("button[type='submit']").click(function(){
  // error messages
  var nameError = "<span id='name-error' class='error'> please input your name</span>";
  var emailError = "<span id='email-error' class='error'> please enter a valid email</span>";
  var activityError = "<div id='activity-error' class='error' style='font-size:0.8em'>Please select one activity</div>";
  var paymentError = "<div id='payment-error' class='error' style='font-size:0.8em'>Please select a payment method</div>";
  var creditCardError = "<div id='cc-error' class='error' style='font-size:0.8em'>Please enter a valid credit card number</div>";


  var nameField, emailField, creditCardField, zipField, cvvField;
  nameField = $("input#name").val();
  emailField = $("input#mail").val();
  creditCardField = $("#cc-num").val();
  zipField = $("#zip").val();
  cvvField = $("#zip").val();

  $("#name-error").detach();
  $("#email-error").detach();
  $("#activity-error").detach();
  $("#payment-error").detach();
  $("#cc-error").detach();
  $("label").removeAttr("class","error");

  // Name error message
  if (nameField === "") {
    event.preventDefault();
    $("label[for='name']").append(nameError);
    $("label[for='name']").attr("class","error");      //adding class="error" to label
  }

  // Test if email valid

  var emailTest = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
.test(emailField);
  console.log(!emailTest);


  var isCreditCardValid = valid_credit_card(creditCardField);
  console.log(isCreditCardValid);


  // Email error message
  if (emailField === "" || !emailTest) {
    event.preventDefault();
    $("label[for='mail']").append(emailError);
    $("label[for='mail']").attr("class","error");
  }

  // activity error message
  if (totalPrice == 0) {
    event.preventDefault();
    $(".activities legend").append(activityError);
  }

  // Payment Error Message
  if ($("option[value='select_method']").is(":selected")) {
    event.preventDefault();
    $(".payment legend").append(paymentError);
  }

  if ($("option[value='credit card']").is(":selected")) {
    // Credit Card Info Error Message;
    if (creditCardField === "" || !isCreditCardValid) {
      event.preventDefault();
      $("label[for='cc-num']").attr("class","error");
      $("#cc-num").parent().parent().append(creditCardError);
    }

    if (zipField === "") {
      event.preventDefault();
      $("label[for='zip']").attr("class","error");
    }

    if (cvvField === "") {
      event.preventDefault();
      $("label[for='cvv']").attr("class","error");
    }
  }
});
