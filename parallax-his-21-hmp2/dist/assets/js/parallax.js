let crianca = document.getElementById('crianca');
let adolescente = document.getElementById('adolescente');
let adulto = document.getElementById('adulto');
let velho = document.getElementById('velho');
let arvore = document.getElementById('arvore');
let folhas = document.getElementById('folhas');
let fundofolhas = document.getElementById('fundofolhas');
let bgcrianca = document.getElementById('bg-crianca');
let bgadolescente = document.getElementById('bg-adolescente');
let bgadulto = document.getElementById('bg-adulto');
let bgvelho = document.getElementById('bg-velho');

window.addEventListener('scroll', () => {
    let { scrollY } = window.getElementById('atividade1');

    // road.style.top = 0.5 * scrollY + 'px';
    // alunos.style.left = -2.1 * scrollY + 'px'; 
    // professor.style.left = +1.1 * scrollY + 'px';
    // fundosala.style.top = -1.2 * scrollY + 'px';
    // textoparallax.style.left = +0.5 * scrollY + 'px';

    crianca.style.left = +1 * scrollY + 'px';

    console.log(scrollY);
    // crianca.style.top = -1.2 * scrollY + 'px';
    // bgcrianca.style.top = -1.2 * scrollY + 'px';
    // crianca.style.opacity = 1 - scrollY / 570;
    // bgcrianca.style.opacity = 1 - scrollY / 570;

    adolescente.style.left = +.1 * scrollY + 'px';

    adulto.style.left = +.8 * scrollY + 'px';

    velho.style.left = .1 * scrollY + 'px';

});
