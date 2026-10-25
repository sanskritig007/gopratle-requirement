import { Router } from 'express';
import {
  createRequirement,
  getRequirements,
  getRequirementById,
  getRequirementStats,
  deleteRequirement,
} from '../controllers/requirementController.js';

const router = Router();

router.post('/', createRequirement);
router.get('/', getRequirements);
router.get('/stats/summary', getRequirementStats);
router.get('/:id', getRequirementById);
router.delete('/:id', deleteRequirement);

export default router;
