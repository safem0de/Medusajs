type Props = {
    formData: {
      name: string
      email: string
      company: string
    }
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: React.FormEvent) => void
    status: "idle" | "submitting" | "success" | "error"
  }
  
  const RegisterFormUI = ({ formData, onChange, onSubmit, status }: Props) => {
    return (
      <form
        className="max-w-lg mx-auto space-y-4 pb-24"
        onSubmit={onSubmit}
        data-testid="dealer-register-form"
      >
        <h2 className="text-2xl font-bold mb-4">Dealer Registration</h2>
  
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={onChange}
          className="w-full border p-2 rounded"
          required
        />
  
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={onChange}
          className="w-full border p-2 rounded"
          required
        />
  
        <input
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={onChange}
          className="w-full border p-2 rounded"
          required
        />
  
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded disabled:opacity-50"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting..." : "Register"}
        </button>
  
        {status === "success" && <p className="text-green-600">Registered successfully!</p>}
        {status === "error" && <p className="text-red-600">Something went wrong.</p>}
      </form>
    )
  }
  
  export default RegisterFormUI
  