import { model } from "@medusajs/framework/utils"
import Sale from "./sale"
import Promotion from "../../promotion/models/promotion"

const SalePromotion = model.define("sale_promotion", {
  id: model.id().primaryKey(),

  discount_amount: model.bigNumber(),

  // ให้ belongsTo เป็นคนสร้างคอลัมน์ FK (อย่า duplicate sale_id / promotion_id)
  sale: model.belongsTo(() => Sale, { foreignKey: "sale_id" }),
  promotion: model.belongsTo(() => Promotion, { foreignKey: "promotion_id" }),
})

export default SalePromotion