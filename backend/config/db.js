import mongoose from 'mongoose'




export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(`Database is connected successfully...`)
    } catch (error) {
        console.log(error.message)
    }
}