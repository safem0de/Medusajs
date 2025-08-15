// src/modules/member/models/member.ts
import { model } from "@medusajs/framework/utils"
import Sale from "../../sale/models/sale"

const Member = model.define("member", {
    id: model.id().primaryKey(),
    member_code: model.text().unique(),
    name: model.text(),
    email: model.text().nullable(),
    phone: model.text().nullable(),
    birth_date: model.dateTime().nullable(),
    member_type: model.enum(["bronze", "silver", "gold", "platinum"]).default("bronze"),
    points: model.number().default(0),
    total_spent: model.bigNumber().default(0),
    is_active: model.boolean().default(true),
    // created_at: model.dateTime().default(new Date()),
    // updated_at: model.dateTime().default(new Date()),
    sales: model.hasMany(() => Sale, {
        foreignKey: "member_id",
    }),
})

export default Member