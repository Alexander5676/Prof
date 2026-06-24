export type Lead = { name: string; phone: string; audience: string; message: string };

export async function sendTelegramLead(lead: Lead) {
  const res = await fetch('/api/telegram', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });

  if (!res.ok) throw new Error('Не удалось отправить заявку');
  return res.json() as Promise<{ ok: boolean; demo?: boolean }>;
}
