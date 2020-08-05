const mongoose = require('mongoose')

const {ObjectId} = mongoose.Schema.Types

const userschema = new mongoose.Schema({
	name: {
		type: String, 
		required: true
	},
	email:{
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	pic:{
		type:String,
		default: "https://res.cloudinary.com/rajvardhan3399/image/upload/v1596635841/images_k90egf.jpg"
	},
	followers:[{type:ObjectId, ref:"User"}],
	following:[{type:ObjectId, ref:"User"}]
})

mongoose.model("User", userschema)