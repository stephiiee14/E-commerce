const menu = document.getElementById('menu');
const btn = document.querySelector('.menu-btn');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') { menu.classList.remove('open'); btn.setAttribute('aria-expanded', false); }
});

document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('bookForm');
const msg = document.getElementById('formMsg');
form.date.min = new Date().toISOString().split('T')[0];

form.addEventListener('submit', e => {
  e.preventDefault();
  const missing = ['name', 'contact', 'service', 'date'].some(k => !form[k].value.trim());
  msg.className = missing ? 'err' : 'ok';
  if (missing) { msg.textContent = 'Please fill in all required fields.'; return; }
  // Demo only: wire this up to your email/booking service (e.g. Formspree) to receive requests.
  msg.textContent = `Thanks ${form.name.value.split(' ')[0]}! We'll confirm your ${form.service.value} appointment soon.`;
  form.reset();
});
