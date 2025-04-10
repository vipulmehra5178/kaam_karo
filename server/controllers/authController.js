const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'});
};

exports.registerUser = async (req,res) =>{
    const {name,email,password,role}=req.body;

    if(!name || ! email || !password || !role){
        return res.status(400).json({message:'Please fill all the fields'});
    }

    const existingUser = await User.findOne({email});
    if(existingUser) return res.status(400).json({message:'User already exists'});


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role,
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id),
        });
    }else{
        res.status(400).json({message:'Invalid user data'});
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};