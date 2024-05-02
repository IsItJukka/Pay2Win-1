import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import path from 'path'
import {Good, GoodInfo} from '../models/models.js'
import ApiError from '../error/ApiError.js';

class GoodController {
    async create(req, res, next) {
        try {
            let { name, price, goodTypeId, userId, info } = req.body;
            const { img } = req.files;

            const __filename = fileURLToPath(import.meta.url);
            const dirname = path.dirname(__filename);

            let fileName = uuidv4() + '.jpg';

            img.mv(path.resolve(dirname, '..', 'static', fileName));

            const good = await Good.create({ name, price, goodTypeId, userId, info, img: fileName });

            if (info) {
                info = JSON.parse(info)
                info.forEach((item) => {
                    GoodInfo.create({
                        title: item.title,
                        description: item.description,
                        goodId: good.id
                    })
                })
            }

            return res.json(good);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let {goodTypeId, limit, page} = req.query
        page = page || 1;
        limit = limit || 30;

        let offset = page * limit - limit;

        let goods;

        if (!goodTypeId) {
            goods = await Good.findAndCountAll({limit, offset});
        }

        if (goodTypeId) {
            goods = await Good.findAndCountAll({where: {goodTypeId}, limit, offset});
        }

        return res.json(goods)
    }

    async getOne(req, res) {
        const {id} = req.params;
        const good = await Good.findOne(
            {
                where: {id},
                include: [{model: GoodInfo, as: 'info'}]
            },
        )
        return res.json(good)
    }
}

export default new GoodController();
