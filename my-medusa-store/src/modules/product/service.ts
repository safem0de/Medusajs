// src/modules/product/service.ts
import { MedusaService } from "@medusajs/framework/utils"
import Product from "./models/product"

export default class ProductModuleService extends MedusaService({
    Product,
}) {
    async updateStock(
        productId: string,
        quantity: number,
        operation: "add" | "subtract" = "subtract"
    ) {
        const product = await this.retrieveProduct(productId)

        const delta = operation === "add" ? quantity : -quantity
        const newQuantity = (product.stock_quantity ?? 0) + delta

        if (newQuantity < 0) {
            throw new Error(
                `สต็อกไม่เพียงพอ สินค้า ${product.name} เหลือ ${product.stock_quantity ?? 0} ชิ้น`
            )
        }

        // ✅ รูปแบบที่ถูกต้อง: ส่ง object เดียว มี id และฟิลด์ที่อนุญาตเท่านั้น
        return await this.updateProducts({
            id: productId,
            stock_quantity: newQuantity,
        })
    }

    async getLowStockProducts() {
        const products = await this.listProducts({ is_active: true })
        return products.filter((p: any) => {
            const stock = Number(p.stock_quantity ?? 0)
            const min = Number(p.min_stock ?? 0)
            return stock <= min
        })
    }
}
