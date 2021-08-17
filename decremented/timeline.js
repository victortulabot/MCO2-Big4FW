$(document).ready(function () {

    $(".upvote").click(function() {
        // if ($(this).attr("class") == "upvote"){

        //     if(this.src == "http://localhost:9090/img/upvote.png"){
        //         this.src = "/img/upvoted.png";
        //             //ipapasa dito yung id nung post para masave
        //         if($(this).next().attr("src") == 'http://localhost:9090/img/downvoted.png'){
        //             $(this).next().attr("src","/img/downvote.png")
        //         }
        //         else if($(this).next().attr("src") == '/img/downvoted.png'){
        //             $(this).next().attr("src","/img/downvote.png")
        //         }/
        //     }
        //     else{
        //         this.src = "/img/upvote.png";
        //     }
        // } 

        if ($(this).attr("class") == "upvote"){
            if((this.src == "http://localhost:9090/img/upvote.png") || (this.src == "/img/upvote.png")){
                this.src = "/img/upvoted.png";
                
                var postID = $(this).parent().next().find('p:nth-child(1)').text();
                var user =  $(this).parent().next().find('p:nth-child(2)').text();
                var yes = "if";
                var upvote = 1;
                var downvote = 0;
        
                $.get('/getStatus', {postID: postID, user: user}, function(result){
                    
                    if((result.postID == postID) && (result.user == user)){
                        $.get('/updateStatus', {
                            postID: postID,
                            user: user,
                            upvote: upvote,
                            downvote: downvote,
                            yes: yes
                        })
                    }
                    else{
                        $.get('/insertStatus', {
                            postID: postID,
                            user: user,
                            upvote: upvote,
                            downvote: downvote
                        })
                    }
                })

                if($(this).next().attr("src") == 'http://localhost:9090/img/downvoted.png'){
                    $(this).next().attr("src","/img/downvote.png")
                }
                else if($(this).next().attr("src") == '/img/downvoted.png'){
                    $(this).next().attr("src","/img/downvote.png")
                }
            }
            else{
                this.src = "/img/upvote.png";

                var postID = $(this).parent().next().find('p:nth-child(1)').text();
                var user =  $(this).parent().next().find('p:nth-child(2)').text();
                var yes = "else";
        
                $.get('/getStatus', {postID: postID, user: user}, function(result){
                    if((result.postID == postID) && (result.user == user)){
                        var upvote = 0;
                        var downvote = 0;
                        $.get('/updateStatus', {
                            postID: postID,
                            user: user,
                            upvote: upvote,
                            downvote: downvote,
                        })
                    }
                    else{
                        $.get('/insertStatus', {
                            postID: postID,
                            user: user,
                            upvote: upvote,
                            downvote: downvote
                        })
                    }
                })
            }
        } 

        // var postID = this.src;
        //  $.get('/statusPost', {
        //     postID: postID,
        // })
       

    });

    $(".downvote").click(function() {
        // if ($(this).attr("class") == "downvote"){
        //     if(this.src == "http://localhost:9090/img/downvote.png"){
        //         this.src = "/img/downvoted.png";

        //         if($(this).prev().attr("src") == 'http://localhost:9090/img/upvoted.png'){
        //             $(this).prev().attr("src","/img/upvote.png")
        //         }
        //         else if($(this).prev().attr("src") == '/img/upvoted.png'){
        //             $(this).prev().attr("src","/img/upvote.png")
        //         }
        //     }
        //     else{
        //         this.src = "/img/downvote.png";
        //     }
        //     $.ajax({
        //         url: "/unlikePost",
        //         type: "PUT",
        //         data: {username: username, postId: postId}
        //     }).done((e) => {
        //         //$('#unlike-btn').prop('disabled', false);
        //     }).fail((e) => {
                
        //     })
        // } 

        if ($(this).attr("class") == "downvote"){
            if(this.src == "http://localhost:9090/img/downvote.png"){
                this.src = "/img/downvoted.png";

                var postID = $(this).parent().next().find('p:nth-child(1)').text();
                var user =  $(this).parent().next().find('p:nth-child(2)').text();
                var yes = "if";
                var upvote = 0;
                var downvote = 1;
        
                $.get('/getStatus', {postID: postID, user: user}, function(result){
                    
                    if((result.postID == postID) && (result.user == user)){
                        $.get('/updateStatus', {
                            postID: postID,
                            user: user,
                            upvote: upvote,
                            downvote: downvote,
                            yes: yes
                        })
                    }
                    else{
                        $.get('/insertStatus', {
                            postID: postID,
                            user: user,
                            upvote: upvote,
                            downvote: downvote
                        })
                    }
                })
                if($(this).prev().attr("src") == 'http://localhost:9090/img/upvoted.png'){
                    $(this).prev().attr("src","/img/upvote.png")
                }
                else if($(this).prev().attr("src") == '/img/upvoted.png'){
                    $(this).prev().attr("src","/img/upvote.png")
                }
            }
            else{
                this.src = "/img/downvote.png";

                var postID = $(this).parent().next().find('p:nth-child(1)').text();
                var user =  $(this).parent().next().find('p:nth-child(2)').text();
                var yes = "else";
        
                $.get('/getStatus', {postID: postID, user: user}, function(result){
                    if((result.postID == postID) && (result.user == user)){
                        var upvote = 0;
                        var downvote = 0;
                        $.get('/updateStatus', {
                            postID: postID,
                            user: user,
                            upvote: upvote,
                            downvote: downvote,
                            yes: yes
                        })
                    }
                    else{
                        $.get('/insertStatus', {
                            postID: postID,
                            user: user,
                            upvote: upvote,
                            downvote: downvote
                        })
                    }
                })
            }
           
        } 
    });

    $("#sendButton").click(function(){
        var commentBar = $('#commentBar').val();
        var DisplayName = $('#author').text();
        var PostID = $('#postid').text();
        
        if(commentBar != ''){
            $('#commentBar').val('');
            $.get('/createComment',{
                commentBar: commentBar,
                DisplayName: DisplayName,
                PostID: PostID
            }, function(data, status){
                $('#displayComment').append(data);
            })
        }else{
            $('#error').text('');
        }

    })

    $("#postbutton").click(function() {
       var postTitle = $('#postTitle').val();
       var postBody = $('#postBody').val();
       var postTags = $('#postTags').val();
       var DisplayName = $('#DisplayName').text();
       var element = document.getElementById("universities");
       var univ = element.options[element.selectedIndex].text;
    
       if(univ == 'ADMU'){
           var uniBadge = "&#x1f985";
           var timelineBadge = "timeline-badge ateneo";
           var navbar = 'navbar-admu';
    
            if(postTitle != '' && postBody != ''){
                $('#postTitle').val('');
                $('#postBody').val('');
                $('#postTags').val('');
                $.get('/createPost', {
                    postTitle: postTitle, 
                    postBody: postBody, 
                    postTags: postTags, 
                    timelineBadge: timelineBadge, 
                    navbar: navbar, DisplayName: 
                    DisplayName, uniBadge: uniBadge
                }, function(data, status){
                    $('#post').prepend(data);
                });
            }
        }

        else if(univ == 'DLSU'){
            var uniBadge = "&#127993";
            var timelineBadge = "timeline-badge lasalle";
            var navbar = 'navbar-dlsu';
     
             if(postTitle != '' && postBody != ''){
                $('#postTitle').val('');
                $('#postBody').val('');
                $('#postTags').val('');
                $.get('/createPost', {
                    postTitle: postTitle, 
                    postBody: postBody, 
                    postTags: postTags, 
                    timelineBadge: timelineBadge, 
                    navbar: navbar, DisplayName: 
                    DisplayName, uniBadge: uniBadge
                }, function(data, status){
                    $('#post').prepend(data);
                });
            }
        }

        else if(univ == 'UST'){
            var uniBadge = "&#128047";
            var timelineBadge = "timeline-badge ust";
            var navbar = 'navbar-ust';
     
             if(postTitle != '' && postBody != ''){
                $('#postTitle').val('');
                $('#postBody').val('');
                $('#postTags').val('');
                $.get('/createPost', {
                    postTitle: postTitle, 
                    postBody: postBody, 
                    postTags: postTags, 
                    timelineBadge: timelineBadge, 
                    navbar: navbar, DisplayName: 
                    DisplayName, uniBadge: uniBadge
                }, function(data, status){
                    $('#post').prepend(data);
                });
            }
        }

        else{
            var uniBadge = "&#9994";
            var timelineBadge = "timeline-badge up";
            var navbar = 'navbar-up';
     
             if(postTitle != '' && postBody != ''){
                $('#postTitle').val('');
                $('#postBody').val('');
                $('#postTags').val('');
                $.get('/createPost', {
                    postTitle: postTitle, 
                    postBody: postBody, 
                    postTags: postTags, 
                    timelineBadge: timelineBadge, 
                    navbar: navbar, DisplayName: 
                    DisplayName, uniBadge: uniBadge
                }, function(data, status){
                    $('#post').prepend(data);
                });
            }
        }

        
    });


//     $('#postTitle').keyup(function(){
//         var email = $('#postTitle').val();

//         $.get('/check', {Email: email}, function(result){

//             // if(result.Email == email) {
//             //     $('#register-email').css('border-color', 'red');
//             //     $('#error').text('Email already registered!');      
//             // }
            
//             // else{
//             //     $('#register-email').css('border-color', '#d9dadc');
//             //     $('#error').text(''); 
//             // }
//         });
//    });

// $(".comment").click(function(){
//     $('#commentBar').append();
// });
})