const mongoose=require("mongoose");
const express=require("express");
const bodyParser=require("body-parser");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/userModel");


const app=express();

//Routes
const indexRoutes=require("./routes/indexRoutes");
const userRoutes=require("./routes/userRoutes");

mongoose.connect('',{
    useCreateIndex: true,
    useNewUrlParser:true
    
});
app.set('view engine','ejs');
app.use(express.static('public'));
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({extended:true}));


//Passport Config
app.use(require("express-session")({
    secret:"secretWeapon",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Current user info within all routes
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    next();
})

//Routes using
app.use(indexRoutes);
app.use(userRoutes);


const server=app.listen(process.env.PORT||5000,(err)=>{
    if(err) console.log(err);

});

