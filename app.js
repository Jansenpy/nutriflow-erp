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
