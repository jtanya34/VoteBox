const express= require('express');
const hbs=require('hbs');
const app=express();
const path = require('path');
const authRoutes=require('./routes/auth-routes');
const profileRoutes=require('./routes/profile-routes');
const  bodyParser  = require('body-parser');
const passportSetup=require('./config/passport-setup');
const mongoose=require('mongoose');
const keys=require('./config/keys');
const port=process.env.PORT||3000;
const cookieSession=require('cookie-session');
const passport=require('passport');

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, 'views')));
app.set('view engine',hbs); 


app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}));


//initialize passport
app.use(passport.initialize());
app.use(passport.session());


//connect mongodb
mongoose.connect(keys.mongodb.dbURI,()=>{
    console.log('connected to db');
})

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
app.get('/',(req,res)=>{
    res.render('homepage.hbs');
});


app.listen(port,()=>{
    console.log(`app is on port ${port}`);
});