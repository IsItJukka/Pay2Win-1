import ApiError from "../error/ApiError.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {User, Wish} from "../models/models.js";

const generateJwt = (id, email, login, role) => {
    return jwt.sign({id, login, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'});
}

class UserController {
    async registration(req, res, next) {
        const { login, email, password, role } = req.body;
        if (!email || !password || !login) {
            return next(ApiError.badRequest(('Некорректные данные')))
        }

        const candidate = await User.findOne({where: { email: email, login: login}});


        if (candidate) {
            return next(ApiError.badRequest(('Пользователь с таким логином или E-Mail уже существует.')))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, email, role, password: hashPassword});
        const wishList = await Wish.create({userId: user.id});
        const token = generateJwt(user.id, user.email, user.login, user.role);
        return res.json({token});
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: { email: email}});
        if (!user) {
            return next(ApiError.internal("Вы указали неверную почту или пароль."));
        }

        let comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal("Вы указали неверную почту или пароль."));
        }
        const token = generateJwt(user.id, user.email, user.login, user.role);
        return res.json({token});
    }

    async check(req, res, next) {
        const token = generateJwt(user.id, user.email, user.login, user.role);
        return res.json({token});
    }
}

export default new UserController();