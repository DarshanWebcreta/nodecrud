const app = require('express');
const person = require('../model/personmodel');
const router = app.Router();



router.get('/', (req, res) => {
    res.status(200).json({ status: 200, message: 'Api called successfully' })
});

router.post('/addperson', async (req, res) => {
    try {
        const persondata = person(req.body);
        if (persondata.body!=null) {
            const data = await persondata.save();
            res.status(200).json(data);
        }
        else {

            res.status(200).json({ status: 400,message:"Something went wrong" ,data: res.body==null?null:res.body });
        }
        // console.log(res);
    }
    catch (e) {
        
        console.log("responce og adduser :",res.message);
        res.status(401).json({ status: 401,message:"Something went wrong", data: null });
    }
})
router.post('/:id', async (req, res) => {
     console.log("responce og whole body :",res.body);
    try {
        const uid = req.params.id;
        const data = req.body
        const persondata = await person.findByIdAndUpdate(uid,data);
        console.log("Updated log :",persondata);
        if (persondata) {
    
            res.status(200).json({status:200,message:'User updated successfully',data:data});
        }
        else {

            res.status(200).json({ status: 400,message:"Something went wrong" ,data: res.body==null?null:res.body });
        }
        // console.log(res);
    }
    catch (e) {
        console.log("responce og whole body :",res.body);
        console.log("responce og message :",res.message);
        res.status(401).json({ status: 401,message:"Something went wrong", data: null });
    }
})
router.get('/getusers',async (req, res) => {

   try{
    const data = await person.find();
    if(data){
        res.status(200).json({status:200,message:"Data Got successfully",data:data})
    }
    else{
        res.status(400).json({status:400,message:"Data Got not successfully",data:null})
    }
   }catch(e){
    res.status(401).json({status:401,message:"Something went wrong",data:null})
   }
    // res.status(200).json({ status: 200, message: 'Api called successfully' })
});

router.get('/:worktype',async (req, res) => {
    const type = req.params.worktype;

    try{
     const data = await person.find({role:type});
     if(data){
         res.status(200).json({status:200,message:"Data Got successfully",data:data})
     }
     else{
         res.status(400).json({status:400,message:"Data Got not successfully",data:null})
     }
    }catch(e){
     res.status(401).json({status:401,message:"Something went wrong",data:null})
    }
     // res.status(200).json({ status: 200, message: 'Api called successfully' })
 });

module.exports = router;