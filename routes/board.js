var express = require('express');
var connection = require('../db/mysql');
var router = express.Router();

/* board list page */
router.get('/list', function(req, res, next) {
    
        connection.query('select *, date_format(cdate, \'%Y-%m-%d %H:%i:%s\') as cdate2 from t_board',function(err, rows){
            if(err){
                res.render('boardList', {'status':'Error'});
            }else{
                res.render('boardList', {'status':'OK', 'data':rows, 'key':''});
            }
        });   
});

/* board Register page */
router.get('/register', function(req, res, next) {
    res.render('boardRegister');
});

/* board register process ajax -> board.js from javascript */ 
router.post('/register/process', function(req, res, next){
    var sql = 'insert into t_board (user_id, user_name, title, content) values(?, ?, ?, ?)';
    var values = [req.session.login_id, req.session.user_name, req.body.board_title, req.body.board_content];
    connection.query(sql, values, function(err, result){
        if(err){
            res.json({'status':'Error'});
        }else{
            console.log(result);
            if(result.insertId != 0){
                res.json({'status':'OK'});
            }else{
                res.json({'status':'Error'});
            }
        }

    });
});

/* board Update page */
router.get('/update', function(req, res, next) {
    connection.query('select * from t_board where bid = ?', [req.query.bid], function(err, rows){        
        if(err){
            res.render('boardUpdate',{'status':'Error'});
        }else{
            res.render('boardUpdate', {'status':'OK', 'data':rows});
            console.log(rows)
        }
    });   
});

router.post('/update/process', function(req, res, next){
    var sql = 'update t_board set title=?, content=? where bid=?';
    var values = [req.body.board_title, req.body.board_content, req.body.bid];
    connection.query(sql, values, function(err, result){
        if(err){
            console.log(err);
            res.json({'status':'Error'});
        }else{    
            console.log(result)
            if(result.affectedRows == 1){
                res.json({'status':'OK'});
                
            }else{
                res.json({'status':'Error'});
            }
        }

    });
});

router.get('/delete', function(req, res, next){
    var sql = 'delete from t_board where bid=?';
    var values = [req.query.bid];
    connection.query(sql, values, function(err, rows){
        if(err){
            res.json({'status':'Error'});
        }else{      
            res.json({'status':'OK'});
        }
    });
});

router.get('/logout', function(req, res, next){
    req.session.destroy();
    res.render('logout');
});

router.post('/search/process', function(req, res, next){
    var sql = 'select *,date_format(cdate, \'%Y-%m-%d %H:%i:%s\') as cdate2 from t_board where title like ?';
    var values = ['\%'+req.body.key+'\%'];
    console.log('key',req.body.key);
    connection.query(sql, values, function(err, rows, fields){
        if(err){
            res.render('boardList',{'status':'Error'});
        }else{
            if(rows.length>=0){
                
                    res.render('boardList',{'status':'OK','data':rows, 'key':req.body.key});  
                
            }else{
                    res.render('boardList',{'status':'Error'});
            }
        }
    });
});

module.exports = router;
