const express=require('express')
const app=express()
const port =4000
const db = require("./connection/db");
const home=require("./routes/index")



app.use(express.json());
app.use("/",home)
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})



db.sync().then(() => {
    app.listen(port, (err) => {
        if (err) {
            throw err
        } else {
            console.log(`your app is running on PORT : ${port}`)
        }
    })
}).catch(err => console.log("Error: " + err));