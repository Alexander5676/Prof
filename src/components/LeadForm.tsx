import { useState } from 'react';
import { motion } from 'framer-motion';
import { sendTelegramLead } from '../utils/telegram';

const initial = { name: '', phone: '', audience: 'Подросток 14–18', message: '' };

export function LeadForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = 'Введите имя';
    if (!/^\+?[\d\s()-]{7,}$/.test(form.phone)) next.phone = 'Введите корректный телефон';
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus('Отправляем...');
    try { await sendTelegramLead(form); setStatus('Заявка отправлена! Мы свяжемся с вами в ближайшее время.'); setForm(initial); }
    catch { setStatus('Не удалось отправить. Попробуйте позже или напишите нам в Telegram.'); }
  }

  return <motion.form id="consult" onSubmit={onSubmit} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
    <h3 className="text-2xl font-bold text-slate-950 dark:text-white">Бесплатная консультация</h3>
    <p className="mt-2 text-slate-600 dark:text-slate-300">Оставьте контакты — эксперт поможет выбрать формат.</p>
    <div className="mt-5 grid gap-4">
      <label className="text-sm font-medium">Имя<input value={form.name} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setForm({...form,name:e.target.value})} className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 dark:border-white/10 dark:bg-slate-950" placeholder="Ваше имя" /></label>
      {errors.name && <span className="text-sm text-rose-500">{errors.name}</span>}
      <label className="text-sm font-medium">Телефон<input value={form.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setForm({...form,phone:e.target.value})} className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 dark:border-white/10 dark:bg-slate-950" placeholder="+7 900 000-00-00" /></label>
      {errors.phone && <span className="text-sm text-rose-500">{errors.phone}</span>}
      <label className="text-sm font-medium">Для кого курс<select value={form.audience} onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setForm({...form,audience:e.target.value})} className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none dark:border-white/10 dark:bg-slate-950"><option>Подросток 14–18</option><option>Студент</option><option>Взрослый</option></select></label>
      <label className="text-sm font-medium">Комментарий<textarea value={form.message} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>setForm({...form,message:e.target.value})} className="mt-1 min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none dark:border-white/10 dark:bg-slate-950" placeholder="Что хотите прояснить?" /></label>
      <button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-4 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:scale-[1.02]">Получить бесплатную консультацию</button>
      {status && <p className="text-sm text-slate-600 dark:text-slate-300">{status}</p>}
    </div>
  </motion.form>;
}
