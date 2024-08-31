const User = require("../models/USerModel");
const bcrypt = require("bcrypt");
const { generateJWT, refreshJWT } = require("./jwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {email, name, password, confirmPassword, phone} = newUser;
      const findUser = await User.findOne({email});

      if(findUser !== null) {
        resolve({
          status: 'OK',
          message: "The email are already created",
          data: null
        })
      }

      const hash = bcrypt.hashSync(password, 10);
      console.log('hash', hash);
      const createdUser = await User.create({
        email, 
        name, 
        password: hash,
        phone
      })
      if(createdUser) {
        resolve({
          status: 'OK',
          message: "Success",
          data: createdUser
        })
      }

    } catch (error) {
      reject(error)
    }
  })
}

const loginUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {email, password} = user;
      const findUser = await User.findOne({email});
      if(!findUser) {
        resolve({
          status: 'OK',
          message: "The user is not existed!",
          data: null
        })
      }

      const isMatchPassword = bcrypt.compareSync(password, findUser.password);
      if(!isMatchPassword) {
        resolve({
          status: 'OK',
          message: "The password is incorrect!",
          data: null
        })
      }

      const access_token = await generateJWT({
        id: findUser.id,
        isAdmin: findUser.isAdmin
      })

      const refresh_token = await refreshJWT({
        id: findUser.id,
        isAdmin: findUser.isAdmin
      })

      resolve({
        status: 'OK',
        message: "Login success",
        access_token,
        refresh_token
      })
    } catch (error) {
      reject(error)
    }
  })
}

const updateUser = (id, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findUser = await User.findOne({_id: id});
      if(!findUser) {
        resolve({
          status: 'OK',
          message: "The user is not existed!",
          data: null
        })
      }
      const updatedUser = await User.findByIdAndUpdate(id, payload, {new: true});

      resolve({
        status: 'OK',
        message: "Update user success",
        data: updatedUser
      })
    } catch (error) {
      reject(error)
    }
  })
}

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findUser = await User.findOne({_id: id});
      console.log('findUser', findUser);
      if(!findUser) {
        resolve({
          status: 'OK',
          message: "The user is not existed!",
          data: null
        })
      }
      await User.findByIdAndDelete(id);

      resolve({
        status: 'OK',
        message: "Delete user success",
      })
    } catch (error) {
      reject(error)
    }
  })
}

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();

      resolve({
        status: 'OK',
        message: "Get all success",
        data: allUser
      })
    } catch (error) {
      reject(error)
    }
  })
}

const getDetailUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('userIdss', userId);
      const findUser = await User.findOne({_id: userId});
      console.log('findUser', findUser);
      if(!findUser) {
        resolve({
          status: 'OK',
          message: "The user is not existed!",
          data: null
        })
      }
      resolve({
        status: 'OK',
        message: "Get detail user success",
        data: findUser
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  createUser, 
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser
}