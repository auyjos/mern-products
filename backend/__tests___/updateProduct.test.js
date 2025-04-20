// tests/updateProduct.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import mongoose from 'mongoose'
import Product from "../models/ProductModel";
import { updateProduct } from "../controllers/ProductController";

describe('updateProduct controller', () => {
    let req, res

    beforeEach(() => {
        // Reset all Jest/Vitest mocks before each test
        vi.restoreAllMocks()

        // Fake req.params and req.body
        req = { params: {}, body: {} }

        // Spyable res.status().json()
        const json = vi.fn()
        const status = vi.fn(() => ({ json }))
        res = { status }
    })

    afterEach(() => {
        // Clean up any leftover spies
        vi.restoreAllMocks()
    })

    it('returns 400 if the id is not a valid ObjectId', async () => {
        // Arrange
        req.params.id = 'invalid-id'
        vi.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(false)

        // Act
        await updateProduct(req, res)

        // Assert
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.status().json).toHaveBeenCalledWith({
            message: 'Invalid product ID'
        })
    })

    it('returns 404 if no product is found to update', async () => {
        // Arrange
        const id = new mongoose.Types.ObjectId().toString()
        req.params.id = id
        req.body = { name: 'X' }
        vi.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true)
        vi.spyOn(Product, 'findById').mockResolvedValue(null)

        // Act
        await updateProduct(req, res)

        // Assert
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.status().json).toHaveBeenCalledWith({
            message: 'Product not found'
        })
    })

    it('returns 200 and the updated product on success', async () => {
        // Arrange
        const id = new mongoose.Types.ObjectId().toString()
        const updates = { name: 'Updated', price: 42 }
        req.params.id = id
        req.body = updates
        vi.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true)

        const existing = { _id: id, name: 'Old', price: 10 }
        vi.spyOn(Product, 'findById').mockResolvedValue(existing)

        const updated = { _id: id, ...updates }
        const updateSpy = vi
            .spyOn(Product, 'findByIdAndUpdate')
            .mockResolvedValue(updated)

        // Act
        await updateProduct(req, res)

        // Assert: we called findByIdAndUpdate correctly
        expect(updateSpy).toHaveBeenCalledWith(id, updates, { new: true })

        // Assert: response is correct
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.status().json).toHaveBeenCalledWith({
            success: true,
            message: 'Product updated successfully',
            data: updated
        })
    })

    it('returns 500 on unexpected errors', async () => {
        // Arrange
        const id = new mongoose.Types.ObjectId().toString()
        req.params.id = id
        req.body = { name: 'X' }
        vi.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true)

        // Force an error in findById
        vi.spyOn(Product, 'findById').mockRejectedValue(new Error('DB down'))

        // Silence console.error
        const errSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

        // Act
        await updateProduct(req, res)

        // Assert
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.status().json).toHaveBeenCalledWith({
            message: 'Server error'
        })

        errSpy.mockRestore()
    })
})