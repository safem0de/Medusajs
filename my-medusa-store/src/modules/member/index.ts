// src/modules/member/index.ts
import { Module } from "@medusajs/framework/utils"
import MemberModuleService from "./service"

export const MEMBER_MODULE = "member"

export default Module(MEMBER_MODULE, {
    service: MemberModuleService,
})
