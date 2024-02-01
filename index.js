const express = require('express');
const urlRoute = require('./routes/url');
const URL = require("./models/url");
const { connectToMongoDB } = require('./connect');

const app = express();
const port = 5000;

connectToMongoDB('mongodb://localhost:27017/short-url').then(
    console.log("MongoDB is Successfullly Connected")
);

app.use(express.json());

app.use("/url" , urlRoute);

app.get('/:shortId', async (req,res) =>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId 
    } , { 
        $push :{
            visitHistory : {
                timestamp : Date.now()
            }
        }
    })

    res.redirect(entry.redirectURL);
});

app.listen(port , () => console.log('Server Started at port',port) )

