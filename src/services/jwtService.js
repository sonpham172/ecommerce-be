const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateJWT = async (payload) => {
  const access_token = jwt.sign({
    payload,
  }, process.env.ACCESS_TOKEN, {expiresIn: '1d'})

  return access_token;
}

const refreshJWT = async (payload) => {
  const access_token = jwt.sign({
    payload,
  }, process.env.REFRESH_TOKEN, {expiresIn: '365d'})

  return access_token;
}

const generateNewJWT = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(
        token, process.env.REFRESH_TOKEN, async (err, user) => {
        if(err) {
          resolve({
            status: 'ERROR',
            message: "Can't refresh JWT"
          })
        }
        const {payload} = user;
        const newAccessToken = await generateJWT({
          id: payload?.id,
          isAdmin: payload?.isAdmin
        })

        resolve({
          status: 'OK',
          message: "Refresh JWT success",
          access_token: newAccessToken
        })
      })
    } catch (error) {
      reject(error)
    }
  })

}

module.exports = {
  generateJWT,
  refreshJWT,
  generateNewJWT
}