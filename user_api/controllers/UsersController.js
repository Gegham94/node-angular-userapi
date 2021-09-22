const User = require('../schema/User');
const valid = require('../validation/validate');
const conf = require('../config/configuration.json');
const verifyEmailTemplate = require('../utils/verifyEmailTemplate');
const { createToken } = require('../helper/createToken');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

exports.loginUser = async (req, res, next) => {
  try {

    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user || !user.checkPassword(password)) return res.json({ message: `Incorrect Email or Password !`});
  
    const token = await createToken(user.id);
    if(!token) return res.json({message: 'Token does not created !'});

    return res.json({ message: 'Logged in successfully done 👌', token });
    
  } catch (error) {
    return next(error);
  }
};

exports.getAllUsers = async(req, res, next) => {
  try{
    const users = await User.find({});
    if(!users) return res.json({message: 'Users are not exist'});
      
    return res.json(users);

  } catch (err){
    return next(err);
  }
};

exports.getUserById = async(req, res, next) => {
  try{
    const user = await User.findById({ _id: req.params.id})
    if(!user) return res.json({message: 'User is not found'});
    return res.status(200).send({user});
    
  }catch(err){
    return next(err);
  }
};

exports.createUser = async(req, res, next) => {
  try{
    const checked = await valid.checkUserInfo(req, res);
    if(!checked.status) return res.json(checked);
    
    const { email, firstName, lastName, possition, gender, dateOfBirth, password } = req.body;
    
    const user = await User.findOne({email: email})
    if(user) return res.status(409).send({message: `User with email ${email} already exist`});
    
    const match = ["image/png", "image/jpeg", "image/jpg"];
    if(match.indexOf(req.file.mimetype) === -1){
      return res.json({status: 'Fail', message: 'Incorrect image type'});
    } 
    
    const newImageUniqueName = uuidv4();
    fs.writeFileSync(`public/${conf.media.directory}images/${newImageUniqueName}${path.extname(req.file.originalname)}`, req.file.buffer);

    const newUser = new User({
      email,
      firstName,
      lastName,
      possition,
      gender,
      dateOfBirth,
      password,
      image: `http://localhost:3000/${conf.media.directory}images/${newImageUniqueName}${path.extname(req.file.originalname)}`
    });
  
    await newUser.save()
      .then(async savedUser => {
        const token = await createToken(savedUser.id);
        if(!token) return res.json({message: 'Token does not created !'});

        // const emailSender = await verifyEmailTemplate.sendEmail(req, res, next, email, firstName);
        // if(!emailSender.status) return res.json({message: "Email is not sended"});

        return res.json({token});
        
      }).catch(err => {
        return res.status(201).send({ message: 'User is not saved !', status: err });
      });

  } catch (err) {
    throw new Error('Some error occurred while creating the User');
  }
};

exports.updateUser = async(req, res) => {
  try{
    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(user => {
        if(!user){
          return res.json({status: 'fail', message: 'User is not found !'});
        }else {
          return res.json({status: 'done', message: 'User is successfuly updated'});
        }
      }).catch(err => {
        res.json({message: "Error", data: err})
        throw err;
      });

  } catch (err) {
    return res.json({ message: 'Some error occurred while updating the User', data: err });
  }
};

exports.deleteUser = async(req, res) => {
  try{
    const id = req.params.id;

    User.findByIdAndRemove({ _id: id})
      .then(data => {
        if(!data){
          return res.json({status: 'fail', message: 'User is not found !'});
        }else {
          fs.unlinkSync(`public/${conf.media.directory}images/${data.image.split('/').pop()}`);
          return res.json({status: 'done', message: 'User is successfuly deleted'});
        }
      });
    
  }catch(err){
    return res.json({ message: 'Some error durring delete User', data: err });
  }
};