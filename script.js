const btnAbrirModal = document.getElementById('btn-abrir-modal');
const btnFecharModal = document.getElementById('btn-fechar-modal');
const modalPost = document.getElementById('modal-post');
const formNovoPost = document.getElementById('form-novo-post');
const gridPosts = document.getElementById('grid-posts');

let listaDePosts = [];

const abrirModal = () => modalPost.classList.remove('escondida');
const fecharModal = () => modalPost.classList.add('escondida');

btnAbrirModal.addEventListener('click', abrirModal);
btnFecharModal.addEventListener('click', fecharModal);

function carregarPostsSalvos() {
    const postsSalvos = localStorage.getItem('meus_posts_blog');
    if (postsSalvos) {
        listaDePosts = JSON.parse(postsSalvos);
    } else {
        listaDePosts = [
            {
                id: Date.now() + 1,
                titulo: "Primeira publicação",
                conteudo: "Conteúdo do meu primeiro post no blog.",
                imagem: "https://picsum.photos/id/1015/400/250",
                curtidas: 0,
                curtido: false
            }
        ];
        salvarNoLocalStorage();
    }
    renderizarPosts();
}

function salvarNoLocalStorage() {
    localStorage.setItem('meus_posts_blog', JSON.stringify(listaDePosts));
}

function renderizarPosts() {
    gridPosts.innerHTML = "";

    listaDePosts.forEach(function(post) {
        const artigoPost = document.createElement('article');
        artigoPost.classList.add('cartao-post');
        
        artigoPost.innerHTML = `
            <img src="${post.imagem}" alt="${post.titulo}">
            <h3>${post.titulo}</h3>
            <p>${post.conteudo}</p>
            <div class="acoes">
                <button class="btn-curtir ${post.curtido ? 'curtido' : ''}">
                    ${post.curtido ? 'Curtido' : 'Curtir'} (${post.curtidas})
                </button>
                <button class="btn-excluir">Excluir</button>
            </div>
        `;

        artigoPost.querySelector('.btn-curtir').addEventListener('click', function() {
            post.curtido = !post.curtido;
            post.curtidas += post.curtido ? 1 : -1;
            salvarNoLocalStorage();
            renderizarPosts();
        });

        artigoPost.querySelector('.btn-excluir').addEventListener('click', function() {
            listaDePosts = listaDePosts.filter(item => item.id !== post.id);
            salvarNoLocalStorage();
            renderizarPosts();
        });

        gridPosts.appendChild(artigoPost);
    });
}

formNovoPost.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const titulo = document.getElementById('novo-titulo').value;
    const conteudo = document.getElementById('novo-conteudo').value;
    const arquivoImagem = document.getElementById('nova-imagem').files[0];
    
    if (arquivoImagem) {
        const leitorArquivo = new FileReader();
        leitorArquivo.onload = function(e) {
            listaDePosts.unshift({
                id: Date.now(),
                titulo: titulo,
                conteudo: conteudo,
                imagem: e.target.result,
                curtidas: 0,
                curtido: false
            });
            salvarNoLocalStorage();
            renderizarPosts();
            formNovoPost.reset();
            fecharModal();
        };
        leitorArquivo.readAsDataURL(arquivoImagem);
    }
});

carregarPostsSalvos();
