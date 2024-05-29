const passport = require('passport');
const LocalStratagy = require('passport-local').Strategy;
const Person = require('./model/personmodel')


//.........passport......
passport.use(new LocalStratagy(async(uname,pass,done)=>{
    try{
        const person = await Person.findOne({username:uname});
    
        if(!person)
            return done(null,false,{message:'User not found'});
        const isUser = await person.checkPassword(person.password);
        console.log('hi darshan here the respo:',isUser)
        if(isUser!=null){
            return done(null,person);
        }
        else{
            console.log('Khoto password:',isUser)
            return done(null,false,{message:'Wrong password '}) 
        }
    }
    catch(err){
        console.log("Error:",err)
        return done({error:err});
    }
}))

module.exports = passport;