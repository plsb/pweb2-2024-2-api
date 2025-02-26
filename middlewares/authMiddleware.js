import jwt from 'jsonwebtoken';

export const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        res.status(404).json({ message: 'Token Não fornecido'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            res.status(404).json({ message: 'Token inválido ou expirado'});
        }
        req.user = user;
        next();
    });
}

export const authorizedRole = (role) => {
    return (req, res, next) => {
        if(req.user.role !== role){
            res.status(404).json({ message: 'Acesso negado'});
        }
        next();
    }
}