const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            enum: ['manager', 'employee', 'hr'],
            required: true
        },
        salary: {
            
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
        
        },
        image: {
            type: String,
           
        },

        password: {
            type: String,
            required: true,
        },


    }
);

personModel.pre('save',async function(next){
    const person = this;
    if(!person.isModified('password')) return next()

        try{
            const salt  =  await bcrypt.genSalt(10);
            const pass = await bcrypt.hash(person.password,salt);
            person.password = pass;
            next();
        }catch(err){
            console.log('im update here',err);
            next(err);
        }
})
personModel.methods.checkPassword = async function(pass){
    //first it will extract from stored password salt then  it will +
    //salt + enterd pass  =  hash bane ane compare karse stored pass jode
   


try{
    const isMatch = await bcrypt.compare(pass,this.password);
   
        return isMatch;
  
}
catch(err){
    throw err;
}
}



const Person = mongoose.model('Person', personModel);
module.exports = Person;