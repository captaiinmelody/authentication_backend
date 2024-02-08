import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  isApprentice: { type: Boolean, default: false },
})

export const UserModel = mongoose.model('User', UserSchema)

export const findUsers = () => UserModel.find()
export const findUserByEmail = (email: string) => UserModel.findOne({ email })
export const findUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ 'authentication.token': sessionToken })
export const findUserById = (id: string) => UserModel.findById({ _id: id })
export const findUserByIdAndDelete = (id: string) =>
  UserModel.findByIdAndDelete({ _id: id })
export const findUserByIdAndUpdate = (id: string, updateData: any) =>
  UserModel.findByIdAndUpdate(id, updateData, { new: true })

export const createUser = (values: any) =>
  new UserModel(values).save().then((user) => user.toObject())
