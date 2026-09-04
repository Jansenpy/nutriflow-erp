const sb = window.supabase.createClient('https://qywjqdupigmfgrnmdxwk.supabase.co', 'sb_publishable_SUvYzfpwRete5kYZy65Tsw_uh7iU5Dk');
const auth = document.querySelector('#auth-screen');
const msg = document.querySelector('#auth-message');
const loginForm = document.querySelector('#login-form');
const recoveryForm = document.querySelector('#recovery-form');

function showRecovery() { loginForm.hidden = true; recoveryForm.hidden = false; msg.textContent = 'Defina uma senha com pelo menos 8 caracteres.'; }
async function gate() { const { data: { session } } = await sb.auth.getSession(); auth.hidden = !!session && !location.hash.includes('type=recovery'); }

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); msg.textContent = '';
  const { error } = await sb.auth.signInWithPassword({ email: document.querySelector('#email').value.trim(), password: document.querySelector('#password').value });
  if (error) msg.textContent = 'E-mail ou senha inválidos. Se necessário, use “Esqueci minha senha”.'; else gate();
});
document.querySelector('#forgot-password').addEventListener('click', async () => {
  const address = document.querySelector('#email').value.trim();
  if (!address) { msg.textContent = 'Informe seu e-mail acima para receber o link de redefinição.'; return; }
  const { error } = await sb.auth.resetPasswordForEmail(address, { redirectTo: 'https://nutriflow-erp.vercel.app/' });
  msg.textContent = error ? 'Não foi possível enviar o link. Tente novamente.' : 'Link de redefinição enviado. Verifique seu e-mail.';
});
recoveryForm.addEventListener('submit', async (event) => {
  event.preventDefault(); const password = document.querySelector('#new-password').value;
  if (password !== document.querySelector('#confirm-password').value) { msg.textContent = 'As senhas não conferem.'; return; }
  const { error } = await sb.auth.updateUser({ password });
  if (error) { msg.textContent = 'Este link expirou ou não é mais válido. Solicite outro link de redefinição.'; return; }
  history.replaceState(null, '', location.pathname); msg.textContent = ''; auth.hidden = true;
});
if (location.hash.includes('error_code=otp_expired')) msg.textContent = 'Este link expirou. Solicite um novo link de redefinição.';
sb.auth.onAuthStateChange((event) => { if (event === 'PASSWORD_RECOVERY') showRecovery(); });
gate();
const navItems = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');
const title = document.querySelector('#page-title');
const labels = {dashboard:'Visão geral',vendas:'Vendas',clientes:'Clientes',produtos:'Produtos & Estoque',logistica:'Logística',financeiro:'Financeiro',fiscal:'Fiscal',relatorios:'Relatórios'};

function showPage(id) {
  pages.forEach(page => page.classList.toggle('active', page.id === id));
  navItems.forEach(item => item.classList.toggle('active', item.dataset.page === id));
  title.textContent = labels[id];
  document.querySelector('.sidebar').classList.remove('open');
}
navItems.forEach(item => item.addEventListener('click', () => showPage(item.dataset.page)));
document.querySelectorAll('.link[data-page]').forEach(item => item.addEventListener('click', () => showPage(item.dataset.page)));
document.querySelector('.mobile-menu').addEventListener('click', () => document.querySelector('.sidebar').classList.toggle('open'));
document.querySelector('#new-action').addEventListener('click', () => showPage('vendas'));
