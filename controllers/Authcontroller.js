const createError = require('http-errors');
const User = require('../models/User');
const Help = require('../models/Help');
const Account = require('../models/Account');
const path = require('path')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const register = async (req, res, next) => {
  const user = await Account.findOne({ email: req.body.email });
  if (user) {
    const err = new Error('الحساب مسجل مسبقاً');
    err.succes = false;
    next(err);
    return;
  }
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err
      })
    }

    let user = new Account({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    })

    user.save()
      .then(user => {
        let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1h' })
        res.json({
          message: 'user added succefuly',
          succes: true,
          token: token, _id: user._id, username: user.name
        })

      })

      .catch(error => {
        res.json({
          message: 'error occuted'
        })
      })


  })


}

const login = (req, res, next) => {

  var email = req.body.email
  var password = req.body.password

  Account.findOne({ $or: [{ email: email }] })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err
            })
          }
          if (result) {
            let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1h' })
            res.json({
              message: 'login successfull',
              token: token, _id: user._id, username: user.name
            })
          } else {
            const err = new Error('كلمة السر خاطئة');
            next(err);

          }
        })
      } else {
        const err = new Error('الحساب غير موجود');
        next(err);
      }
    })
}

const addUser = async (req, res, next) => {
  const { name, company, street, guarantor, phone } = req.body;
  const avatar = req.file.path;
  
    const ItemData = new User({
      name: name,
      avatar: avatar.split('\\')[1],
      company: company,
      street: street,
      guarantor: guarantor,
      phone: phone
    })

    const result = await ItemData.save();
    res.status(201).json({ message: "add new user", itemId: result._id })
  

}
const getUser = async (req, res, next) => {
  const result = await User.find();
  if (!result) {
    const error = new Error("there is not data");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ result });

}
const updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { name, company, street, guarantor, phone } = req.body;
  try {
    const userUpdate = await User.findById(userId);
    if (!userUpdate) {
      console.log('error')
    }
    userUpdate.name = name;
    userUpdate.company = company;
    userUpdate.street = street;
    userUpdate.phone = phone;
    userUpdate.guarantor = guarantor;

    await userUpdate.save();

    res.status(201).json({ message: 'News updated!' });
  } catch (e) {
    res.status(201).json({ message: e.message, code: e.statusCode });
  }


}
const getOne = async (req, res, next) => {
  const result = await User.find(name = req.body);
  if (!result) {
    const error = new Error("there is not data");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ result });
}

const postHelp = async (req, res, next) => {
  const userId = req.params.userId
  const { type, priceTotal, priceHelp , identifier } = req.body;

  let data = new Help({
    userId: userId,
    type: type,
    priceTotal: priceTotal,
    priceHelp: priceHelp,
    identifier : identifier
  })
  const result = await data.save();
  res.status(201).json({ message: "add new help", itemId: result._id })
}
const getHelp = async (req, res, next) => {
  const result = await Help.find().populate({
    path: "userId", select: {
      _id: 1,
      name: 1
    }
  })
  if (!result) {
    const error = new Error("there is not data");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ result });

}

const deleteHelp = async (req, res, next) => {

  const helpId = req.params.helpId;
  const help = await Help.findOne({ _id: helpId });
  if (!help) {
    const error = new Error('Could not find Post.');
    error.statusCode = 404;
    throw error;
  }
  await Help.deleteOne({ _id: helpId })
  res.status(200).json({ message: 'delete fetched.', help });
}
const deleteUser = async (req, res, next) => {

  const userId = req.params.userId;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    const error = new Error('Could not find Post.');
    error.statusCode = 404;
    throw error;
  }
  await User.deleteOne({ _id: userId })
  res.status(200).json({ message: 'delete fetched.', user });
}

module.exports = {
  addUser, getUser, updateUser, postHelp, getHelp, getOne, register,login , deleteHelp , deleteUser
}