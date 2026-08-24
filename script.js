// Seleção dos elementos do HTML
const btnAbrirModal = document.getElementById('btn-abrir-modal');
const btnFecharModal = document.getElementById('btn-fechar-modal');
const btnFecharModalX = document.getElementById('btn-fechar-modal-x');
const modalPost = document.getElementById('modal-post');
const formNovoPost = document.getElementById('form-novo-post');
const gridPosts = document.getElementById('grid-posts');

// Lista que guarda as publicações
let listaDePosts = [];

// Funções para controlar a exibição da janela modal
const abrirModal = () => modalPost.classList.remove('escondida');
const fecharModal = () => modalPost.classList.add('escondida');

btnAbrirModal.addEventListener('click', abrirModal);
btnFecharModal.addEventListener('click', fecharModal);
btnFecharModalX.addEventListener('click', fecharModal);

// Carrega as postagens salvas no navegador
function carregarPostsSalvos() {
    const postsSalvos = localStorage.getItem('meus_posts_blog');
    
    if (postsSalvos) {
        listaDePosts = JSON.parse(postsSalvos);
    } else {
        // Postagens de exemplo iniciais
        listaDePosts = [
            {
                id: Date.now() + 1,
                titulo: "A arte de viver no momento presente",
                conteudo: "O ato de viver conscientemente no presente é a chave para o bem-estar mental e para a redução do estresse no dia a dia...",
                imagem: "https://picsum.photos/id/1015/400/250",
                curtidas: 0,
                curtido: false
            },
            {
                id: Date.now() + 2,
                titulo: "Mentalidade de crescimento na prática",
                conteudo: "Ter uma mentalidade de crescimento é acreditar que nossas habilidades e inteligência podem ser desenvolvidas com dedicação e treino.",
                imagem: "https://picsum.photos/id/1025/400/250",
                curtidas: 0,
                curtido: false
            }
        ];
        salvarNoLocalStorage();
    }
    renderizarPosts();
}

// Salva a lista de posts atualizada no armazenamento local do navegador
function salvarNoLocalStorage() {
    localStorage.setItem('meus_posts_blog', JSON.stringify(listaDePosts));
}

// Desenha os cards dos posts na tela
function renderizarPosts() {
    gridPosts.innerHTML = "";

    listaDePosts.forEach(function(post) {
        const artigoPost = document.createElement('article');
        artigoPost.classList.add('cartao-post');
        
        artigoPost.innerHTML = `
            <img src="${post.imagem}" alt="${post.titulo}">
            <div class="corpo-post">
                <h3>${post.titulo}</h3>
                <p>${post.conteudo}</p>
                
                <div class="acoes-post">
                    <div class="interacao">
                        <button class="btn btn-curtir ${post.curtido ? 'curtido' : ''}">
                            ${post.curtido ? '❤️ Curtido' : '🤍 Curtir'}
                        </button>
                        <span class="contador-curtidas">${post.curtidas} ${post.curtidas === 1 ? 'curtida' : 'curtidas'}</span>
                    </div>
                    <button class="btn-excluir">🗑️ Excluir</button>
                </div>
                
                <div class="autor-post">Por: Yasmim Nicolini</div>
            </div>
        `;

        // Evento para curtir ou descurtir
        const botaoCurtir = artigoPost.querySelector('.btn-curtir');
        botaoCurtir.addEventListener('click', function() {
            if (!post.curtido) {
                post.curtidas++;
                post.curtido = true;
            } else {
                post.curtidas--;
                post.curtido = false;
            }
            salvarNoLocalStorage();
            renderizarPosts();
        });

        // Evento para excluir o post
        const botaoExcluir = artigoPost.querySelector('.btn-excluir');
        botaoExcluir.addEventListener('click', function() {
            listaDePosts = listaDePosts.filter(item => item.id !== post.id);
            salvarNoLocalStorage();
            renderizarPosts();
        });

        gridPosts.appendChild(artigoPost);
    });
}

// Evento ao enviar o formulário de novo post
formNovoPost.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const titulo = document.getElementById('novo-titulo').value;
    const conteudo = document.getElementById('novo-conteudo').value;
    const inputImagem = document.getElementById('nova-imagem');
    const arquivoImagem = inputImagem.files[0];
    
    if (arquivoImagem) {
        const leitorArquivo = new FileReader();
        
        leitorArquivo.onload = function(e) {
            const novoObjetoPost = {
                id: Date.now(),
                titulo: titulo,
                conteudo: conteudo,
                imagem: e.target.result,
                curtidas: 0,
                curtido: false
            };

            // Adiciona a nova publicação no início da lista
            listaDePosts.unshift(novoObjetoPost);
            salvarNoLocalStorage();
            renderizarPosts();

            // Limpa os campos e fecha a janela
            formNovoPost.reset();
            fecharModal();
        };

        leitorArquivo.readAsDataURL(arquivoImagem);
    }
});

// Inicialização automática ao carregar a página
carregarPostsSalvos();
// Seletores de Elementos
const btnAbrirModal = document.getElementById('btn-abrir-modal');
const btnFecharModal = document.getElementById('btn-fechar-modal');
const modalPost = document.getElementById('modal-post');
const formNovoPost = document.getElementById('form-novo-post');
const gridPosts = document.getElementById('grid-posts');
const btnTema = document.getElementById('btn-tema');

let listaDePosts = [];

// ---- INTERATIVIDADE DO MODO ESCURO ----
btnTema.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    // Verifica se ativou ou não para salvar a escolha do usuário
    if (document.body.classList.contains('dark-mode')) {
        btnTema.textContent = "☀️ Modo Claro";
        localStorage.setItem('tema_blog', 'dark');
    } else {
        btnTema.textContent = "🌙 Modo Escuro";
        localStorage.setItem('tema_blog', 'light');
    }
});

// ---- CARREGAMENTO INICIAL (POSTS E TEMA) ----
function carregarDadosIniciais() {
    // Carrega o Tema Salvo
    const temaSalvo = localStorage.getItem('tema_blog');
    if (temaSalvo === 'dark') {
        document.body.classList.add('dark-mode');
        btnTema.textContent = "☀️ Modo Claro";
    }

    // Carrega os Posts Salvos
    const postsSalvos = localStorage.getItem('meus_posts_blog');
    if (postsSalvos) {
        listaDePosts = JSON.parse(postsSalvos);
    } else {
        // Posts Iniciais padrão de exemplo
        listaDePosts = [
            {
                id: 1,
                titulo: "1. A arte de viver no momento presente",
                conteudo: "O ato de viver conscientemente no presente é a chave para o bem-estar mental.<br><br>Focar no agora reduz a ansiedade.",
                link: "https://www.google.com",
                imagem: "https://picsum.photos/id/1015/400/250",
                likes: 0,
                curtido: false
            },
            {
                id: 2,
                titulo: "2. Mindset de crescimento e importância",
                conteudo: "Uma mentalidade de crescimento é a crença de que nossas habilidades podem ser desenvolvidas com dedicação.",
                link: "",
                imagem: "https://picsum.photos/id/1025/400/250",
                likes: 0,
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

// Modais
btnAbrirModal.addEventListener('click', () => modalPost.classList.remove('escondido'));
btnFecharModal.addEventListener('click', () => modalPost.classList.add('escondido'));

// ---- RENDERIZAR POSTAGENS ----
function renderizarPosts() {
    gridPosts.innerHTML = "";

    listaDePosts.forEach(function(post) {
        const novoPostArticle = document.createElement('article');
        novoPostArticle.classList.add('card-post');
        
        // Verifica se há link cadastrado para exibir a tag <a> com target="_blank"
        const tagLink = post.link ? `<a href="${post.link}" target="_blank" rel="noopener noreferrer" class="link-fonte">🔗 Ver fonte da informação</a>` : '';

        novoPostArticle.innerHTML = `
            <img src="${post.imagem}" alt="Imagem do post">
            <div class="conteudo-post">
                <h3>${post.titulo}</h3>
                <p>${post.conteudo}</p>
                ${tagLink}
                
                <div class="acoes-post">
                    <div class="interacao">
                        <button class="btn btn-like ${post.curtido ? 'curtido' : ''}">
                            ${post.curtido ? '👎 Descurtir' : '👍 Curtir'}
                        </button>
                        <span class="contador-likes">${post.likes} Likes</span>
                    </div>
                    <button class="btn-excluir">🗑️ Excluir</button>
                </div>
                
                <div class="autor">Por: Yasmim Nicolini</div>
            </div>
        `;

        // Funcionalidade do Like
        novoPostArticle.querySelector('.btn-like').addEventListener('click', function() {
            if (!post.curtido) {
                post.likes++;
                post.curtido = true;
            } else {
                post.likes--;
                post.curtido = false;
            }
            salvarNoLocalStorage();
            renderizarPosts();
        });

        // Funcionalidade de Deletar
        novoPostArticle.querySelector('.btn-excluir').addEventListener('click', function() {
            listaDePosts = listaDePosts.filter(item => item.id !== post.id);
            salvarNoLocalStorage();
            renderizarPosts();
        });

        gridPosts.appendChild(novoPostArticle);
    });
}

// ---- FORMULÁRIO DE CAPTURA DA GALERIA ----
formNovoPost.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const titulo = document.getElementById('novo-titulo').value;
    let conteudo = document.getElementById('novo-conteudo').value;
    const link = document.getElementById('novo-link').value;
    const inputImagem = document.getElementById('nova-imagem');
    const imagemArquivo = inputImagem.files[0];
    
    // Substitui as quebras de linha normais digitadas no textarea por tags <br> reais
    conteudo = conteudo.replace(/\n/g, '<br>');

    if (imagemArquivo) {
        const leitor = new FileReader();
        
        leitor.onload = function(e) {
            const novoPostObjeto = {
                id: Date.now(),
                titulo: titulo,
                conteudo: conteudo,
                link: link,
                imagem: e.target.result,
                likes: 0,
                curtido: false
            };

            listaDePosts.push(novoPostObjeto);
            salvarNoLocalStorage();
            renderizarPosts();

            formNovoPost.reset();
            modalPost.classList.add('escondido');
        };

        leitor.readAsDataURL(imagemArquivo);
    }
});

// Inicialização automática
carregarDadosIniciais();


