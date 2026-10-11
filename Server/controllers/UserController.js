const bcrypt = require('bcryptjs');

const safeUser = (user) => ({
	id: user._id,
	name: user.name,
	age: user.age,
	aadhaarLast4: user.aadhaarLast4,
	email: user.email
});

exports.getUsers = async (request, response) => {
	response.json({ users: [safeUser(request.user)] });
};

exports.getUser = async (request, response) => {
	if (String(request.user._id) !== request.params.id) {
		return response.status(403).json({ message: 'You are not authorized to view this user.' });
	}
	response.json({ user: safeUser(request.user) });
};

exports.updateUser = async (request, response, next) => {
	try {
		if (String(request.user._id) !== request.params.id) {
			return response.status(403).json({ message: 'You are not authorized to update this user.' });
		}

		const { name, age, aadhaarLast4, email, password } = request.body;
		if (aadhaarLast4 !== undefined && !/^\d{4}$/.test(String(aadhaarLast4))) {
			return response.status(400).json({ message: 'Aadhaar last 4 digits must be exactly 4 digits.' });
		}
		if (password !== undefined && String(password).length < 8) {
			return response.status(400).json({ message: 'Password must have a minimum length of 8 characters.' });
		}

		if (name !== undefined) request.user.name = name;
		if (age !== undefined) request.user.age = age;
		if (aadhaarLast4 !== undefined) request.user.aadhaarLast4 = aadhaarLast4;
		if (email !== undefined) request.user.email = email;
		if (password !== undefined) request.user.password = await bcrypt.hash(String(password), 12);

		await request.user.save();
		response.json({ user: safeUser(request.user) });
	} catch (error) {
		next(error);
	}
};

exports.deleteUser = async (request, response, next) => {
	try {
		if (String(request.user._id) !== request.params.id) {
			return response.status(403).json({ message: 'You are not authorized to delete this user.' });
		}
		await request.user.deleteOne();
		response.status(204).end();
	} catch (error) {
		next(error);
	}
};
