import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { postProduct } from "../controllers/ProductController.js"
import Product from '../models/ProductModel.js'
describe('postProduct controller', () => {
    let req, res

    beforeEach(() => {
        // Reset any mocks between tests
        vi.restoreAllMocks()

        // Prepare a fresh fake req/res for each test
        req = { body: {} }
        const json = vi.fn()
        const status = vi.fn(() => ({ json }))
        res = { status }
    })

    afterEach(() => {
        // Ensure no leftover spies pollute other suites
        vi.restoreAllMocks()
    })

    it('should return 400 if any required field is missing', async () => {
        // Arrange: leave req.body empty → missing name, price, image

        // Act
        await postProduct(req, res)

        // Assert: status 400, correct payload
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.status().json).toHaveBeenCalledWith({
            success: false,
            message: 'Please provide all fields '
        })
    })

    it('should return 201 and the new product on successful save', async () => {
        // Arrange: valid body
        const fakeBody = { name: 'Test', price: 9.99, image: 'url.jpg' }
        req.body = fakeBody

        // Spy on the constructor + save method
        const saveSpy = vi.spyOn(Product.prototype, 'save')
            .mockResolvedValueOnce()   // simulate successful save

        // Act
        await postProduct(req, res)

        // Assert: 
        // 1) A Product instance was created with req.body
        //    (implicitly tested by saveSpy having been called)
        expect(saveSpy).toHaveBeenCalled()

        // 2) Response was 201 and contains the newProduct instance
        expect(res.status).toHaveBeenCalledWith(201)
        const sent = res.status().json.mock.calls[0][0]
        expect(sent.success).toBe(true)
        expect(sent.message).toBe('Product added successfully ')
        expect(sent.data).toBeInstanceOf(Product)
        expect(sent.data).toMatchObject(fakeBody)
    })

    it('should return 500 if save() throws an error', async () => {
        // Arrange: valid body
        const fakeBody = { name: 'X', price: 1.23, image: 'i.png' }
        req.body = fakeBody

        // Force Product.prototype.save() to reject
        vi.spyOn(Product.prototype, 'save')
            .mockRejectedValueOnce(new Error('db failure'))

        // Spy on console.error to suppress log noise
        const errSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

        // Act
        await postProduct(req, res)

        // Assert: 500 + generic server error message
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.status().json).toHaveBeenCalledWith({
            success: false,
            message: 'Server Error '
        })

        // Clean up
        errSpy.mockRestore()
    })
})
