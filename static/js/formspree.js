$('#contact-form').submit(function(e){
  e.preventDefault();
  $.ajax({
    dataType: 'json',
    method: 'POST',
    url: "//formspree.io/sjb@steakneggermuskegon.com",
    data: $('#contact-form').serialize(),
    beforeSend: function() {
      $('#contact-message').append("<div class='alert alert-warning alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Sending message...</strong></div>");
    },
    success: function(data) {
      $('#contact-message').find('.alert-warning').hide();
      //callback which can be used to show a thank you message
      //and reset the form
      $('#nameid').val('');
      $('#emailid').val('');
      $('#textareaid').val('');
      $('#contact-message').css({"display": "block"});
      $('#contact-message').append("<div class='alert alert-info alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Thank you!</strong> We'll get back to you soon!</div>");
    },
    error: function(err) {
      $('#contact-message').find('.alert-warning').hide();
      $('#contact-message').css({"display": "block"});
      $('#contact-message').append("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Oh snap!</strong> Change a few things up and try submitting again.</div>");
    }
  });
});