const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: {type: String, unique: true, match: [/.+@.+\..+/, "Please enter a valid e-mail address"]},
  password: {type: String, required: true, validate: [({ length }) => length >= 8, "Password should be  8 longer."]},
  checked: {type: Boolean, required: true, default: false},
  image: {type: String, required: false},
  date: { type: Date, default: Date.now },
});

// adds a method to a user document object to create a hashed password
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

// adds a method to a user document object to check if provided password is correct
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password)
}

// middleware: before saving, check if password was changed,
// and if so, encrypt new password before saving:
userSchema.pre('save', function(next) {
	console.log(`Just triggered the pre save hook`)
	console.log(this.isModified('password'))
	if(this.isModified('password')) {
		this.password = this.generateHash(this.password)
		next()
	} else {
	next()
	}
})

const User = mongoose.model('User', userSchema)
module.exports = User