import mongoose from 'mongoose'
import CONFIG from './config'

async function connectDB() {
    try {
        await mongoose.connect(CONFIG.MONGODB_URI)
    } catch (err) {
        throw new Error(err)
    }
}

export default connectDB
