import express, { response } from 'express';
import { createUser, getUserById, deleteUser, updateUser, authenticate } from '../controllers/users.js';
import users from '../data/users.js'
import verifyToken from '../middlewares/auth/auth.js'

const router = express.Router();



router.get('/', (req, res) => {
    res.send(users);

});

router.post('/authenticate', authenticate)

router.post('/', verifyToken, createUser);

router.get('/:id', verifyToken, getUserById);

router.delete('/:id', verifyToken, deleteUser);

router.patch('/:id', verifyToken, updateUser);

export default router;