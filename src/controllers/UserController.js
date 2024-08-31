const UserService = require("../services/UserService")
const JWTService = require("../services/jwtService")

const createUser = async (req, res) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const {email, name, password, confirmPassword, phone} = req.body;
    if(!email || !name || !password || !confirmPassword || !phone) {
      return res.status(200).json({
        message: 'The input is required',
        data: null
      })
    } else if(!emailRegex.test(email)) {
      return res.status(200).json({
        message: 'The email wrong validation',
        data: null
      }) 
    } else if(password !== confirmPassword) {
      return res.status(200).json({
        message: 'Password wrong validation',
        data: null
      })
    }

    const resCreateUser = await UserService.createUser(req.body);
    return res.status(200).json(resCreateUser)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const {email, password} = req.body;
    if(!email || !password) {
      return res.status(200).json({
        message: 'The input is required',
        data: null
      })
    } else if(!emailRegex.test(email)) {
      return res.status(200).json({
        message: 'The email wrong validation',
        data: null
      }) 
    }

    const resUserLogin = await UserService.loginUser(req.body);
    const {refresh_token, ...resExpectRefreshToken} = resUserLogin;
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true
    })
    return res.status(200).json(resExpectRefreshToken)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const payload = req.body;

    if(!userId) {
      return res.status(200).json({
        message: 'The userId is required!',
        data: null
      }) 
    }

    const resUpdateUser = await UserService.updateUser(userId, payload);
    return res.status(200).json(resUpdateUser)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('userId', userId);
    if(!userId) {
      return res.status(200).json({
        message: 'The userId is required!',
        data: null
      }) 
    }

    const resDeleteUser = await UserService.deleteUser(userId);
    return res.status(200).json(resDeleteUser)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

const getAllUser = async (req, res) => {
  try {

    const resAllUser = await UserService.getAllUser();
    return res.status(200).json(resAllUser)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if(!userId) {
      return res.status(200).json({
        message: 'The userId is required!',
        data: null
      }) 
    }
    const resDetailUser = await UserService.getDetailUser(userId);
    return res.status(200).json(resDetailUser)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;
    if(!token) {
      return res.status(200).json({
        message: 'The token is required!',
        data: null
      }) 
    }
    const response = await JWTService.generateNewJWT(token);
    return res.status(200).json(response)
    return;
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  refreshToken
}