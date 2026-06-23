declare global { interface Window { dataLayer?: unknown[]; ym?: (...args: unknown[]) => void } }

export function initAnalytics() {
  const gaId = import.meta.env.VITE_GA_ID;
  const ymId = import.meta.env.VITE_YM_ID;
  if (gaId) {
    const s = document.createElement('script');
    s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`; document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) { window.dataLayer?.push(args); }
    gtag('js', new Date()); gtag('config', gaId);
  }
  if (ymId) {
    const s = document.createElement('script');
    s.textContent = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(${ymId},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true});`;
    document.head.appendChild(s);
  }
}
