import Product from "../models/ProductModel";
import { getProducts } from "../controllers/ProductController";
import { describe } from "node:test";
import { expect, vi } from "vitest";


describe("getProducts handler", () => {
    it('returns 200 and product list on success', async () => {
        const fakeProducts = [{ name: 'A' }, { name: 'B' }]
        vi.spyOn(Product, 'find').mockResolvedValue(fakeProducts)


        const req = {}

        const json = vi.fn()

        const status = vi.fn(() => ({ json }))

        const res = { status }

        await getProducts(req, res)

        expect(status).toHaveBeenCalledWith(200)

        expect(json).toHaveBeenCalledWith({
            success: true,
            message: 'All products obtained',
            data: fakeProducts
        })

        Product.find.mockRestore()


    })

    it('returns 400 on error', async () => {
        // Simulate DB error
        vi.spyOn(Product, 'find').mockRejectedValue(new Error('DB is down'))

        const req = {}
        const json = vi.fn()
        const status = vi.fn(() => ({ json }))
        const res = { status }

        await getProducts(req, res)

        expect(status).toHaveBeenCalledWith(400)
        expect(json).toHaveBeenCalledWith({
            success: false,
            message: 'DB is down',
        })

        Product.find.mockRestore()
    })


})


