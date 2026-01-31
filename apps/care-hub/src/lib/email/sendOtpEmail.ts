import emailjs from "@emailjs/browser";

// DEMO ONLY: Client-side email OTP delivery via EmailJS (no backend).
export async function sendOtpEmail(email: string, otp: string) {
  const serviceId = "service_d8w8umg";
  const templateId = "template_umho5dm"
  const publicKey = "_bswKgqFdphC4gh0H"

  if (!serviceId || !templateId || !publicKey) {
    console.error("[EmailJS] Missing env variables", { serviceId, templateId, publicKey });
    throw new Error("Missing EmailJS env variables");
  }

  return emailjs.send(
    serviceId,
    templateId,
    {
      to_email: email,
      otp,
    },
    publicKey
  );
}
