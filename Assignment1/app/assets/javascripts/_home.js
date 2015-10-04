$(document).ready(function () {
  var error_msg = {"-1" : "The user name should be 5~20 characters long. Please try again.",
                   "-2" : "The password should be 8~20 characters long. Please try again.",
                   "-3" : "This user name already exists. Please try again.",
                   "-4" : "Invalid username and password combination. Please try again."};
  function updateMessageBox(msg){
    $("#message_box").html(msg);
  }
  function loginMode(){
    $("#login_form").show();
    $("#logout_form").hide();
    $("#username").val('');
    $("#password").val('');
    $("#password").attr("type", "password");
    $("#showpass").prop('checked', false);
  }
  function loggedonMode(){
    $("#login_form").hide();
    $("#logout_form").show();
  }
  loginMode();
  $("#showpass").click(function () {
    var pwd = $("#password");
    if (pwd.attr("type")=="password") {
      pwd.attr("type", "text");
    }
    else{
      pwd.attr("type", "password");
    }
  });
  function AjaxLoginOrAddUser(url){
    $.ajax({
      type: "POST",
      url: url,
      dataType: "JSON",
      data: { 'username' : $("#username").val(),
              'password' : $("#password").val()},
      success: function(data){
        if (data['error_code'] != null){
          updateMessageBox(error_msg[String(data['error_code'])]);
        }
        else{
          updateMessageBox('Welcome ' + data['user_name'] + '<br>You have logged in ' + String(data['login_count']) + ' times.');
          loggedonMode();
        }
      },
      error: function(xhr, status, error) {}
    });
  }
  $("#login").click(function() {
    AjaxLoginOrAddUser('/login');
  });
  $("#adduser").click(function() {
    AjaxLoginOrAddUser('/signin');
  });
  $("#clear_data").click(function() {
    $.post("/clearData");
  });
  $("#logout").click(function() {
    updateMessageBox('');
    loginMode();
  });
  $("#username").on("input", function(e) {
    var text = $("#username").val();
    if (text.length < 5 || text.length > 20)
      $("#error_msg").text(error_msg[-1]);
    else
      $("#error_msg").text("");
  });
  $("#password").on("input", function(e) {
    var text = $("#password").val();
    if (text.length < 8 || text.length > 20)
      $("#error_msg").text(error_msg[-2]);
    else
      $("#error_msg").text("");
  });
});
