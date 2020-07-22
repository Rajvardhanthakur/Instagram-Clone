const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')




router.get('/', (req, res)=> {
	res.send('hello')
})

router.post('/signup', (req, res)=>{
	const {name, email, password} = req.body

	if(!email || !password || !name){
		return res.status(422).json({error:"please add all the fields"})
	}


	User.findOne({email:email}).then((savedUser)=>{
		if(savedUser){
			return res.status(422).json({err:"User already exists with this email"})
		}

		bcrypt.hash(password, 12)
		.then(hashedPassword => {
			const user = new User({
				email,
				password: hashedPassword,
				name
			})

			user.save()
			.then(user => {
				res.json({message: "saved successfully"})
			})
			.catch(err => {
				console.log(err)
			})
		})

	})


	res.json({message:"successfuly posted"})
})



router.post('/signin', (req, res)=>{
	const {email, password} = req.body
	if(!email || !password){
		return res.status(422).json({error: "please add email or password"})
	}

	User.findOne({email:email})
	.then(savedUser=>{
		if(!savedUser){
			return res.status(422).json({error: "Inavalid Email or password"})
		}
		bcrypt.compare(password, savedUser.password)
		.then(doMatch => {
			if(doMatch){
				//res.json({message: "successfully signed in"})
				const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
				res.json({token})
			}
			else{
				return res.status(422).json({error:"Inavalid Email or password"})
			}
		})

	})
	.catch(err => {
		console.log(err)
	})
})


module.exports = router
