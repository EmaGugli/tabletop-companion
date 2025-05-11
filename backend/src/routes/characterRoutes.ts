import { Router } from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth';
import {
  createCharacter,
  getCharacters,
  getCharacter,
  updateCharacter,
  deleteCharacter,
} from '../controllers/characterController';

const router = Router();

// All routes require authentication
router.use(auth);

// Create character
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('class').notEmpty().withMessage('Class is required'),
    body('level')
      .isInt({ min: 1, max: 20 })
      .withMessage('Level must be between 1 and 20'),
    body('strength')
      .isInt({ min: 1, max: 20 })
      .withMessage('Strength must be between 1 and 20'),
    body('dexterity')
      .isInt({ min: 1, max: 20 })
      .withMessage('Dexterity must be between 1 and 20'),
    body('constitution')
      .isInt({ min: 1, max: 20 })
      .withMessage('Constitution must be between 1 and 20'),
    body('intelligence')
      .isInt({ min: 1, max: 20 })
      .withMessage('Intelligence must be between 1 and 20'),
    body('wisdom')
      .isInt({ min: 1, max: 20 })
      .withMessage('Wisdom must be between 1 and 20'),
    body('charisma')
      .isInt({ min: 1, max: 20 })
      .withMessage('Charisma must be between 1 and 20'),
    body('hitPoints')
      .isInt({ min: 1 })
      .withMessage('Hit points must be at least 1'),
  ],
  createCharacter
);

// Get all characters
router.get('/', getCharacters);

// Get single character
router.get('/:id', getCharacter);

// Update character
router.put(
  '/:id',
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('class').optional().notEmpty().withMessage('Class cannot be empty'),
    body('level')
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage('Level must be between 1 and 20'),
    body('strength')
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage('Strength must be between 1 and 20'),
    body('dexterity')
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage('Dexterity must be between 1 and 20'),
    body('constitution')
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage('Constitution must be between 1 and 20'),
    body('intelligence')
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage('Intelligence must be between 1 and 20'),
    body('wisdom')
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage('Wisdom must be between 1 and 20'),
    body('charisma')
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage('Charisma must be between 1 and 20'),
    body('hitPoints')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Hit points must be at least 1'),
  ],
  updateCharacter
);

// Delete character
router.delete('/:id', deleteCharacter);

export default router; 