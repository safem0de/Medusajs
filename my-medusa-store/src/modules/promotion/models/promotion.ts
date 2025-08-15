import { model } from "@medusajs/framework/utils"
import SalePromotion from "../../sale/models/sale-promotion"

const Promotion = model.define("promotion", {
  id: model.id().primaryKey(),

  code: model.text().unique(),
  name: model.text(),
  description: model.text().nullable(),

  // ต้องใช้ชื่อ enum ให้ตรงกับระบบ
  discount_type: model.enum(["percentage", "fixed_amount", "buy_x_get_y"]),
  discount_value: model.bigNumber(),

  min_purchase: model.bigNumber().nullable(),
  max_discount: model.bigNumber().nullable(),
  member_type_required: model
    .enum(["bronze", "silver", "gold", "platinum"])
    .nullable(),

  // วันที่ให้ nullable (service คุณส่ง optional)
  start_date: model.dateTime().nullable(),
  end_date: model.dateTime().nullable(),

  is_active: model.boolean().default(true),

  // ความสัมพันธ์ที่ถูกต้องกับ SalePromotion (อย่า self-reference ตัวเอง)
  sale_promotions: model.hasMany(() => SalePromotion, {
    foreignKey: "promotion_id",
  }),
})

export default Promotion
