import express from 'express'
import { postProduct, getProducts, deleteProduct, updateProduct } from '../controllers/ProductController.js'

const router = express.Router()



router.get("/products", getProducts)
router.post("/products", postProduct)
router.delete("/product/:id", deleteProduct)
router.put("/product/:id", updateProduct)


export default router;
