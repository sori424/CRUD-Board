$('#btn_user_update').on('click', function() {
    $.ajax({
        url:'/users/update/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'login_id':$('#login_id').val(), 'login_pwd':$('#login_pwd').val(), 'email':$('#email').val(), 'uid':$('#uid').val()}),
        success:function(data){
            if(data.status=='OK'){ 
                //수정 성공할 경우 글 목록으로 돌아감
                
                alert('정보 수정 성공 :)');
                window.location.replace("/users/ulist");
                
            }else{
                alert('정보 수정 실패 :( 다시 시도하세요');
            }
        },
        //server 와 통신할 때 문제가 발생함, db 처리 시 발생하는 문제가 아님
        error:function(err){
            alert('정보 수정 실패 :( 다시 시도하세요');
        }

    }); 
});

$('#btn_user_delete').on('click', function() {
    if(confirm('삭제 하시겠습니까?')){
    $.ajax({
        url:'/users/delete?uid='+$('#uid').val(),
        method:'GET', 
        success:function(data){ 
            if(data.status=='OK'){ 
                    alert('삭제 성공 :)');
                    window.location.replace("/");
            } 
            else{
                alert('삭제 실패 :( 다시 시도 하세요');
            }
        },
        error:function(err){
            alert('삭제 실패 :( 다시 시도 하세요');
        }

    });  
}  

});

$('#btn_user_list').on('click', function() {
    window.location.replace("/users/ulist");
});

$('#btn_toBoard_list').on('click', function() {
    window.location.replace("/board/list");
});

