const express = require('express');
const mongoose = require('mongoose');

// server config
const app = express();
const port = process.env.PORT || 3000;

require('./database/connection');

// app middleware
app.use(express.json());

// app routes
const userRoutes = require('./routes/user');

app.use(userRoutes);

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
