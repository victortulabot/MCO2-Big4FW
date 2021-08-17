$(document).ready(function () {

    $(".upvote").click(function() {
       
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
    });

    $(".downvote").click(function() {
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

    });

})