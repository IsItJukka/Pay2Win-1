import Router from 'express';
const router = Router();
import goodTypeController from "../controllers/goodTypeController.js";
import checkRole from "../middleware/checkRoleMiddleware.js";

router.post('/', checkRole("ADMIN"), goodTypeController.create)
router.get('/', goodTypeController.getAll)

export default router;