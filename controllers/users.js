import { v4 as uuidv4 } from 'uuid';
import Jwt from 'jsonwebtoken';
import users from '../data/users.js';

/* const jwt = require("jsonwebtoken"); */

export const authenticate = (req, res) => {
    const { username, password } = req.body;
    console.log(users);
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = Jwt.sign({}, process.env.TOKEN_SECRET, { expiresIn: '7d' });

    res.send({
        user: user,
        token: token
    });

}

export const createUser = (req, res) => {
    const user = req.body;
    const userId = uuidv4();
    const userWithId = { ...user, id: userId }

    users.push(userWithId);
    console.log(users);
    res.send('USER CREATED');
}

export const getUserById = (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);

    res.send(foundUser)
};

export const deleteUser = (req, res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id !== id);

    res.send(`User with the id ${id} deleted.`);
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    const user = users.find((user) => user.id === id);

    if (firstName) {
        user.firstName = firstName;
    }
    if (lastName) {
        user.lastName = lastName;
    }
    if (age) {
        user.age = age;
    }

    res.send(`User with the id ${id} updated.`);
};