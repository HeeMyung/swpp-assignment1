$(document).ready(function () {
  var error_msg = {"error_code_-1" : "The user name should be 5~20 characters long. Please try again.",
                   "error_code_-2" : "The password should be 8~20 characters long. Please try again."};
  $("#userinfo_show").click(function () {
    var pwd = $("#userinfo_password");
    if (pwd.attr("type")=="password") {
      pwd.attr("type", "text");
    }
    else{
      pwd.attr("type", "password");
    }
  });
  $("#login").click(function() {
    $("#userinfo").attr("action", "/login");
    $("#userinfo").submit();
  });
  $("#adduser").click(function() {
    $("#userinfo").attr("action", "/signin");
    $("#userinfo").submit();
  });
  $("#userinfo_username").on("input", function(e) {
    var text = $("#userinfo_username").val();
    if (text.length < 5 || text.length > 20)
      $("#error_msg").text(error_msg["error_code_-1"]);
    else
      $("#error_msg").text("");
  });
  $("#userinfo_password").on("input", function(e) {
    var text = $("#userinfo_password").val();
    if (text.length < 8 || text.length > 20)
      $("#error_msg").text(error_msg["error_code_-2"]);
    else
      $("#error_msg").text("");
  });
});
