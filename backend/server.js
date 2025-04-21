import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import productRoutes from './routes/ProductRoutes.js'
import path from 'path'
const app = express()
dotenv.config()


const PORT = process.env.PORT || 3000

const __dirname = path.resolve();

app.use(express.json())
console.log(__dirname)
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
    connectDB()

})

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get((req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.use("/api", productRoutes)