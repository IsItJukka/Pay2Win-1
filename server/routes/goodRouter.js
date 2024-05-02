import Router from 'express'
const router = Router()
import goodController from "../controllers/goodController.js";

router.post('/', goodController.create)
router.get('/', goodController.getAll)
router.get('/:id', goodController.getOne)

export default router;