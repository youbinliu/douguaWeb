//    "avatar":"http://hdn.xnimg.cn/photos/hdn321/20120201/1815/h_tiny_mEZu_71990004e27d2f76.jpg",
//    "content":"测试",
//    "created_at":"2012-06-05T22:00:54+08:00",
//    "id":34,
//    "live_id":161,
//    "updated_at":"2012-06-05T22:00:54+08:00",
//    "user_id":85,
//    "username":"刘友斌"

function like(it) {
    $.post("./test/likes.json", {
        "id" : "168"
    }, function(data) {
        $(it).parent().html("<img onclick='dislike(this)' src=\"./images/like_y.png\" alt=\"like\"/>" + "<span class='font-red'>4</span>");
    })
}

function dislike(it) {
    $.post("./test/likes.json", {
        "id" : "168",
        "_method" : "delete"
    }, function(data) {
       $(it).parent().html("<img onclick='like(this)' src=\"./images/like_n.png\" alt=\"dislike\"/>" + "<span class='font-gray'>3</span>");
    })
}
function like_s(it) {
    $.post("./test/likes.json", {
        "id" : "168"
    }, function(data) {
        $(it).parent().html("<img onclick='dislike_s(this)' src=\"./images/like_s_y.png\" alt=\"like\"/>" + "<span class='font-red'>4</span>");
    })
}

function dislike_s(it) {
    $.post("./test/likes.json", {
        "id" : "168",
        "_method" : "delete"
    }, function(data) {
       $(it).parent().html("<img onclick='like_s(this)' src=\"./images/like_s_n.png\" alt=\"dislike\"/>" + "<span class='font-gray'>3</span>");
    })
}

var jsondata;
var currentIfOpened = false;
function initComments(eventid){
    $.get("./test/comments.json",{"aid":"657"},function(data){       
                    jsondata = data;          
                    showComments();
                },'json');      
              
}

function showComments(){
    comments = buildCommentsHtml(jsondata);
    $('.iframe-msgs').html(comments)
}

function buildCommentsItem(commentObj){
    var updated_at = commentObj.updated_at.substring(11,16) +" "+commentObj.updated_at.substring(5,10);
    return "<div class=\"iframe-item left\">"+
                    "<img src=\""+commentObj.avatar+"\" alt=\"avatar\" class=\"left\"/>"+
                    "<div class=\"iframe-replyinfo left\">"+
                        "<div class='commentline'><span  class=\"font-12 font-green \" style=\"margin-right: 5px;\">"+commentObj.username+"</span>"+
                         "<span class=\"font-12 font-black \">"+commentObj.content+"</span></div>"+
                       "<span  class=\"font-12 font-gray left\">"+updated_at+"</span>"  + 
                      
                    "</div>"+
                "</div>";       
}

function buildCommentsHtml(jsondata){
    if(jsondata.success){
        var commentslist = jsondata.data;
        var num = commentslist.length;
        var commentsHtml = "";
        var needShowNum = 5;
        if(num >needShowNum){
            for(i=num-1; i > num-needShowNum; i--) commentsHtml += buildCommentsItem(commentslist[i]); 
            commentsHtml += "<a class=\"font-12 font-green\" href=\"javascript:;\" onclick=\"openAllComments();\">展开所有"+num+"条回复&gt;</a>";            
            commentsHtml += buildCommentsItem(commentslist[0]);
        }else{
            for(i=num-1;i >= 0;i--) commentsHtml += buildCommentsItem(commentslist[i]);
        }
        return commentsHtml;
    }
}

function openAllComments(){
    currentIfOpened = true;
    if(jsondata.success){
        var commentslist = jsondata.data;
        var num = commentslist.length;    
        var commentsHtml = "";   
        for(i=num-1;i >= 0;i--) commentsHtml += buildCommentsItem(commentslist[i]);
        $('.iframe-msgs').html(commentsHtml);
    }    
}

function replyto(cid){
    content = $("#iframe-replyto").val();
    $("#iframe-replyto").val("");
    //TODO check data here
    $.post("./test/comments.json?lid=168",{"content":content},function(data){
            comment = buildTestData(content);
            index = jsondata.data.length;
            jsondata.data[index] = comment;
            if(currentIfOpened){
                openAllComments();
            }else{
                showComments();
            }
    })
    
}


function buildTestData(content){    
    var comment =    
    {    
        "avatar":"http://hdn.xnimg.cn/photos/hdn321/20120201/1815/h_tiny_mEZu_71990004e27d2f76.jpg",
        "content":content,
        "created_at":"2012-06-05T22:00:54+08:00",
        "id":34,
        "live_id":161,
        "updated_at":"2012-06-05T22:00:54+08:00",
        "user_id":85,
        "username":"刘友斌"
    }   
    return comment;
}


