const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const publicUser = (user) => ({
	id: user._id,
	name: user.name,
	age: user.age,
	aadhaarLast4: user.aadhaarLast4,
	email: user.email
});

function createToken(user) {
	return jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

exports.register = async (request, response, next) => {
	try {
		const { name, age, aadhaarLast4, email, password } = request.body;
		if (!name || age === undefined || !aadhaarLast4 || !email || !password) {
			return response.status(400).json({ message: 'All fields are required.' });
		}
		if (!/^\d{4}$/.test(String(aadhaarLast4))) {
			return response.status(400).json({ message: 'Aadhaar last 4 digits must be exactly 4 digits.' });
		}
		if (String(password).length < 8) {
			return response.status(400).json({ message: 'Password must have a minimum length of 8 characters.' });
		}

		const hashedPassword = await bcrypt.hash(String(password), 12);
		const user = await User.create({ name, age, aadhaarLast4, email, password: hashedPassword });
		return response.status(201).json({ user: publicUser(user), token: createToken(user) });
	} catch (error) {
		next(error);
	}
};

exports.login = async (request, response, next) => {
	try {
		const { email, password } = request.body;
		if (!email || !password) return response.status(400).json({ message: 'Email and password are required.' });

		const user = await User.findOne({ email }).select('+password');
		if (!user || !(await bcrypt.compare(String(password), user.password))) {
			return response.status(401).json({ message: 'Invalid email or password.' });
		}
		return response.json({ user: publicUser(user), token: createToken(user) });
	} catch (error) {
		next(error);
	}
};

exports.me = async (request, response) => {
	response.json({ user: publicUser(request.user) });
};
