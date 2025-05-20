import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const register = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'El correo electronico ya esta registrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).send({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send({ message: 'Error al registrar el usuario.' });
    }
};

const login = async (req, res) => {
    try {
        const user = req.user;
        const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send({ message: 'Error al iniciar sesión.' });
    }
};

const getCurrentUser = (req, res) => {
    res.send(req.user);
};

export { register, login, getCurrentUser };