import db from '../models/index.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export const signUp = async(req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await db.User.findOne({ where: { email } });
        if(existingUser){
            res.status(400).json({ message: 'Usuário já existe.'})
        }
        const newUser = await db.User.create({ name, email, password });

        const user = newUser.get({ plain: true });
        delete user.password;

        res.status(201).json( { message: 'Usuário criado', newUser } )
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao criar usuário'});
    }
};

export const login = async(req, res) => {
    const { email, password } = req.body;

    try{
        const existingUser = await db.User.findOne({ where: { email } });
        if(!existingUser){
            res.status(404).json({ message: 'Usuário não encontrado.'});
        }
        const isPasswordValid = await bcrypt.compare(password, 
                                                    existingUser.password);
        if(!isPasswordValid){
            res.status(404).json({ message: 'Senha inválida.'});
        }

        const token = jwt.sign({id: existingUser.id, role: existingUser.role},
            process.env.JWT_SECRET, { expiresIn: '1h'}
        );

        res.status(200).json({ message: 'Login bem-sucedido', token});
    } catch (error){
        res.status(500).json({ message: 'Erro ao fazer login'});
    }
}