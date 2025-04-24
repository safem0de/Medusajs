"use client"

import RegisterFormUI from "../components/register-form-ui"
import { useState } from "react"

const DealerRegisterForm = ({ countryCode }: { countryCode: string }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
    })

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("submitting")
        console.log("Form submitted:", formData) // log data form

        try {
            const res = await fetch("http://10.2.4.59:9000/dealer/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!res.ok) throw new Error("Failed")

            setStatus("success")
        } catch (err) {
            setStatus("error")
        }
    }

    return (
        <RegisterFormUI
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            status={status}
        />
    )
}

export default DealerRegisterForm
