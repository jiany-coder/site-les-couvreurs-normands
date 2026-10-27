// Formulaire de devis : envoie un e-mail via Resend (Cloudflare Pages Function).
// Variables à définir dans Cloudflare Pages : RESEND_API_KEY (secret), OWNER_EMAIL, SENDER_EMAIL.
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const json = (o, status = 200) =>
  new Response(JSON.stringify(o), { status, headers: { "content-type": "application/json" } });

export async function onRequestPost({ request, env }) {
  let b;
  try { b = await request.json(); } catch { return json({ detail: [{ msg: "Requête invalide." }] }, 400); }
  const name = String(b.name || "").trim(), email = String(b.email || "").trim(), phone = String(b.phone || "").trim();
  const message = String(b.message || "").trim();
  if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || phone.length < 6 || message.length < 5)
    return json({ detail: [{ msg: "Merci de renseigner nom, e-mail, téléphone et message." }] }, 422);
  if (!env.RESEND_API_KEY || !env.OWNER_EMAIL) return json({ detail: [{ msg: "Envoi indisponible : appelez-nous au [TÉLÉPHONE]." }] }, 503);
  const city = String(b.city || "").slice(0, 80), service = String(b.service || "").slice(0, 120);
  const html = `<h2>Nouvelle demande de devis</h2><p><b>Nom :</b> ${esc(name)}<br><b>E-mail :</b> ${esc(email)}<br><b>Téléphone :</b> ${esc(phone)}<br><b>Ville :</b> ${esc(city) || "-"}<br><b>Service :</b> ${esc(service) || "-"}</p><p style="white-space:pre-wrap">${esc(message.slice(0, 4000))}</p>`;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: env.SENDER_EMAIL || "onboarding@resend.dev",
      to: [env.OWNER_EMAIL],
      reply_to: email,
      subject: `[Devis] ${name} - ${service || "Demande"} (${city || "Calvados"})`,
      html,
    }),
  });
  if (!r.ok) return json({ detail: [{ msg: "Envoi impossible pour le moment : appelez-nous au [TÉLÉPHONE]." }] }, 502);
  return json({ status: "ok" });
}
