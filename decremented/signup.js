$(document).ready(function(){
    var check = 0; 

   $('#loginbutton').prop('disabled',true);

   $('#register-email').keyup(function(){
        var email = $('#register-email').val();

        $.get('/checkEmail', {Email: email}, function(result){

            if(result.Email == email) {
                $('#register-email').css('border-color', 'red');
                $('#error').text('Email already registered!');      
            }
            
            else{
                $('#register-email').css('border-color', '#d9dadc');
                $('#error').text(''); 
            }
        });
   });

    $('#register-username').keyup(function(){
        var username = $('#register-username').val();

        $.get('/checkSignUpUsername', {Username: username}, function(result){

            if(result.DisplayName == username){
                $('#username').css('border-color', 'red');
                $('#error').text('Username already registered!'); 
                $('#loginbutton').prop('disabled',true);
            }

            else if(username == ''){
                $('#loginbutton').prop('disabled',true);
            }

            else{
                $('#register-username').css('border-color', '#d9dadc');
                $('#error').text(''); 
                $('#loginbutton').prop('disabled',false);
            }
        });
    });

    $('#register-password-recheck').keyup(function(){
        var pass = $('#register-password').val();
        var passCheck = $('#register-password-recheck').val();

        if(pass != passCheck){
            $('#register-password-recheck').css('border-color', 'red');
            $('#error').text('Password does not match!');
        }

        else{
            $('#register-password-recheck').css('border-color', '#d9dadc');
            $('#error').text('');
        }
    });

    $('#register-password-recheck').blur(function(){
        var pass = $('#register-password').val();
        var passCheck = $('#register-password-recheck').val();

        if (pass ==  ""){
            $('#register-password').css('border-color', '#d9dadc');
            $('#error').text('');
        }

        if (passCheck == ""){
            $('#register-password-recheck').css('border-color', '#d9dadc');
            $('#error').text('');
        }
    });

    $('#register-password-recheck').focus(function(){
        var pass = $('#register-password').val();
        var passCheck = $('#register-password-recheck').val();

        if (pass ==  ""){
            $('#register-password').css('border-color', '#d9dadc');
            $('#error').text('');
        }

        if (passCheck == ""){
            $('#register-password-recheck').css('border-color', '#d9dadc');
            $('#error').text('');
        }
    });

});