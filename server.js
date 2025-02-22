const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const  CategoryRouter = require("./routes/category");
const resCategory = require("./routes/restaurant");

dotenv.config();

mongoose.connect(process.env.MONGOURL).then( () => {
    console.log("Data Base is connected");
}).catch((errr) => {
   console.log(errr);
});

app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use("/api/category", CategoryRouter);
app.use("/api/restaurant", resCategory);






app.get('/', (req, res) => res.send('Hello world'))

app.listen(process.env.PORT || 6013, () => console.log(`Example app listening on port ${process.env.PORT}!`))
