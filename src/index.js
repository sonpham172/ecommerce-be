const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3999;

app.use(bodyParser.json())
app.use(cookieParser())
routes(app);


mongoose.connect(`${process.env.MONGODB}`)
.then(() => {
  console.log('Connect DB success');
})
.catch((err) => {
  console.log('Error: ', err);
})
app.listen(PORT, () => {
  console.log('Server is running on port:' + PORT);
});