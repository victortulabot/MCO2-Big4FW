// const button = document.getElementById('upvote');

// button.addEventListener('click', function(e){
//     console.log('button was clicked');

//     fetch('/clicked', {method: 'POST'})
//     .then(function(response) {
//       if(response.ok) {
//         console.log('Click was recorded');
//         return;
//       }
//       throw new Error('Request failed.');
//     })
//     .catch(function(error) {
//       console.log(error);
//     });

// });

// setInterval(function() {
//     fetch('/clicks', {method: 'GET'})
//       .then(function(response) {
//         if(response.ok) return response.json();
//         throw new Error('Request failed.');
//       })
//       .then(function(data) {
//         document.getElementById('counter').innerHTML = "Button was clicked ${data.length} times";
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   }, 1000);


// function upVote(img,downvote) {
//   src = $(img).attr('src');
//   if(src == "/img/upvoted.png"){
//     img.src='/img/upvote.png';
    
//   }
//   else if(src == "/img/upvote.png"){
//     img.src='/img/upvoted.png'
//     downvote.src='/img/downvote.png'

//     // $.ajax({
//     //   url: '/post/upvote/' + post,
//     //   method: 'GET',
//     //   data: {post_id: post},
//     //   success: function(s){
//     //     alert(s);
//     //   },
//     //   error: function(){
//     //     alert("eroor");
//     //   }
//     // })

//       // $.get('/post/upvote/' + post, {post_id : post}, function(result){

//       // })
//   }
// };

// function downVote(upvote,img) {
//   src = $(img).attr('src');
//   if(src == "/img/downvoted.png"){
//     img.src='/img/downvote.png'
//   }
//   else if(src == "/img/downvote.png"){
//     img.src='/img/downvoted.png'
//     upvote.src='/img/upvote.png'
//   }
// };

$(document).ready(function () {

    // comment out muna
// var t = 0
//     var myVar = setInterval(myTimer, 0);

// function myTimer() {
//     var d = new Date();
//     var ptsString = " pts";
//     //   var t = d.toLocaleTimeString();
//     t += 1;
//     var numberString = t.toString();
//     var updatedCreditScore = numberString.concat(ptsString);

//     document.getElementById("creditScore").innerHTML = updatedCreditScore;
// }

// hanggang dito

var ownCSVar = setInterval(getOCS, 1000);

function getOCS(){
    var ptsString = " pts";
    $.get('/getSession', function(curSession, status){
        if(curSession == null){
            clearInterval(ownCSVar);
        }
        else{
            $.get('/getOwnCS', function(ownCreditScore, status){
                var updatedCreditScore = ownCreditScore.concat(ptsString);
                $('#creditScore').text(updatedCreditScore);
            })
        }
    })
}


  // $('img').click(function(){
  //     var type = this.id.split(',')[0];
  //     var post_id = this.id.split(',')[1];

  //     if(type.equals("upvote")){
  //       $.get('/post/upvote/'+post_id, {post_id: post_id}, function(result){
  //         $(this).attr("src", "/img/upvoted.png");
  //         $(this).next().attr("src", "/img/downvote.png")
  //       })
  //     } else if(type.equals("downvote")){

  //     } else if(type.equals("upvoted")){

  //     } else{

  //     }
  //     $(this).attr("src", "/img/upvoted.png");
  //     $(this).next().attr("src", "/img/downvote.png")
  // });

 
  //setInterval
    // updateCounter();
    
    // function updateCounter(){
    //   var n = $("#counter").text();
    //   var count = parseInt(n) + 1
    //   $("#counter").text(count)
    // }
    // setInterval(updateCounter, 2000);

    // $(document).ready(function () {
  
        // $('.userbuttonscontainerr').each(function(i, obj) {
        //     var id = $(this).find("#upvotecount_postid").attr("id")
        //     var p_id = id.split('_')[1]
        //     var count = $(this).find("#upvotecount_postid").text()
        //     console.log(count)
        //     console.log(p_id)
        //     //$(obj).html('count '+ +' by each loop');
        // });
    //    });

//     <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width">
//   <title>JS Bin</title>
//   <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
//     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
//     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
// </head>
// <body>
//   <h1>Counter</h1>
//   <ul class="timeline">
//   <div class="yes">
//     <div class="userbuttonscontainerr">
//         <p class ="upvotecountt" title="Vote Count"><span id="upvotecount_postid">1</span> upvotes, <span id="downvotecount_postid">1</span> downvotes, <span>9 comments</span></p>
//     </div>
//   </div>
//   </ul>
//   <ul class="timeline">
//   <div class="yes">
//     <div class="userbuttonscontainerr">
//         <p class ="upvotecountt" title="Vote Count"><span id="upvotecount_postid">1</span> upvotes, <span id="downvotecount_postid">1</span> downvotes, <span>9 comments</span></p>
//     </div>
//   </div>
//   </ul>
  
//   <ul class="timeline">
//   <div class="yes">
//     <div class="userbuttonscontainerr">
//         <p class ="upvotecountt" title="Vote Count"><span id="upvotecount_postid">1</span> upvotes, <span id="downvotecount_postid">1</span> downvotes, <span>9 comments</span></p>
//     </div>
//   </div>
//   </ul>
  
//   <ul class="timeline">
//   <div class="yes">
//     <div class="userbuttonscontainerr">
//         <p class ="upvotecountt" title="Vote Count"><span id="upvotecount_postid">1</span> upvotes, <span id="downvotecount_postid">1</span> downvotes, <span>9 comments</span></p>
//     </div>
//   </div>
//   </ul>
// </body>
// </html>
         
         
    //    })
       
  $(".upvote").click(function() {
    // var ownCSVar = setInterval(getOCS, 500);
    // var postUserCSVar = setInterval(getPD, 500);

    var post_id = $(this).parent().next().find('p:nth-child(1)').text();
    var puid = $(this).parent().next().find('p:nth-child(2)').text();

    if ($(this).attr("class") == "upvote"){
        if((this.src == "http://localhost:9090/img/upvote.png") || (this.src == "/img/upvote.png") || (this.src == "https://big-four-fw.herokuapp.com/img/upvote.png") || (this.src == "https://mco2-big4fw.herokuapp.com/img/upvote.png")){
            this.src = "/img/upvoted.png";
            document.getElementById('upvote_'+post_id).setAttribute('onclick', 'unupvote(event);');
            document.getElementById('downvote_'+post_id).setAttribute('onclick', 'updownvote(event);');
            var upvote = 1;
            var downvote = 0;
            var upvoteCredit = 1;
    
            if($(this).next().attr("src") == 'http://localhost:9090/img/downvoted.png'){
                $(this).next().attr("src","/img/downvote.png")
                document.getElementById('downvote_'+post_id).setAttribute('onclick', 'updownvote(event);');
                // var dv = $('#downvotecount_'+post_id).text();
                // var downvote = parseInt(dv) - 1;
                downvote = 1;
                upvoteCredit += 1;
                // $('#downvotecount_'+post_id).text(downvote);
            }
            else if($(this).next().attr("src") == '/img/downvoted.png'){
                $(this).next().attr("src","/img/downvote.png")
                document.getElementById('downvote_'+post_id).setAttribute('onclick', 'updownvote(event);');
                // var dv = $('#downvotecount_'+post_id).text();
                // var downvote = parseInt(dv) - 1;
                downvote = 1;
                upvoteCredit += 1;
                // $('#downvotecount_'+post_id).text(downvote);
            }else if($(this).next().attr("src") == 'https://big-four-fw.herokuapp.com/img/downvoted.png'){
                $(this).next().attr("src","/img/downvote.png")
                document.getElementById('downvote_'+post_id).setAttribute('onclick', 'updownvote(event);');
                // var dv = $('#downvotecount_'+post_id).text();
                // var downvote = parseInt(dv) - 1;
                downvote = 1;
                upvoteCredit += 1;
                // $('#downvotecount_'+post_id).text(downvote);
            }else if($(this).next().attr("src") == 'https://mco2-big4fw.herokuapp.com/img/downvoted.png'){
                $(this).next().attr("src","/img/downvote.png")
                document.getElementById('downvote_'+post_id).setAttribute('onclick', 'updownvote(event);');
                // var dv = $('#downvotecount_'+post_id).text();
                // var downvote = parseInt(dv) - 1;
                downvote = 1;
                upvoteCredit += 1;
                // $('#downvotecount_'+post_id).text(downvote);
            }

            $.get('/post/upvote/'+post_id, {post_id: post_id, puid: puid, upvoteCount: upvote, downvoteCount: downvote, upvoteCredit: upvoteCredit})
            // var uv = $('#upvotecount_'+post_id).text();
            // var upvote = parseInt(uv) + 2;
            // $('#upvotecount_'+post_id).text(upvote);
        }
        else{
            this.src = "/img/upvote.png";
            document.getElementById('upvote_'+post_id).setAttribute('onclick', 'upvote(event);');
            document.getElementById('downvote_'+post_id).setAttribute('onclick', 'downvote(event);');
            var upvote = 1;
            var downvote = 0;
            var upvoteCredit = 1;
            $.get('/post/unupvote/'+post_id, {post_id: post_id, puid: puid, upvoteCount: upvote, downvoteCount: downvote, upvoteCredit: upvoteCredit})
            // var uv = $('#upvotecount_'+post_id).text();
            // var upvote = parseInt(uv) - 2;
            // $('#upvotecount_'+post_id).text(upvote);
        }
    } 

    
    // setTimeout(stopRealTime,10000);
    
});

$(".downvote").click(function(event) {
    // var ownCSVar = setInterval(getOCS, 500);
    // var postUserCSVar = setInterval(getPD, 500);

    var post_id = $(this).parent().next().find('p:nth-child(1)').text();
    var puid = $(this).parent().next().find('p:nth-child(2)').text();

    if ($(this).attr("class") == "downvote"){
      if((this.src == "http://localhost:9090/img/downvote.png") || (this.src == "/img/downvote.png") || (this.src == "https://big-four-fw.herokuapp.com/img/downvote.png") || (this.src == "https://mco2-big4fw.herokuapp.com/img/downvote.png")){
            this.src = "/img/downvoted.png";
            document.getElementById('downvote_'+post_id).setAttribute('onclick', 'undownvote(event);');
            document.getElementById('upvote_'+post_id).setAttribute('onclick', 'downupvote(event);');
            // document.getElementById('downvoted_'+post_id).setAttribute('onclick', 'undownvote(event);');
            event.target.dataset.postId;
            var downvote = 1;
            var upvote = 0;
            var downvoteCredit = 1;
 
            if($(this).prev().attr("src") == 'http://localhost:9090/img/upvoted.png'){
                $(this).prev().attr("src","/img/upvote.png")
                document.getElementById('upvote_'+post_id).setAttribute('onclick', 'downupvote(event);');
                // var uv = $('#upvotecount_'+post_id).text();
                // var upvote = parseInt(uv) - 2;
                upvote = 1;
                downvoteCredit += 1;
                // $('#upvotecount_'+post_id).text(upvote);
            }
            else if($(this).prev().attr("src") == '/img/upvoted.png'){
                $(this).prev().attr("src","/img/upvote.png")
                document.getElementById('upvote_'+post_id).setAttribute('onclick', 'downupvote(event);');
                // var uv = $('#upvotecount_'+post_id).text();
                // var upvote = parseInt(uv) - 2;
                upvote = 1;
                downvoteCredit += 1;
                // $('#upvotecount_'+post_id).text(upvote);
            }else if($(this).prev().attr("src") == 'https://big-four-fw.herokuapp.com/img/upvoted.png'){
                $(this).prev().attr("src","/img/upvote.png")
                document.getElementById('upvote_'+post_id).setAttribute('onclick', 'downupvote(event);');
                // var uv = $('#upvotecount_'+post_id).text();
                // var upvote = parseInt(uv) - 2;
                upvote = 1;
                downvoteCredit += 1;
                // $('#upvotecount_'+post_id).text(upvote);
            }else if($(this).prev().attr("src") == 'https://mco2-big4fw.herokuapp.com/img/upvoted.png'){
                $(this).prev().attr("src","/img/upvote.png")
                document.getElementById('upvote_'+post_id).setAttribute('onclick', 'downupvote(event);');
                // var uv = $('#upvotecount_'+post_id).text();
                // var upvote = parseInt(uv) - 2;
                upvote = 1;
                downvoteCredit += 1;
                // $('#upvotecount_'+post_id).text(upvote);
            }

            $.get('/post/downvote/'+post_id, {post_id: post_id, puid: puid, upvoteCount: upvote, downvoteCount: downvote, downvoteCredit: downvoteCredit})
            // var dv = $('#downvotecount_'+post_id).text();
            // var downvote = parseInt(dv) + 2;
            // $('#downvotecount_'+post_id).text(downvote);
           
        }
        else{
            this.src = "/img/downvote.png";
            document.getElementById('downvote_'+post_id).setAttribute('onclick', 'downvote(event);');
            document.getElementById('upvote_'+post_id).setAttribute('onclick', 'upvote(event);');
            // document.getElementById('downvoted_'+post_id).setAttribute('onclick', 'downvote(event);');
            var upvote = 0;
            var downvote = 1;
            var downvoteCredit = 1;
            $.get('/post/undownvote/'+post_id, {post_id: post_id, puid: puid, upvoteCount: upvote, downvoteCount: downvote, downvoteCredit: downvoteCredit})
            // var dv = $('#downvotecount_'+post_id).text();
            // var downvote = parseInt(dv) - 2;
            // $('#downvotecount_'+post_id).text(downvote);
        }
       
    } 
    // setTimeout(stopRealTime, 10000);
});

// {{#checkSaved this._id saved}}
// <a href="/post/unsave/{{this._id}}" id="unsave/{{this._id}}" class="unsave">Unsave Post</a>
// <a id="unsave/{{this._id}}" class="unsave" style="cursor: pointer;">Unsave Post</a>
// <a id="save/{{this._id}}" class="save" style="display: none; cursor: pointer;">Save Post</a>
// {{else}}
// <a href="/post/save/{{this._id}}" id="save/{{this._id}}" class="save">Save Post</a>
// <a id="unsave/{{this._id}}" class="unsave" style="display: none; cursor: pointer;">Unsave Post</a>
// <a id="save/{{this._id}}" class="save" style="cursor: pointer;">Save Post</a>
// {{/checkSaved}} 

$(".save").click(function() {
    var post_id = $(this).attr('id')
    // console.log(post_id)
    var splitted = post_id.split("/")
    // console.log(splitted[1])
    var saveStats = document.getElementById("save/"+splitted[1])
    var unsaveStats = document.getElementById("unsave/"+splitted[1])
    if ($(this).attr("class") == "save"){
        $.get('/post/save/'+splitted[1], {post_id: splitted[1]})
        // $('#save'+splitted[1]).hide()
        // $('#unsave'+splitted[1]).show()
        saveStats.style.display = "none";
        unsaveStats.style.display = "block";
    } 
});

$(".unsave").click(function() {
    var post_id = $(this).attr('id')
    // console.log(post_id)
    var splitted = post_id.split("/")
    // console.log(splitted[1])
    var saveStats = document.getElementById("save/"+splitted[1])
    var unsaveStats = document.getElementById("unsave/"+splitted[1])
    if ($(this).attr("class") == "unsave"){
        $.get('/post/unsave/'+splitted[1], {post_id: splitted[1]})
        // $('#save/'+splitted[1]).show()
        // $('#unsave/'+splitted[1]).hide()
        saveStats.style.display = "block";
        unsaveStats.style.display = "none";
    } 
});

$("#sendButton").click(function(){
    var commentBar = $('#commentBar').val();
    var PostID = $('#postid').text();
    var PostUserID = $('#postuser').text();
    
    if(commentBar != ''){
        $('#commentBar').val('');
        
        $.get('/createComment',{
            commentBar: commentBar,
            PostID: PostID,
            PostUserID: PostUserID
        }, function(data, status){
            $('#displayComment').append(data);
            var cc = $('#commentcount').text();
            var count= parseInt(cc) + 1;
            $('#commentcount').text(count);
        })
    }else{
        // $('#error').text('');
    }

})

$(document).on("click", ".reply_comment", function(){
    var id = $(this).attr('id')
    var splitted = id.split("/")
    var commentID = splitted[1];
    var PostUserID = splitted[2];
    var PostID = splitted[3];

    var replyBar = document.getElementById("replyBar/"+splitted[1]).value


    // var replyBar = $('#replyBar').val();
    // var PostID = $('#postid').text();
    // var PostUserID = $('#postuser').text();
    // var commentID = $('#commentid').text();
    
    if(replyBar != ''){
        //$('#replyBar').val('');
        document.getElementById("replyBar/"+splitted[1]).value = ''
        
        $.get('/replyComment',{
            replyBar:replyBar,
            PostID: PostID,
            CommentID: commentID,
            PostUserID: PostUserID
        }, function(data, status){
            var r = document.getElementById("displayReply/" + commentID)
            r.insertAdjacentHTML('beforeend', data)
        })
    }else{
        // $('#error').text('');
    }

})

// WIP
// $("#replyCommentBtn").click(function(){
//     var replyBar = $('#replyBar').val();
//     var PostID = $('#postid').text();
//     var PostUserID = $('#postuser').text();
//     var commentID = $('#commentid').text();
    
//     if(replyBar != ''){
//         $('#replyBar').val('');
        
//         $.get('/replyComment',{
//             replyBar:replyBar,
//             PostID: PostID,
//             CommentID: commentID,
//             PostUserID: PostUserID
//         }, function(data, status){
//             $('#displayReply').append(data);
//             // var cc = $('#commentcount').text();
//             // var count= parseInt(cc) + 1;
//             // $('#commentcount').text(count);
//         })
//     }else{
//         // $('#error').text('');
//     }

// })

// $(".reply_comment").click(function(){
//     var id = $(this).attr('id')
//     var splitted = id.split("/")
//     var commentID = splitted[1];
//     var PostUserID = splitted[2];
//     var PostID = splitted[3];

//     var replyBar = document.getElementById("replyBar/"+splitted[1]).value


//     // var replyBar = $('#replyBar').val();
//     // var PostID = $('#postid').text();
//     // var PostUserID = $('#postuser').text();
//     // var commentID = $('#commentid').text();
    
//     if(replyBar != ''){
//         //$('#replyBar').val('');
//         document.getElementById("replyBar/"+splitted[1]).value = ''
        
//         $.get('/replyComment',{
//             replyBar:replyBar,
//             PostID: PostID,
//             CommentID: commentID,
//             PostUserID: PostUserID
//         }, function(data, status){
//             var r = document.getElementById("displayReply/" + commentID)
//             r.insertAdjacentHTML('beforeend', data)
//         })
//     }else{
//         // $('#error').text('');
//     }

// })

})
