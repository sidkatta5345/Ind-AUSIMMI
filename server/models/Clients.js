var mongoose = require('mongoose');

//Create the Clients schema
var ClientsSchema = new mongoose.Schema({
	workex: [{
		name: String,
		startDate: String,
		endDate: String
	}],
	education: [{
		name: String,
		degree: String,
		stream: String,
		startDate: String,
		endDate: String
	}],
	email: String,
	firstName: String,
	lastName: String,
	address1: String,
	address2: String,
	city: String,
	postalCode: String,
	englishTest: {
		speaking: String,
		name: String,
		listening: String,
		writing: String,
		reading: String
	},
	title: String,
	dob: String,
	age: Number,
	ageString: String,
	localExpString: String,
	overseasExpString: String
});

//Export the Clients Schema
module.exports = ClientsSchema;