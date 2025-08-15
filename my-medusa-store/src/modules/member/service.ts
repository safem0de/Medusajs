// src/modules/member/service.ts
import { MedusaService } from "@medusajs/framework/utils"
import Member from "./models/member"

type MemberType = "bronze" | "silver" | "gold" | "platinum"

type CreateMemberDTO = {
    member_code?: string
    name: string
    email?: string | null
    phone?: string | null
    birth_date?: Date | null
    member_type?: MemberType
    points?: number
    total_spent?: number // 👈 ต้องเป็น number
    is_active?: boolean
}

export default class MemberModuleService extends MedusaService({
    Member,
}) {
    /**
     * สร้างสมาชิกใหม่ (ถ้าไม่มี member_code จะ generate ให้)
     */
    async createMember(data: CreateMemberDTO) {
        const payload = {
            ...data,
            member_code: data.member_code ?? (await this.generateMemberCode()),
            points: Number(data.points ?? 0),
            total_spent: Number(data.total_spent ?? 0), // 👈 บังคับเป็น number
            is_active: data.is_active ?? true,
        }

        return await this.createMembers(payload)
    }

    /**
     * ดึงสมาชิกด้วย id
     */
    async getMember(memberId: string) {
        return await this.retrieveMember(memberId)
    }

    /**
     * ดึงสมาชิกด้วย member_code (คืนค่าอันแรกที่พบ)
     */
    async getMemberByCode(code: string) {
        const members = await this.listMembers({ member_code: code })
        return members[0] ?? null
    }

    /**
     * เพิ่มคะแนนให้สมาชิก
     */
    async addPoints(memberId: string, points: number) {
        if (points <= 0) throw new Error("จำนวนคะแนนต้องมากกว่า 0")

        const member = await this.retrieveMember(memberId)
        const current = Number(member.points ?? 0)

        return await this.updateMembers({
            id: memberId,
            points: current + Number(points),
        })
    }

    /**
     * แลกคะแนน (หักคะแนน) จากสมาชิก
     */
    async redeemPoints(memberId: string, points: number) {
        if (points <= 0) throw new Error("จำนวนคะแนนต้องมากกว่า 0")

        const member = await this.retrieveMember(memberId)
        const current = Number(member.points ?? 0)
        const redeem = Number(points)

        if (current < redeem) {
            throw new Error(`คะแนนไม่เพียงพอ ต้องการ ${redeem} แต่มี ${current} คะแนน`)
        }

        return await this.updateMembers({
            id: memberId,
            points: current - redeem,
        })
    }

    /**
     * อัปเดตยอดใช้จ่ายสะสม (total_spent)
     */
    async addTotalSpent(memberId: string, amount: number) {
        if (amount <= 0) throw new Error("ยอดใช้จ่ายต้องมากกว่า 0")

        const member = await this.retrieveMember(memberId)
        const current = Number(member.total_spent ?? 0)

        return await this.updateMembers({
            id: memberId,
            total_spent: current + Number(amount), // 👈 คงเป็น number เสมอ
        })
    }

    /**
     * ปรับสถานะใช้งานของสมาชิก
     */
    async setActive(memberId: string, isActive: boolean) {
        await this.retrieveMember(memberId) // ensure exists
        return await this.updateMembers({
            id: memberId,
            is_active: !!isActive,
        })
    }

    /**
     * สร้างรหัสสมาชิกแบบรันนิ่ง: MBR-YYYYMMDD-###
     */
    async generateMemberCode(): Promise<string> {
        const now = new Date()
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        const [, todayCount] = await this.listAndCountMembers({
            created_at: { $gte: startOfToday },
        })

        const seq = String((todayCount ?? 0) + 1).padStart(3, "0")
        const yyyy = String(now.getFullYear())
        const mm = String(now.getMonth() + 1).padStart(2, "0")
        const dd = String(now.getDate()).padStart(2, "0")

        return `MBR-${yyyy}${mm}${dd}-${seq}`
    }
}
