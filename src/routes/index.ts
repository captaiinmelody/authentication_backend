// routes/index.ts

import express from 'express'
import userRoutes from './userRoutes'
import authRoutes from './authRoutes'

const router = express.Router()

// Mount user routes on '/users' path
router.use('/user', userRoutes)

// Mount auth routes on '/auth' path
router.use('/auth', authRoutes)

export default router
