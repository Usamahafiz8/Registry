const express = require("express");
const path = require("path")
const app = express();
const port = process.env.PORT || 3000;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("./DataBase/connection");
const Register=require("./Models/register");
const static_path = path.join(__dirname,"../public")
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));



//for home page
app.get("/",(req,res)=>{
    res.render('index')
});



//sign up  (Registration)
// for the registeration page to get the data from the user
app.get("/register",(req,res)=>{
    res.render('register')
});
app.post("/register",async (req,res)=>{
    try {
        // console.log(req.body.Name);
        // res.send(req.body.Name);
        const Password  = req.body.Password;
        const CPassword  = req.body.ConfirmPassword;
        if (Password===CPassword){
            const registerUser = new Register({
                Name : req.body.Name,
                CNIC : req.body.CNIC,
                Email : req.body.Email,
                Tehsil : req.body.Tehsil,
                Distric: req.body.Distric,
                Address : req.body.Address,
                PhoneNumber : req.body.PhoneNumber,
                Password : req.body.Password,
                ConfirmPassword : req.body.ConfirmPassword

            })
             
            const token = await registerUser.generateAuthtoken();
        
             
           const registered = await registerUser.save();
            res.status(201).render("index")
        }else{
            res.send("Password not matching")
        }
    } catch (error) {
        res.send(400).send(error);
    }    

});


// sign in   (login system)
app.get("/login",(req,res)=>{
    res.render('login')
});
app.post("/login", async(req,res)=>{
    try {
        const CNIC = req.body.CNIC;
        const Password = req.body.Password;
        const UserCNIC = await Register.findOne({CNIC:CNIC});
        const Match = await bcrypt.compare(Password,UserCNIC.Password)

        if (Match){
            res.status(201).render("index")
        }else{
            res.send("Invalid Info")
        }
    } catch (error) {
        res.status(400).send("invalid CNIC")
    }
})

//testing of the server...
app.listen(port,()=>{
    console.log("Server is Running...");
})