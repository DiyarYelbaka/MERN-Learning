import express  from "express";
import mongoose  from "mongoose";
import bodyParser from "body-parser";
import User from "./models/User";

const app = express();
const PORT = process.env.PORT || 5001;

require('dotenv').config()
const {DB_URI} =  process.env;

mongoose.connect(
   DB_URI,{useNewUrlParser: true, useUnifiedTopology: true},
    (err)=>{
       if(err) throw err;
       console.log('Bşarıyla Bağlandı')
    }
);

app.get('/',(req,res)=>{
    res.send("Server Çalışıyor")
})

app.get('/kullanicikaydet',(req,res)=>{
    const username='Emre' , password='223423'
    const letData = new User({
        username,
        password,
        notes:{title:'Sample',body:'Detay .....'}
    })
    letData.save((err)=>{
        if(err) throw err;
        console.log('Kaydedildi')
    })
res.send('a');
})

app.get('/notekle',(req,res)=>{
    const userID = '631a0687b01f1fbe93d55543';
    const noteTitle='Türkçe', notBody='Şey ayrı yazılır'
    User.findById(userID).then(doc=> {
        doc.notes.push({
            title:noteTitle,
            body:notBody,
        })
        doc.save();
    })
    res.end()
})

app.get('/notsilme',(req,res)=>{
    const userID = '631a0687b01f1fbe93d55543';
    const noteIdToDelete= '631a0687b01f1fbe93d55544'
    User.findById(userID).then(doc=> {
         doc.notes.map(note => {
           if(note._id == noteIdToDelete){
            note.remove()
           }
         })
        doc.save();
    })
})

app.get('/notguncelle',(req,res)=>{
    const userID = '631a0687b01f1fbe93d55543';
    const noteIdToUpdate= '631a079e63bab937b9e8f7c7'
    User.findById(userID).then(doc=> {
         doc.notes.map(note => {
           if(note._id == noteIdToUpdate){
              
                note.title= 'Matematik + Geometri'

           }
         })
        doc.save();
    })
})  

app.listen(PORT,(err)=>{
    if (err) throw err;
    console.log(`Server is running on ${PORT} port`)
});