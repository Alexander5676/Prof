const REQUIRED_FIELDS = ['name', 'phone', 'audience'];

function isValidLead(body) {
  return body && REQUIRED_FIELDS.every((field) => typeof body[field] === 'string' && body[field].trim());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function formatLeadMessage(lead) {
  return [
    '<b>Новая заявка Prof</b>',
    `Имя: ${escapeHtml(lead.name)}`,
    `Телефон: ${escapeHtml(lead.phone)}`,
    `Аудитория: ${escapeHtml(lead.audience)}`,
    `Сообщение: ${escapeHtml(lead.message || '-')}`,
  ].join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  if (!isValidLead(req.body)) {
    return res.status(400).json({ ok: false, error: 'Invalid lead payload' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.info('Telegram env vars are not configured. Lead:', req.body);
    return res.status(200).json({ ok: true, demo: true });
  }

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatLeadMessage(req.body),
      parse_mode: 'HTML',
    }),
  });

  if (!telegramResponse.ok) {
    console.error('Telegram API request failed:', await telegramResponse.text());
    return res.status(502).json({ ok: false, error: 'Telegram request failed' });
  }

  return res.status(200).json({ ok: true });
}
