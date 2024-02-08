// routes/userRoutes.ts

import express from 'express'
import {
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} from '../controllers/userController'

const router = express.Router()

// Get all users
router.get('/', getUsers)

// Get user by ID
router.get('/id/:userId', getUserById)

// Delete user by ID
router.delete('/:userId', deleteUserById)

// Update user by ID
router.put('/:userId', updateUserById)

export default router
