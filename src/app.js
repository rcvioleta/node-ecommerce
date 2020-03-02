const express = require("express");

require("dotenv").config();
require("./database/connection");

// server config
const app = express();
const port = process.env.PORT || 3000;

// app middleware
app.use(express.json());

// app routes
const userRoutes = require("./routes/user");
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// const jwt = require('jsonwebtoken');

// const myFunc = async () => {
// 	const token = jwt.sign({ _id: 'jwtid123' }, 'ecommerceSys');
// 	console.log('token: ', token);

// 	const decoded = jwt.verify(token, 'ecommerceSys');
// 	console.log('decoded: ', decoded._id);
// };

// myFunc();
