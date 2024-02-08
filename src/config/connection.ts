// db.js
import mongoose from 'mongoose'

const connectDB = () => {
  var uri = process.env.MONGODB_URI || ''

  mongoose.Promise = Promise

  mongoose
    .connect(uri)
    .then(() => {
      console.log('DB Connected')
    })
    .catch((e) => console.log(e))
}

export default connectDB
