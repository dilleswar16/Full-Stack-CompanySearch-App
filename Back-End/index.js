const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql2');

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"marqi"
})
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api',(req,res)=>{
    const sqlInsert = "select * from companynameList";
    db.query(sqlInsert,(err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else {
            res.send(rows);
        }
    })
})
app.post('/api/addCompany',(req,res)=>{
    const companyName = req.body.companyName;
    const companyId = req.body.companyId;
    const sqlInsert = "INSERT INTO companynameList (companyName, companyId) VALUES (?,?)";
    db.query(sqlInsert,[companyName,companyId],(err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        else {
            console.log("sucess");
        }
    })
});


app.listen(3001,()=>{
    console.log("Running on port 3001");
})