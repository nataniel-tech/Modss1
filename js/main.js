// ============================================
// Modss1 - JavaScript Principal
// ============================================

// Estado da aplicação
let modsData = [];
let modsFiltrados = [];

// Categorias disponíveis
const categorias = {
    'addon': { nome: 'Add-on', icone: '🧩' },
    'resource': { nome: 'Resource Pack', icone: '🎨' },
    'behavior': { nome: 'Behavior Pack', icone: '⚙️' },
    'map': { nome: 'Mapa', icone: '🗺️' },
    'skin': { nome: 'Skin', icone: '👤' },
    'utility': { nome: 'Utilidade', icone: '🛠️' }
};

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Carregar dados dos mods
    await carregarMods();

    // Atualizar estatísticas na home
    atualizarEstatisticas();

    // Carregar mods em destaque
    carregarModsDestaque();

    // Carregar mods recentes
    carregarModsRecentes();

    // Verificar se estamos na página de mods
    if (document.getElementById('modsGrid')) {
        inicializarPaginaMods();
    }
});

// ============================================
// CARREGAMENTO DE DADOS
// ============================================

async function carregarMods() {
    try {
        const response = await fetch('data/mods.json');
        const data = await response.json();
        modsData = data.mods;
        modsFiltrados = [...modsData];
        console.log(`✅ ${modsData.length} mods carregados`);
    } catch (error) {
        console.error('Erro ao carregar mods:', error);
        // Dados de fallback caso o fetch falhe
        modsData = [];
    }
}

// ============================================
// ESTATÍSTICAS
// ============================================

function atualizarEstatisticas() {
    const totalModsEl = document.getElementById('totalMods');
    const totalDownloadsEl = document.getElementById('totalDownloads');

    if (totalModsEl) {
        animarNumero(totalModsEl, modsData.length);
    }

    if (totalDownloadsEl) {
        const totalDownloads = modsData.reduce((acc, mod) => acc + mod.downloads, 0);
        animarNumero(totalDownloadsEl, totalDownloads);
    }
}

function animarNumero(elemento, valorFinal) {
    const duracao = 1500;
    const inicio = performance.now();
    const valorInicial = 0;

    function atualizar(timestamp) {
        const progresso = Math.min((timestamp - inicio) / duracao, 1);
        const valorAtual = Math.floor(valorInicial + (valorFinal - valorInicial) * easeOutQuart(progresso));
        elemento.textContent = formatarNumero(valorAtual);

        if (progresso < 1) {
            requestAnimationFrame(atualizar);
        }
    }

    requestAnimationFrame(atualizar);
}

function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

function formatarNumero(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// ============================================
// CARDS DE MODS
// ============================================

function criarModCard(mod) {
    const categoria = categorias[mod.categoria] || { nome: mod.categoria, icone: '📦' };
    const dataFormatada = new Date(mod.dataAdicao).toLocaleDateString('pt-BR');

    return `
        <a href="mod.html?id=${mod.id}" class="mod-card">
            <div class="mod-image">
                ${mod.icone}
                ${mod.destaque ? '<span class="mod-badge">⭐ Destaque</span>' : ''}
            </div>
            <div class="mod-content">
                <span class="mod-category">${categoria.icone} ${categoria.nome}</span>
                <h3 class="mod-title">${mod.nome}</h3>
                <p class="mod-description">${mod.descricao}</p>
                <div class="mod-meta">
                    <span class="mod-meta-item">⬇️ ${formatarNumero(mod.downloads)}</span>
                    <span class="mod-meta-item">⭐ ${mod.rating}</span>
                    <span class="mod-meta-item">📅 ${dataFormatada}</span>
                    <button class="mod-download-btn" onclick="event.preventDefault(); baixarMod('${mod.id}')">⬇️ Baixar</button>
                </div>
            </div>
        </a>
    `;
}

function carregarModsDestaque() {
    const container = document.getElementById('featuredMods');
    if (!container) return;

    const destaque = modsData.filter(m => m.destaque).slice(0, 6);
    container.innerHTML = destaque.map(criarModCard).join('');
}

function carregarModsRecentes() {
    const container = document.getElementById('recentMods');
    if (!container) return;

    const recentes = [...modsData]
        .sort((a, b) => new Date(b.dataAdicao) - new Date(a.dataAdicao))
        .slice(0, 6);

    container.innerHTML = recentes.map(criarModCard).join('');
}

// ============================================
// PÁGINA DE MODS (LISTAGEM)
// ============================================

function inicializarPaginaMods() {
    // Pegar parâmetros da URL
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('cat');
    const busca = params.get('q');
    const ordenacao = params.get('sort');

    // Aplicar filtros iniciais
    if (categoria) {
        modsFiltrados = modsData.filter(m => m.categoria === categoria);
        // Atualizar select de categoria
        const selectCat = document.getElementById('filterCategory');
        if (selectCat) selectCat.value = categoria;
    }

    if (busca) {
        realizarBusca(busca);
        const inputBusca = document.getElementById('searchInput');
        if (inputBusca) inputBusca.value = busca;
    }

    if (ordenacao === 'recent') {
        modsFiltrados.sort((a, b) => new Date(b.dataAdicao) - new Date(a.dataAdicao));
    }

    renderizarMods();
    atualizarContador();
}

function renderizarMods() {
    const container = document.getElementById('modsGrid');
    if (!container) return;

    if (modsFiltrados.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <span class="no-results-icon">😕</span>
                <h3>Nenhum mod encontrado</h3>
                <p>Tente buscar por outro termo ou categoria</p>
            </div>
        `;
        return;
    }

    container.innerHTML = modsFiltrados.map(criarModCard).join('');
}

function atualizarContador() {
    const contador = document.getElementById('modsCount');
    if (contador) {
        contador.textContent = `${modsFiltrados.length} mod${modsFiltrados.length !== 1 ? 's' : ''} encontrado${modsFiltrados.length !== 1 ? 's' : ''}`;
    }
}

// ============================================
// BUSCA E FILTROS
// ============================================

function buscarMods(termo) {
    termo = termo || document.getElementById('heroSearch')?.value || '';
    if (termo.trim()) {
        window.location.href = `mods.html?q=${encodeURIComponent(termo.trim())}`;
    }
}

function realizarBusca(termo) {
    termo = termo.toLowerCase();
    modsFiltrados = modsData.filter(mod =>
        mod.nome.toLowerCase().includes(termo) ||
        mod.descricao.toLowerCase().includes(termo) ||
        mod.tags.some(tag => tag.toLowerCase().includes(termo))
    );
}

function filtrarPorCategoria() {
    const select = document.getElementById('filterCategory');
    const categoria = select.value;

    if (categoria === 'all') {
        modsFiltrados = [...modsData];
    } else {
        modsFiltrados = modsData.filter(m => m.categoria === categoria);
    }

    // Manter busca ativa se houver
    const busca = document.getElementById('searchInput')?.value;
    if (busca) {
        realizarBusca(busca);
        if (categoria !== 'all') {
            modsFiltrados = modsFiltrados.filter(m => m.categoria === categoria);
        }
    }

    renderizarMods();
    atualizarContador();
}

function ordenarMods() {
    const select = document.getElementById('sortBy');
    const criterio = select.value;

    switch (criterio) {
        case 'popular':
            modsFiltrados.sort((a, b) => b.downloads - a.downloads);
            break;
        case 'rating':
            modsFiltrados.sort((a, b) => b.rating - a.rating);
            break;
        case 'recent':
            modsFiltrados.sort((a, b) => new Date(b.dataAdicao) - new Date(a.dataAdicao));
            break;
        case 'name':
            modsFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
            break;
    }

    renderizarMods();
}

function buscaLive(termo) {
    if (termo.length >= 2 || termo.length === 0) {
        realizarBusca(termo);
        // Aplicar filtro de categoria se selecionado
        const categoria = document.getElementById('filterCategory')?.value;
        if (categoria && categoria !== 'all') {
            modsFiltrados = modsFiltrados.filter(m => m.categoria === categoria);
        }
        renderizarMods();
        atualizarContador();
    }
}

// ============================================
// DOWNLOAD
// ============================================

function baixarMod(modId) {
    const mod = modsData.find(m => m.id === modId);
    if (!mod) return;

    // Simular download (em produção, apontaria para o arquivo real)
    mostrarToast(`⬇️ Iniciando download de ${mod.nome}...`);

    // Incrementar contador de downloads (visual)
    mod.downloads++;

    // Criar link de download simulado
    // Em produção, usar: window.open(mod.linkDownload, '_blank');
    setTimeout(() => {
        mostrarToast(`✅ Download de ${mod.nome} iniciado! Verifique seus downloads.`);
    }, 1500);
}

function mostrarToast(mensagem) {
    // Remover toast anterior se existir
    const toastAnterior = document.querySelector('.toast');
    if (toastAnterior) toastAnterior.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = mensagem;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// UTILITÁRIOS GLOBAIS
// ============================================

// Expor funções para uso inline no HTML
window.buscarMods = buscarMods;
window.baixarMod = baixarMod;
window.filtrarPorCategoria = filtrarPorCategoria;
window.ordenarMods = ordenarMods;
window.buscaLive = buscaLive;
