// src/modules/sale/models/sale.ts

import { model } from "@medusajs/framework/utils";
import SaleItem from "./sale-item";
import Member from "../../member/models/member";
import SalePromotion from "./sale-promotion";

const Sale = model.define("sale", {
    id: model.id().primaryKey(),
    transaction_number: model.text().unique(),
    cashier_id: model.text(),
    subtotal: model.bigNumber(),
    discount_amount: model.bigNumber().default(0),
    tax_amount: model.bigNumber().default(0),
    total: model.bigNumber(),
    payment_method: model.enum(["cash", "credit_card", "mobile_payment", "bank_transfer"]),
    status: model.enum(["pending", "completed", "cancelled", "refunded"]).default("pending"),
    notes: model.text().nullable(),
    // created_at: model.dateTime().default(new Date()),
    // updated_at: model.dateTime().default(new Date()),
    member: model.belongsTo(() => Member, {
        foreignKey: "member_id",
    }),
    items: model.hasMany(() => SaleItem, {
        foreignKey: "sale_id",
    }),
    promotions: model.hasMany(() => SalePromotion, {
        foreignKey: "sale_id",
    }),
});

export default Sale;
