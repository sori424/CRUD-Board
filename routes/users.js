var express = require('express');
var connection = require('../db/mysql');
var router = express.Router();

/* GET users listing. */
router.get('/ulist', function(req, res, next) {
  connection.query('select *, date_format(cdate, \'%Y-%m-%d %H:%i:%s\') as cdate2 from t_user', function(err, rows){
    if(err){
      res.render('userList', {'stauts':'Error'});
    }else{
      res.render('userList', {'status':'OK','data':rows, 'key':''});
    }
  });
});

router.get('/update', function(req, res, next){
  connection.query('select * from t_user where uid = ?', [req.query.uid], function(err, rows){
    if(err){
      res.render('userUpdate', {'status':'Error'});
    }else{
        res.render('userUpdate', {'status':'OK','data':rows});
        console.log('rows', rows);
    }
  });
});

router.post('/update/process', function(req, res, next){
  console.log(req.body);
  var sql = 'update t_user set login_id=?, login_pwd=?, email=? where uid=?';
  var values = [req.body.login_id, req.body.login_pwd, req.body.email, req.body.uid];
  connection.query(sql, values, function(err, result){
      if(err){
          console.log(err);
          res.json({'status':'Error'});
      }else{    
          console.log(result)
          if(result.affectedRows == 1){
              res.json({'status':'OK'});
              req.session.changed = true;
              req.session.login_id = req.body.login_id;
              req.session.login_pwd = req.body.login_pwd;
              req.session.email = req.body.email;
              console.log('login_id: ',req.session.login_id);
              
          }else{
              res.json({'status':'Error'});
          }
      }

  });
});

router.get('/delete', function(req, res, next){
  var sql = 'delete from t_user where uid=?';
  var values = [req.query.uid];
  connection.query(sql, values, function(err, rows){
      if(err){
          res.json({'status':'Error'});
      }else{      
          res.json({'status':'OK'});
          req.session.destroy();
          res.render('/');
      }
  });
});

router.post('/search/process', function(req, res, next){
  var sql = 'select *,date_format(cdate, \'%Y-%m-%d %H:%i:%s\') as cdate2 from t_user where user_name like ?';
  var values = ['\%'+req.body.key+'\%'];
  console.log('key',req.body.key);
  connection.query(sql, values, function(err, rows, fields){
      if(err){
          res.render('boardList',{'status':'Error'});
      }else{
          if(rows.length>=0){
              
                  res.render('userList',{'status':'OK','data':rows, 'key':req.body.key});  
              
          }else{
                  res.render('userList',{'status':'Error'});
          }
      }
  });
});




module.exports = router;


