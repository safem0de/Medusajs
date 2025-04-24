// import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

// export async function POST(req: MedusaRequest, res: MedusaResponse) {
//     const body = req.body as {
//         name?: string
//         email?: string
//         company?: string
//     }

//     try {
//         const { name, email, company } = body

//         if (!name || !email || !company) {
//             return res.status(400).json({
//                 error: "Missing required fields",
//             })
//         }

//         console.log("📩 Dealer Registration Request:", { name, email, company })

//         await fetch("http://10.1.160.53:30678/webhook-test/dealer-register", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLIC_KEY!,
//             },
//             body: JSON.stringify({ name, email, company }),
//         })

//         return res.status(200).json({
//             message: "Dealer registration received",
//         })
//     } catch (err) {
//         console.error("Dealer register error:", err)
//         return res.status(500).json({
//             error: "Internal server error",
//         })
//     }
// }

import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

// 👉 ใส่ * เพื่อ Allow ทุก origin
const allowedOrigin = "*"

export async function OPTIONS(req: MedusaRequest, res: MedusaResponse) {
    res
        .setHeader("Access-Control-Allow-Origin", allowedOrigin)
        .setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
        .setHeader("Access-Control-Allow-Headers", "Content-Type, x-publishable-api-key")
        .status(204)
        .end()
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
    const body = req.body as {
        name?: string
        email?: string
        company?: string
    }

    try {
        const { name, email, company } = body

        if (!name || !email || !company) {
            return res
                .setHeader("Access-Control-Allow-Origin", allowedOrigin)
                .status(400)
                .json({ error: "Missing required fields" })
        }

        console.log("📩 Dealer Registration:", { name, email, company })

        await fetch("http://10.1.160.53:30678/webhook-test/dealer-register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, company }),
        })

        return res
            .setHeader("Access-Control-Allow-Origin", allowedOrigin)
            .status(200)
            .json({ message: "Dealer registration received" })
    } catch (err) {
        console.error("Dealer register error:", err)
        return res
            .setHeader("Access-Control-Allow-Origin", allowedOrigin)
            .status(500)
            .json({ error: "Internal server error" })
    }
}
