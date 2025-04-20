import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import productRoutes from './routes/ProductRoutes.js'


const app = express()
dotenv.config()


const PORT = process.env.PORT || 3000

app.use(express.json())

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
    connectDB()

})

app.use("/api", productRoutes)