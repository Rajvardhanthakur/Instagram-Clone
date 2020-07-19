const express = require('express');
const app = express()
const mongoose = require('mongoose');
const PORT = 5000
const {MONGOURI} = require('./keys');


require('./models/user')


app.use(express.json())
app.use(require('./routes/auth'))

mongoose.connect(MONGOURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=> {
	console.log("Database connected");
})

mongoose.connection.on('error', (err)=> {
	console.log("error on connecting to database : ", err);
})

app.get('/', (req, res)=>{
	res.send("hello world")
})

app.listen(PORT, ()=> {
	console.log("server is running on : ", PORT);
})