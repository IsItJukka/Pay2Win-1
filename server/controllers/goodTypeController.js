import { GoodTypes } from '../models/models.js'
import ApiError from '../error/ApiError.js'

class GoodTypeController {
    async create(req, res) {
        const {name} = req.body;
        const type = await GoodTypes.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await GoodTypes.findAll();
        return res.json(types)
    }
}

export default new GoodTypeController();
