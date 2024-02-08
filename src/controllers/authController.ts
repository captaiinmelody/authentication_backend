import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { createUser, findUserByEmail } from '../models/userModel'
import { authentication, random } from '../helper/index'

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .sendStatus(400)
        .json({ message: 'Email or Password cannot be empty' })
    }

    const user = await findUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    )

    if (!user) {
      return res.sendStatus(400).json({ error: 'Invalid Email' })
    }

    const expectedHash = authentication(user.authentication.salt, password)

    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(400).json({ error: 'Incorrect Password' })
    }

    const salt = random()

    user.authentication.sessionToken = authentication(salt, user._id.toString())

    await user.save()

    res.cookie(process.env.SECRET, user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    })

    return res.status(200).json({ message: 'Login success', data: user }).end()
  } catch (error) {
    console.log('Error in Login', error)
    return res.sendStatus(400).json({ error: error })
  }
}

// Function to create a new user
export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'User already exists with this email' })
    }
    const salt = random()
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = await createUser({
      username,
      email,
      authentication: { salt, password: authentication(salt, password) },
    })

    return res.status(201).json(user).end()
  } catch (error) {
    console.error('Error creating user:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
