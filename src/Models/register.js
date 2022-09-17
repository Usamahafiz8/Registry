const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userinfoschema = new mongoose.Schema({
    Name:{type:String},
    CNIC:{type:String},
    Email:{type:String},
    Tehsil:{type:String},
    Distric:{type:String},
    Address:{type:String},
    PhoneNumber:{type:String},
    Password:{type:String},
    ConfirmPassword:{type:String},
    Tokens:[{token:{typr:String,}}]
})

// // generating a token
userinfoschema.method.generateAuthtoken = async function(){
    try {
        console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()},"thisisasecreatetokenfortogenerateatoken")
        this.Tokens = this.Tokens.concat({token})
        await this.save();
        return token;
    } catch (error) {
        res.status(401).send("this is an error")
    }
}



//converting password into hash
userinfoschema.pre("save",async function(next){

    if(this.isModified("password")){
        this.Password= await bcrypt.hash(this.Password,11);
        this.ConfirmPassword= await bcrypt.hash(this.ConfirmPassword,11);
    }
    next()
})


///THIS IS THE SCHEMA FOR THE BCRYPT THE PASSWORD IN REGISTERATION
// userinfoschema.pre('save', async function(next){
//     try {
//         const salt = await bcrypt.genSalt(11)
//         const PasswordHash = await bcrypt.hash(this.Password, salt);
//         this.Password = PasswordHash

//         this.ConfirmPassword = undefined;
//     } catch (error) {
//         console.log("there is a error in the system with saving the data on hashform");
//     }
// })



//creating a collection
const Register = new mongoose.model("Register",userinfoschema);
module.exports = Register;