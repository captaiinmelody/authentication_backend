// controllers/userController.ts

import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import {
  findUserByEmail,
  findUserById,
  findUserByIdAndDelete,
  findUserByIdAndUpdate,
  findUsers,
} from '../models/userModel'

// Function to get all users
export async function getUsers(req: Request, res: Response) {
  try {
    const users = await findUsers()
    return res.status(200).json(users).end()
  } catch (error) {
    console.error('Error getting users:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Function to get user by ID
export async function getUserById(req: Request, res: Response) {
  try {
    const { userId } = req.params
    const user = await findUserById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('Error getting user by ID:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Function to delete user by ID
export async function deleteUserById(req: Request, res: Response) {
  try {
    const { userId } = req.params
    const deletedUser = await findUserByIdAndDelete(userId)
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' })
    }
    return res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Function to update user by ID
export async function updateUserById(req: Request, res: Response) {
  try {
    const { userId } = req.params
    const updates = req.body
    const updatedUser = await findUserByIdAndUpdate(userId, updates)
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }
    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
