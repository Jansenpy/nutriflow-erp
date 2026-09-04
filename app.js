const sb=window.supabase.createClient('https://qywjqdupigmfgrnmdxwk.supabase.co','sb_publishable_SUvYzfpwRete5kYZy65Tsw_uh7iU5Dk');
const auth=document.querySelector('#auth-screen'),msg=document.querySelector('#auth-message');
async function gate(){const {data:{session}}=await sb.auth.getSession();auth.hidden=!!session;}
document.querySelector('#login').onclick=async()=>{const {error}=await sb.auth.signInWithPassword({email:document.querySelector('#email').value,password:document.querySelector('#password').value});if(error)msg.textContent='E-mail ou senha inválidos.';else gate();};
document.querySelector('#forgot-password').onclick=async()=>{const address=prompt('Informe seu e-mail:');if(address){const {error}=await sb.auth.resetPasswordForEmail(address,{redirectTo:'https://nutriflow-erp.vercel.app'});msg.textContent=error?'Não foi possível enviar.':'Link de redefinição enviado.';}};
sb.auth.onAuthStateChange((event)=>{if(event==='PASSWORD_RECOVERY')msg.textContent='Recuperação iniciada. Atualize sua senha pelo Supabase.';});gate();
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
