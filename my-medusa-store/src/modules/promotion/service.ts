import { MedusaService } from "@medusajs/framework/utils"
import Promotion from "./models/promotion"
import SalePromotion from "../sale/models/sale-promotion"

type CanonicalDiscountType = "percentage" | "fixed_amount" | "buy_x_get_y"
type DiscountTypeInput = CanonicalDiscountType | "percent" | "fixed"

type CreatePromotionDTO = {
  code: string
  name: string
  description?: string | null
  discount_type: DiscountTypeInput
  discount_value: number | string
  min_purchase?: number | string | null
  max_discount?: number | string | null
  member_type_required?: "bronze" | "silver" | "gold" | "platinum" | null
  start_date?: Date | null
  end_date?: Date | null
  is_active?: boolean
}

export default class PromotionModuleService extends MedusaService({
  Promotion,
  SalePromotion,
}) {
  async createPromotion(data: CreatePromotionDTO) {
    // แปลง alias ให้ตรง enum ของโมเดล
    let discount_type: CanonicalDiscountType
    switch (data.discount_type) {
      case "percent":
        discount_type = "percentage"
        break
      case "fixed":
        discount_type = "fixed_amount"
        break
      default:
        discount_type = data.discount_type as CanonicalDiscountType
        break
    }

    return this.createPromotions({
      code: data.code,
      name: data.name,
      description: data.description ?? null,
      discount_type,
      discount_value: Number(data.discount_value),
      min_purchase: data.min_purchase == null ? null : Number(data.min_purchase),
      max_discount: data.max_discount == null ? null : Number(data.max_discount),
      member_type_required: data.member_type_required ?? null,
      start_date: data.start_date ?? null,
      end_date: data.end_date ?? null,
      is_active: data.is_active ?? true,
    })
  }

  async listActivePromotions(date: Date = new Date()) {
    const promos = await this.listPromotions({ is_active: true })
    return promos.filter((p: any) => {
      const startOk = !p.start_date || new Date(p.start_date) <= date
      const endOk = !p.end_date || new Date(p.end_date) >= date
      return startOk && endOk
    })
  }

  async applyPromotionToSale(
    sale_id: string,
    promotion_id: string,
    discount_amount: number | string
  ) {
    return this.createSalePromotions({
      sale_id,
      promotion_id,
      discount_amount: Number(discount_amount),
    })
  }
}
