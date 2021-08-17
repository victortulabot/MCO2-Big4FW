$(document).ready(function () {

    $('#loginbutton').prop('disabled',true);

    $('#login-username').keyup(function(){
        var username = $('#login-username').val();

        $.get('/checkUsername', {Username : username}, function(result){
            
            if(result.DisplayName == username){
                $('#login-username').css('border-color', '#d9dadc');
                $('#error').text('');
               

                $('#login-password').keyup(function(){
                    var pass = $('#login-password').val();
            
                    $.get('/checkPassword', {Password : pass}, function(result){
                        
                        if(result.Password == pass){
                            $('#login-password').css('border-color', '#d9dadc');
                            $('#error').text('');
                            $('#loginbutton').prop('disabled',false);
                        }
            
                        else{
                            // $('#login-password').css('border-color', 'red');
                            // $('#error').text('Incorrect Password!');
                            $('#loginbutton').prop('disabled',true);
                        }
                    })
                })
            }

            else{
                $('#login-username').css('border-color', 'red');
                $('#error').text('User does not exist!');
                $('#loginbutton').prop('disabled',true);
            }
        })
    })

    $('#login-password').keyup(function(){
        var pass = $('#login-password').val();

        $.get('/checkPassword', {Password : pass}, function(result){
            
            if(result.Password == pass){
                // $('#login-password').css('border-color', '#d9dadc');
                // $('#error').text('');
                // $('#loginbutton').prop('disabled',false);

                $('#login-username').blur(function(){
                    var username = $('#login-username').val();
            
                    $.get('/checkUsername', {Username : username}, function(result){
                        
                        if(result.Username == username){
                            $('#login-username').css('border-color', '#d9dadc');
                            $('#error').text('');
                            $('#loginbutton').prop('disabled',false);
                        }
            
                        else{
                            //$('#login-username').css('border-color', 'red');
                            $('#loginbutton').prop('disabled',true);
                        }
                    })
                })
            
            }

            else{
                $('#login-password').css('border-color', 'red');
                $('#error').text('User does not exist!');
                $('#loginbutton').prop('disabled',true);
            }
        })
    })

    $('#login-password').focus(function(){
        var pass = $('#login-password').val();

        $.get('/checkPassword', {Password : pass}, function(result){
            
            if(result.Password == pass){
                $('#login-password').css('border-color', '#d9dadc');
                $('#error').text('');
                $('#loginbutton').prop('disabled',false);
            }

            else{
                // $('#login-password').css('border-color', 'red');
                // $('#error').text('Incorrect Password!');
                $('#loginbutton').prop('disabled',true);
            }
        })
    })

})
