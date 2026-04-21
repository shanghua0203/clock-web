// ============================================================
// 即時時鐘 — 更新邏輯
// ============================================================

const el = {
  date:    document.getElementById('date'),
  weekday: document.getElementById('weekday'),
  hours:   document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
  ampm:    document.getElementById('ampm'),
  ring:    document.getElementById('ringProgress'),
};

const WEEKDAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const RING_CIRCUMFERENCE = 659; // 2 * PI * 105

function pad(n) {
  return String(n).padStart(2, '0');
}

function updateClock() {
  const now = new Date();

  const year    = now.getFullYear();
  const month   = pad(now.getMonth() + 1);
  const day     = pad(now.getDate());
  const weekday = WEEKDAYS[now.getDay()];

  let hours   = now.getHours();
  const ampm  = hours >= 12 ? 'PM' : 'AM';
  hours       = hours % 12 || 12;

  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  // 更新 DOM
  el.date.textContent    = `${year}/${month}/${day}`;
  el.weekday.textContent = weekday;
  el.hours.textContent   = pad(hours);
  el.minutes.textContent = minutes;
  el.seconds.textContent = seconds;
  el.ampm.textContent    = ampm;

  // 環形進度（每秒前進一圈的 1/60）
  const progress = (now.getSeconds() / 60) * RING_CIRCUMFERENCE;
  el.ring.style.strokeDashoffset = RING_CIRCUMFERENCE - progress;
}

// 立即執行一次，再每 1000ms 輪詢
updateClock();
setInterval(updateClock, 1000);
