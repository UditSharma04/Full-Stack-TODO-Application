const express = require('express')
const cors = require('cors')
const app = express();
const mysql = require('mysql2')

app.use(express.json())
app.use(cors()) //cross-origin resouce 

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : "Udit@2002",
    database : 'sys'

})

db.connect((err) => {
    if(!err){
        console.log("Connected to database successfully");
        
    }else{
        console.log(err);
        
    }
})

app.post('/new-task', (req, res) => {
    const q = 'INSERT INTO todos (task, createdAt, status, priority, dueDate, category, notes) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(q, [
        req.body.task, 
        new Date(), 
        'active',
        req.body.priority || 'medium',
        req.body.dueDate || null,
        req.body.category || 'General',
        req.body.notes || ''
    ], (err, result) => {
        if(err){
            console.log('failed to store');
            console.log(err);
        } 
        else{
            console.log('todo saved');
            const updatedTasks = 'SELECT * FROM todos'
            db.query(updatedTasks, (error, newList) => {
                res.send(newList)
            })
        }
    })
})

app.get('/read-tasks', (req, res) => {
    const q = 'select * from todos';
    db.query(q, (err, result) => {
        if(err){
            console.log("failed to read tasks");
            
        }
        else{
            console.log("got tasks successfully from db");
            res.send(result)
            
            
        }
    })
})

app.post('/update-task', (req, res) => {
    const q = 'UPDATE todos SET task = ?, priority = ?, dueDate = ?, category = ?, notes = ? WHERE id = ?'
    db.query(q, [
        req.body.task, 
        req.body.priority,
        req.body.dueDate,
        req.body.category,
        req.body.notes,
        req.body.updateId
    ], (err, result) => {
        if(err) {
            console.log('failed to update');
        }
        else{
            db.query('SELECT * FROM todos', (e, r) => {
                if(e){
                    console.log(e);
                }
                else{
                    res.send(r)
                }
            })
        }
    })
})

app.post('/delete-task', (req, res) => {
    const q = 'delete from todos where id = ?';
    db.query(q, [req.body.id], (err, result) => {
        if(err){
            console.log('Failed to delete');
            
        }else{
            console.log('Deleted successfully');
            db.query('select * from todos', (e, newList) => {
                res.send(newList);
            })
        }
    })
})

app.post('/complete-task', (req, res) => {
    console.log(req.body);
    
    const q = 'update todos set status = ? where id = ?'
    db.query(q, ['completed', req.body.id], (err, result) => {
        if(result){

            
            db.query('select * from todos', (e, newList) => {
                res.send(newList)
            })
        }

    })
})

app.post('/revert-task', (req, res) => {
    const q = 'UPDATE todos SET status = "active" WHERE id = ?';
    db.query(q, [req.body.id], (err, result) => {
        if(err){
            console.log("failed to revert task");
        }
        else{
            console.log("task reverted successfully");
            const updatedTasks = 'SELECT * FROM todos'
            db.query(updatedTasks, (error, newList) => {
                res.send(newList)
            })
        }
    })
})

app.listen(5000, () => {console.log('server started');
})

