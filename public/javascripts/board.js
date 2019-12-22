$('#btn_board_new').on('click', function() {
    window.location.replace("/board/register");
});

$('#btn_board_register').on('click', function() {
    $.ajax({
        url:'/board/register/process',
        method:'POST', //get 방식의 경우 용량이 크면 보낼 수 없음
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'board_title':$('#board_title').val(), 'board_content':$('#board_content').val()}),
        success:function(data){
            if(data.status=='OK'){ 
                //저장 성공할 경우 글 목록으로 돌아감
                alert('새 글 저장 성공 :)');
                window.location.replace("/board/list");
            }else{
                alert('저장 실패 :( 다시 시도 하세요');
            }
        },
        //server 와 통신할 때 문제가 발생함, db 처리 시 발생하는 문제가 아님
        error:function(err){
            alert('저장 실패 :( 다시 시도 하세요');
        }

    });    
});

$('#btn_board_list').on('click', function() {
    window.location.replace("/board/list");
});

$('#btn_board_update').on('click', function() {
    $.ajax({
        url:'/board/update/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'board_title':$('#board_title').val(), 'board_content':$('#board_content').val(), 'bid':$('#bid').val()}),
        success:function(data){
            if(data.status=='OK'){ 
                //수정 성공할 경우 글 목록으로 돌아감
                alert('글 수정 성공 :)');
                window.location.replace("/board/list");
            }else{
                alert('수정 실패 :( 다시 시도하세요');
            }
        },
        //server 와 통신할 때 문제가 발생함, db 처리 시 발생하는 문제가 아님
        error:function(err){
            alert('수정 실패 :( 다시 시도하세요');
        }

    }); 
});

$('#btn_board_delete').on('click', function() {
    if(confirm('삭제 하시겠습니까?')){
    $.ajax({
        url:'/board/delete?bid='+$('#bid').val(),
        method:'GET', 
        success:function(data){ 
            if(data.status=='OK'){ 
                    alert('삭제 성공 :)');
                    window.location.replace("/board/list");
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

$('#btn_logout').on('click', function() {
    window.location.replace("/");
});

$('#btn_user_list').on('click', function(){
    window.location.replace('/users/ulist');

});






