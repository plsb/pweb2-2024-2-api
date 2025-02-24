import db from '../models/index.js';

export const signUp = async(req, res) => {
    const { name, email, password} = req.body;

    try {
        const existingUser = await db.User.findOne({ where: { email } });
        if(existingUser){
            res.status(400).json({ message: 'Usuário já existe.'})
        }
        const newUser = await db.User.create({ name, email, password });

        const user = newUser.get({ plain: true });
        delete user.password;

        res.status(201).json( { message: 'Usuário criado', user } )
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário'});
    }
};