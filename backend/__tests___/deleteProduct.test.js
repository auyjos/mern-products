// tests/deleteProduct.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import mongoose from 'mongoose'
import Product from "../models/ProductModel";
import { deleteProduct } from "../controllers/ProductController";

describe('deleteProduct controller', () => {
    let req, res

    beforeEach(() => {
        // Reset all mocks before each test
        vi.restoreAllMocks()

        // Fake req.params
        req = { params: {} }

        // Spyable res.status().json()
        const json = vi.fn()
        const status = vi.fn(() => ({ json }))
        res = { status }
    })

    afterEach(() => {
        // Clean up any leftover mocks
        vi.restoreAllMocks()
    })

    it('returns 400 for an invalid ObjectId', async () => {
        // Arrange: invalid ID in params
        req.params.id = 'not-a-valid-id'
        // Spy on mongoose validation
        vi.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(false)

        // Act
        await deleteProduct(req, res)

        // Assert: status 400 with correct message
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.status().json).toHaveBeenCalledWith({
            message: 'Invalid product ID'
        })
    })

    it('returns 404 when product is not found', async () => {
        // Arrange: valid-looking ID
        const fakeId = new mongoose.Types.ObjectId().toString()
        req.params.id = fakeId
        vi.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true)

        // Mock Product.findById → null
        vi.spyOn(Product, 'findById').mockResolvedValue(null)

        // Act
        await deleteProduct(req, res)

        // Assert: status 404 with correct message
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.status().json).toHaveBeenCalledWith({
            message: 'Product not found'
        })
    })

    it('deletes and returns 200 when product exists', async () => {
        // Arrange: existing product case
        const fakeId = new mongoose.Types.ObjectId().toString()
        req.params.id = fakeId
        vi.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true)

        const fakeProduct = { _id: fakeId, name: 'X' }
        vi.spyOn(Product, 'findById').mockResolvedValue(fakeProduct)

        // Spy on findByIdAndDelete
        const deleteSpy = vi.spyOn(Product, 'findByIdAndDelete').mockResolvedValue(fakeProduct)

        // Act
        await deleteProduct(req, res)

        // Assert:
        // 1) We called delete with the right ID
        expect(deleteSpy).toHaveBeenCalledWith(fakeId)

        // 2) We returned status 200 with success payload
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.status().json).toHaveBeenCalledWith({
            success: true,
            message: 'Product delete successfully'
        })
    })

    it('returns 500 on unexpected errors', async () => {
        // Arrange: valid ID but findById throws
        const fakeId = new mongoose.Types.ObjectId().toString()
        req.params.id = fakeId
        vi.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true)

        // Force an error deep in the try block
        vi.spyOn(Product, 'findById').mockRejectedValue(new Error('db meltdown'))

        // Silence console.error
        const errSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

        // Act
        await deleteProduct(req, res)

        // Assert: 500 with generic message
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.status().json).toHaveBeenCalledWith({
            message: 'Server error'
        })

        // Restore console.error
        errSpy.mockRestore()
    })
})
