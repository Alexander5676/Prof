export type Lead = { name: string; phone: string; audience: string; message: string };

export async function sendTelegramLead(lead: Lead) {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.info('Telegram env vars are not configured. Lead:', lead);
    return { ok: true, demo: true };
  }
  const text = `Новая заявка Prof%0AИмя: ${encodeURIComponent(lead.name)}%0AТелефон: ${encodeURIComponent(lead.phone)}%0AАудитория: ${encodeURIComponent(lead.audience)}%0AСообщение: ${encodeURIComponent(lead.message || '-')}`;
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`);
  if (!res.ok) throw new Error('Не удалось отправить заявку');
  return res.json();
}
