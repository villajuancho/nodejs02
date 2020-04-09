
var express = require('express');
var fs = require('fs');
var mysql = require('mysql');

var router = express.Router();
var users = {};
router.use(express.json());


var con = mysql.createConnection({
    host: "192.168.92.141",
    user: "root",
    password: "Passw0rd!",
    database: "prueba"
});


con.connect(function(err) {
    if (err) console.log(err);//throw err;
    console.log("Connected!");
});


router.post('/', function(req, res) {
    console.log(req.body);
    try{
        if(req.body.id){
            var id = req.body.id
            users[id] = req.body;
            var jsonContent = JSON.stringify(req.body);
            fs.writeFile(id, jsonContent, 'utf8', function (err) {
                if (err) throw err;
                res.status(200).json({resp: 'ok file'});
            });
    
        }else{
            throw 'No ID';
        }
    }catch(error){
        console.log("ERROR" + error);
        res.status(500).json({'error': error});
    }
    
    //res.status(500).json({resp:'end'})
}); 

router.get('/', function(req, res) {
    
    try{
        let sql = "SELECT NOMBRE, IDENTIFICATION FROM USER WHERE IDENTIFICATION = '80850751'";
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result[0].NOMBRE);
        });

        console.log(req.query);
        fs.readFile(req.query.id, (err, data) => {
            if (err){
                console.log(err);
                res.status(500).json({'error': err});
            }else{
                users[req.query.id] = JSON.parse(data);
                console.log(users);
                res.status(200).json(users[req.query.id]);
            }
        });
    }catch(error){
        //console.log("ERROR" + error);
        res.status(500).json({'error': error});
    }
}); 


module.exports = router;