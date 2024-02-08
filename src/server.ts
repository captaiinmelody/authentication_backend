import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import http from 'http'
import connectDB from './config/connection'
import routes from './routes'

dotenv.config()

const port = process.env.PORT || 3001

connectDB()

const app = express()

app.use(cors({ credentials: true }))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/api', routes)

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
