const app = require('express');
const person = require('../model/personmodel');
const router = app.Router();
const {generateToken,jwtMiddleWare} = require('./../jwt')
const multer = require('multer')
const storage  = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
})

const upload = multer({storage:storage})

router.get('/', jwtMiddleWare,(req, res) => {
    const userData = req.user; // Access the decoded token data
    res.status(200).json({ status: 200, message: 'API called successfully', data: userData });
});

router.post('/login', async(req, res) => {
   
    try{
        const userData = req.body;
        // const {username,password} = req.body;
        const  user =  await person.findOne({username:userData.username})
    if(!user|| !(await user.checkPassword(userData.password))){
        return res.status(200).json({status:401,message:"User not exist"})
    }
    const payload = {
        id: user.id,
        username:user.username
    }
    const jwttoken  =  generateToken(payload);

   
    res.status(200).json({ status: 200, token:jwttoken,message: 'Api called successfully' })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: 500,message: 'Something went wrong' })
    }
});
//router.post('/upload',upload.array('mypic',20),async(req, res) => {
router.post('/upload',upload.single('mypic'),async(req, res) => {
   
    try{
        console.log(req.file)
     es.status(200).json()

   
    }catch(err){
        console.log(err);
        res.status(500).json({ status: 500,message: 'Something went wrong' })
    }
});

router.get('/profile', jwtMiddleWare,async(req, res) => {
   
    try{
        const userdata = req.user;
        console.log(userdata)
        const  user =  await person.findById(userdata.id)
        console.log(user)
   

    res.status(200).json({ status: 200,message: 'Data Found successfully',data:user })
    }catch(err){
        console.log(err);
        res.status(500).json({ status: 500,message: 'Something went wrong',data:null })
    }
});


router.post('/addperson', upload.single('image'),async (req, res) => {
    try {
        
        const persondata =   person({
            name:req.body.name ,
            role: req.body.role,
            password:req.body.password,
            salary: req.body.salary,
            username:req.body.username ,
            image:req.file.filename
        })
        if (persondata) {
            const data = await persondata.save();
            res.status(200).json(data);
        }
        else {

            res.status(200).json({ status: 400,message:"Something went wrong" ,data: res.body==null?null:res.body });
        }
        // console.log(res);
    }
    catch (e) {
        
        console.log("responce og adduser :",res.error);
        res.status(401).json({ status: 401,message:"Something went wrong", data: e });
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