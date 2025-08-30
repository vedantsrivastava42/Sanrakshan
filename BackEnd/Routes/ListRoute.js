import express from 'express';
import { check } from 'express-validator';
import { signup, login } from '../Controllers/Controller.js';
import fileUpload from '../Config/file-upload.js';

const router = express.Router(); 

router.post('/signup', fileUpload.single('image'), [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').isLength({min: 6})], signup);

router.post('/login', login);

export default router;      