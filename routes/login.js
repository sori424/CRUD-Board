var express = require('express');
var connection = require('../db/mysql'); //custom module -> 공통된 부분을 빼서 중복을 없애도록 만든다 
var router = express.Router();

/* signup page */
router.get('/signup', function(req, res, next) {
    res.render('signup');
});

//server side
/* login ajax process */
router.post('/process', function(req, res, next) {
    console.log(req.body);

    var sql = 'select * from t_user where login_id=? and login_pwd=?';
    var values = [req.body.login_id, req.body.login_pwd];
    connection.query(sql, values, function(err,rows){
        if(err){
            res.json({'status':'Fail', 'err_msg':'error please retry...'});
        } else{
            if(rows.length == 1){
                req.session.logined = true; //정의하는 변수
                req.session.uid = rows[0].uid;  
                req.session.login_id = req.body.login_id; //session 즉 server side에 계속 user가 접속 중임을 알림
                req.session.user_name = rows[0].user_name;
                res.json({'status':'OK', 'login_id':req.body.login_id});
            }else{
                res.json({'status':'Fail', 'err_msg':'no user'});
            }
        }
    });

});

/* check id process */
router.get('/checkid', function(req, res, next){

    console.log(req.query.login_id); //get 방식에서는 req.query 를 통해 login id 받아옴  vs post 방식에서는 body 를 통해 받아옴
        //id 중복 검사 sql문 string 쓸때 " "
    connection.query('select uid from t_user where login_id=\''+req.query.login_id+'\'',function(err, row, field){
        //항상 error를 먼저 체크할 것
        if(err){
            //실패했으면 
            console.log(err);
            res.send('ERROR'); //send하면 문자열만 날라감
        }else{
            //query 를 날릴 때는 여러가지 case 가 존재하고 모든 case 별로 res로 처리해줘야 할 것
            //id 중복
            if(row.length > 0){
                res.send('DUPLICATED');
            }else{
                res.send('OK');
            }
        }
    });
});

router.post('/create',function(req, res, next){
    //connection.query(~) 처럼 나란하게 쿼리문 사용 불가능함
        //query 성공하고 안에서 다시 입력
    
    var sql = 'INSERT INTO board_db.t_user (login_id, login_pwd, user_name, email) VALUES (?,?,?,?)'; //prepared statement
    var values = [req.body.login_id, req.body.login_pwd, req.body.user_name, req.body.email];
    connection.query('select * from t_user where login_id=?',[req.body.login_id], function(err, row, field){
        if(err){
            //db error
            console.log(err)
            res.json({'status':'ERROR'});
        }else{
            if(row.length > 0){
                res.json({'status':'ERROR'});
            }else{
                connection.query(sql, values, function(err, row, field){
                    if(err){
                        console.log(err);
                        res.json({'status':'ERROR'});
                    }else{
                        res.json({'status':'OK'});
                        
                    }
                });
            }
        }
    });
});
module.exports = router;


