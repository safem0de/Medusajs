import { Metadata } from "next"
import DealerRegisterForm from "@modules/dealer/templates/register-form"

export const metadata: Metadata = {
  title: "Dealer Registration",
  description: "Register to become an official dealer.",
}

type Params = {
  params: Promise<{
    countryCode: string
  }>
}

export default async function DealerRegisterPage(props: Params) {
  const params = await props.params;
  return <DealerRegisterForm countryCode={params.countryCode} />
}
