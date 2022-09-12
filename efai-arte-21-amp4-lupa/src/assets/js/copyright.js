const menu = document.querySelector('section.copyright')
const botao = document.querySelector('button.on-off')
botao.addEventListener('click', () => {
    const aberto = menu.classList.contains('open')
    menu.classList.toggle('open')
})