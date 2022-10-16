const express = require('express');
const mysql = require('mysql');

const app = express();

// Create connection
const db = mysql.createConnection({
    host     : 'localhost', // Host name
    user     : 'root', // Mysql username
    password : 'password', // Mysql password
    database : 'payments' // Database name
});

// Connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

app.get('/createdb',(req,res)=>{
    let sql = 'CREATE DATABASE payments';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

//create table
app.get('/createpaymenttable',(req,res)=>{
    let sql = 'CREATE TABLE payments(id varchar(36), userID varchar(36), learningExperienceID varchar(36), paymentID varchar(128), orderID varchar(128) , completedAt TIMESTAMP, paymentMethod varchar(36), PRIMARY KEY(id))';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Payments table created...');
    });
    let sql1 = 'CREATE TABLE failedPayments(id varchar(36), userID varchar(36), learningExperienceID varchar(36), paymentID varchar(128), orderID varchar(128),errorCode varchar(36), errorReason varchar(256), paymentMethod varchar(36), PRIMARY KEY(id))';
    db.query(sql1, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('failedPayments table created...');
    });
});

//insert payment info
app.get('/addpaymentinfo',(req,res)=>{
    const now = new Date();
    if(true){
        let post = {id: '4', userID: '1', learningExperienceID: '1', paymentID: '1', orderID: '1', completedAt: now, paymentMethod: 'Razorpay'};
        let sql = 'INSERT INTO payments SET ?';
        let query = db.query(sql, post, (err, result)=>{
            if(err) throw err;
            console.log(result);
            res.send('Payment info added...');
        });
    }
    else{
        let post = {id: '02', userID: '1', learningExperienceID: '1', paymentID: '1', orderID: '1', errorCode: '404',errorReason:'notfound', paymentMethod: 'Razorpay'};
        let sql = 'INSERT INTO failedPayments SET ?';
        let query = db.query(sql, post, (err, result)=>{
            if(err) throw err;
            console.log(result);
            res.send('failedPayment info added...');
        });
    }
});

//select payment info rows
app.get('/getpaymentinfo',(req,res)=>{
    let sql = 'SELECT * FROM payments';
    let query = db.query(sql, (err, results)=>{
        if(err) throw err;
        console.log(results);
        res.send('Payment info fetched...');
    });
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});