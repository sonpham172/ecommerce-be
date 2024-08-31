const UserRouter = require("./UserRoute");
const ProductRoute = require("./ProductRoute");
const routes = (app) => {
  app.use('/api/user', UserRouter)
  app.use('/api/product', ProductRoute)
}

module.exports = routes;