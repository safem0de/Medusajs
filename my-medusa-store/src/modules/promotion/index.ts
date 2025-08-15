import { Module } from "@medusajs/framework/utils"
import PromotionModuleService from "./service"

export const PROMOTION_MODULE = "promotion"

export default Module(PROMOTION_MODULE, {
  service: PromotionModuleService,
})
