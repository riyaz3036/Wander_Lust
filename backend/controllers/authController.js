const User= require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');


//Registering the user
const Register = async (req,res)=>{
    try{
       
        //encrypting (hashing) password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        
       
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            phone: req.body.phone,
            balance: 80000,
            bookings:[]
        });

        await newUser.save();

        res.status(200).json({success:true, message: 'Succesfully registered'});


    }catch(err){
        res.status(500).json({success:false, message: 'Failed to register. please try again!!'});

    }
};


//Logging the user
const Login = async (req,res)=>{
    
    const email =req.body.email  
                                                                                                                                                         
    
    try{
        const user = await User.findOne({email});
        
        //check if exsists
        if(!user){
            return res.status(404).json({success:false, message: 'User Not Found'});
        }
        
        //check password
        const checkCorrectPassword =  await bcrypt.compare(req.body.password,user.password);
        
 
        if(!checkCorrectPassword){
            return res.status(401).json({success:false, message: 'Incorrect email or Password'});
        }

        
        const { password, role, ...rest } = user._doc;
      
        console.log('hellooooo');
        const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
        //creating a jwt 
        const token = jwt.sign({id:user._id.toString(), role:user.role}, secretKey,{ expiresIn: "15d"});

       
        
 
        //setting token in the browser cookies and send response to client
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({token,success: true,message: "successfully login",data:{...rest},role,});

        

    }catch(err){
        res.status(500).json({ token,success:false, message: 'Failed to login'});
    }
};


module.exports = {Login, Register};