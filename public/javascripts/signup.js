var isCheckedId = false; //id check 했는 지 checking

//만약 idchecked 를 완료했는데 id를 바꾸는 경우.. 
    //keydown, keypress, change, keyup
$('#login_id').keyup(function(){
    if(isCheckedId){
        isCheckedId = false;
        $('#message').text('id 체크를 다시 해주세요');
    }
    console.log($('login_id').val());
});

$('#btn_check_id').on('click', function() {
    if($('#login_id').val().length < 5){
        alert('5자 이상 입력하세요');
    }else{
        //post, get, error, success 처리 모두 다 할 수 있음
        //ajax 로 처리하는 기본 구조
        $.ajax({
            //get 방식: url 뒤에 붙여서 처리함
            url:'/login/checkid?login_id='+$('#login_id').val(),
            method:'GET',
            success:function(data){
                if(data == 'OK'){
                    isCheckedId = true;
                    $('#message').text('id 사용 가능');
                }else if(data == 'DUPLICATED'){
                    isCheckedId = false;
                    $('#message').text('id 사용 불가능');
                }else{
                    isCheckedId = false;
                    $('#message').text('error 발생.. 재시도..');
                }

            },
            error:function(err){
                isCheckedId = false;
                $('#message').text('error 발생.. 재시도..');
            }
        }); 

    }
});

//password 입력하면서 confirm password와 같은지 다른지 출력함
$('#confirm_pwd').keyup(function(){
    if($('#login_pwd').val() == $('#confirm_pwd').val()){
        $('#pwd_check').text('비밀번호가 같습니다.');
    }else{
        $('#pwd_check').text('비밀번호가 다릅니다.');
    }
});


$('#btn_signup').on('click', function() {
    if(!isCheckedId){
        alert('ID 체크 해주세요');
        return;
    }
    //name check
    if($('#user_name').val().length < 3){
        alert('user name 4글자 이상');
        return;
    }
    //password check
        
    if($('#login_pwd').val() != $('#confirm_pwd').val()){
        alert('비밀번호가 다릅니다.');
        return;
    }
    
    //email check => 올바른 format 인지 확인함
    var regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regExp.test($('#email').val())){
        alert('이메일 형식 확인해주세요.');
        return;
    }


    //check 해야하는 조건이 여러개일 경우 if else 문을 계속 사용하면 coding complexity 가 높아짐
    $.ajax({
        //post 할 때 
        url:'/login/create',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({
            //json 입력 시 string type 으로 입력할 것
            'user_name':$('#user_name').val(),
            'login_id':$('#login_id').val(),
            'login_pwd':$('#login_pwd').val(), //val()은 login_pwd 의 string형을 반환함
            'email':$('#email').val()
        }),
        success:function(data){
            alert('가입 성공:) 로그인 해주세요');
            window.location.replace('/');
        },
        error:function(err){
            $('#message').text('error 발생.. 재시도..');
            //http protocol 실패 , network 상황 자체에 대한 오류
        }
    });
});