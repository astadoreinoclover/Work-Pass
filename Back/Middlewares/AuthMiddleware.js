const jwt = require('jsonwebtoken');
const SECRET_KEY = 'token'; // A mesma chave usada para gerar o token

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Pega o token do header da requisição

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY); // Verifica se o token é válido
        req.user = verified; // Adiciona os dados do usuário ao request
        next(); // Chama o próximo middleware ou rota
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

module.exports = authenticateToken;
