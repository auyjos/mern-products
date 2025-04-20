import mongoose from "mongoose"





export const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`Mongo DB Connected ${(conn.connection.host)}`)
    } catch (error) {
        console.log(`Error ${error.message}`)
        process.exit(1) // process 1 means exit with failure, 0 is success
    }


}