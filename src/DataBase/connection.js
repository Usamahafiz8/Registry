const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Lega-Pact",{
    // useNewUrlParaser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log(("Database Connected"));
}).catch((e)=>{
    console.log("Not Connected to Databse");
})