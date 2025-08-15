// src/modules/product/index.ts
import { Module } from "@medusajs/framework/utils"
import ProductModuleService from "./service"

export const PRODUCT_MODULE = "product"

export default Module(PRODUCT_MODULE, {
    service: ProductModuleService,
})
