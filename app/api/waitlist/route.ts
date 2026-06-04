import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return Response.json({ error: "Email invalide" }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "simon@baillr.org",
    subject: "Nouvelle inscription — Baillr liste d'attente",
    html: `<p>Nouvelle inscription sur la liste d'attente Baillr :</p><p><strong>${email}</strong></p>`,
  });

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ success: true, id: data?.id });
}
