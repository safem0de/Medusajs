// src/modules/sale/models/sale-item.ts
import { model } from "@medusajs/framework/utils"
import Sale from "./sale"
import Product from "../../product/models/product"

const SaleItem = model.define("sale_item", {
    id: model.id().primaryKey(),
    quantity: model.number(),
    unit_price: model.bigNumber(),
    discount_amount: model.bigNumber().default(0),
    total_price: model.bigNumber(),
    // created_at: model.dateTime().default(new Date()),
    // updated_at: model.dateTime().default(new Date()),
    sale: model.belongsTo(() => Sale, {
        foreignKey: "sale_id",
    }),
    product: model.belongsTo(() => Product, {
        foreignKey: "product_id",
    }),
})

export default SaleItem
