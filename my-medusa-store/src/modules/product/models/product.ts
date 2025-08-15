// src/modules/product/models/product.ts
import { model } from "@medusajs/framework/utils"
import SaleItem from "../../sale/models/sale-item"

const Product = model.define("product", {
  id: model.id().primaryKey(),
  sku: model.text().unique(),
  barcode: model.text().nullable(),
  name: model.text(),
  description: model.text().nullable(),
  category: model.text(),
  price: model.bigNumber(),
  cost: model.bigNumber(),
  stock_quantity: model.number().default(0),
  min_stock: model.number().default(0),
  is_active: model.boolean().default(true),
  // created_at: model.dateTime().default(new Date()),
  // updated_at: model.dateTime().default(new Date()),
  sale_items: model.hasMany(() => SaleItem, {
    foreignKey: "product_id",
  }),
})

export default Product
