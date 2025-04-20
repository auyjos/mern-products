import Product from '../models/ProductModel.js'
import mongoose from 'mongoose'



export const postProduct = async (req, res) => {

    const product = req.body

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please provide all fields "

        })
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save()
        return res.status(201).json({
            success: true,
            message: "Product added successfully ",
            data: newProduct
        })
    } catch (error) {

        console.error("Error creating product", error.message)
        res.status(500).json({
            success: false,
            message: "Server Error "
        })

    }

}



export const getProducts = async (req, res) => {

    try {
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            message: "All products obtained",
            data: products
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })


    }

}



export const deleteProduct = async (req, res) => {
    const { id } = req.params


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" })
    }

    try {

        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        await Product.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "Product delete successfully"
        })
    } catch (error) {
        console.error("DELETE /api/products/:id error:", error)
        return res.status(500).json({ message: "Server error" })
    }

}


export const updateProduct = async (req, res) => {

    const { id } = req.params
    const product = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" })
    }



    try {
        const checkProduct = await Product.findById(id)
        if (!checkProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        })

    } catch (error) {
        console.error("Update  /api/product/:id error:", error)
        return res.status(500).json({ message: "Server error" })
    }

}