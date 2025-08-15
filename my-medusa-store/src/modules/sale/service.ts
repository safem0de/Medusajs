// src/modules/sale/service.ts
import { MedusaService } from "@medusajs/framework/utils"
import Sale from "./models/sale"
import SaleItem from "./models/sale-item"
import SalePromotion from "./models/sale-promotion"

type CreateSaleDTO = Record<string, any>

type CreateSaleItemDTO = {
    product_id: string
    quantity: number
    unit_price: number
    discount_amount?: number
    sale_id?: string
    total_price?: number
} & Record<string, any>

type CreateSalePromotionDTO = {
    promotion_id: string
    discount_amount: number
    sale_id?: string
} & Record<string, any>

export default class SaleModuleService extends MedusaService({
    Sale,
    SaleItem,
    SalePromotion,
}) {
    /**
     * สร้าง Sale + Items (+ Promotions)
     * (เวอร์ชันนี้ตัด transaction ออกเพื่อให้ตรงกับ API ที่มีจริงในโปรเจกต์)
     */
    async createSaleWithItems(
        saleData: CreateSaleDTO,
        items: CreateSaleItemDTO[],
        promotions: CreateSalePromotionDTO[] = []
    ) {
        // 1) สร้าง Sale
        const sale = await this.createSales(saleData)

        // 2) คำนวณและสร้าง Items
        const saleItems = await Promise.all(
            items.map((item) =>
                this.createSaleItems({
                    ...item,
                    sale_id: sale.id,
                    total_price:
                        item.quantity * item.unit_price - (item.discount_amount || 0),
                })
            )
        )

        // 3) (ถ้ามี) สร้าง Promotions
        if (promotions.length > 0) {
            await Promise.all(
                promotions.map((promo) =>
                    this.createSalePromotions({
                        ...promo,
                        sale_id: sale.id,
                    })
                )
            )
        }

        return { sale, items: saleItems }
    }

    /**
     * TXN-YYYYMMDD-###
     * ใช้ listAndCountSales (ไม่มี countSales ในโปรเจกต์คุณ)
     */
    async generateTransactionNumber(): Promise<string> {
        const now = new Date()
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        const [, todayCount] = await this.listAndCountSales({
            created_at: { $gte: startOfToday },
        })

        const seq = String(todayCount + 1).padStart(3, "0")
        const yyyy = String(now.getFullYear())
        const mm = String(now.getMonth() + 1).padStart(2, "0")
        const dd = String(now.getDate()).padStart(2, "0")

        return `TXN-${yyyy}${mm}${dd}-${seq}`
    }
}
