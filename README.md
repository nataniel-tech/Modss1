# ⛏️ Modss1 - Site de Mods para Minecraft Bedrock

Um site completo para baixar mods, add-ons, resource packs, behavior packs, mapas e skins para **Minecraft Bedrock Edition**.

![Modss1](https://img.shields.io/badge/Minecraft-Bedrock-3DDC84?style=for-the-badge&logo=minecraft&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎮 Sobre o Projeto

O **Modss1** é uma plataforma web moderna e responsiva onde jogadores de Minecraft Bedrock podem:

- 🔍 **Buscar e filtrar** mods por categoria, popularidade e data
- 📦 **Baixar** add-ons, packs de recursos, behavior packs, mapas e skins
- 📖 **Aprender** a instalar mods em diferentes plataformas (celular, Windows, console)
- 📤 **Enviar** seus próprios mods para a comunidade

## ✨ Funcionalidades

### 🏠 Página Inicial
- Hero section com busca integrada
- Estatísticas animadas (total de mods, downloads)
- Categorias de mods com ícones
- Mods em destaque e adicionados recentemente
- Guia "Como funciona" em 4 passos

### 📦 Página de Mods
- Listagem completa de todos os mods
- Busca em tempo real
- Filtros por categoria
- Ordenação por: popularidade, data, avaliação, nome
- Cards com informações detalhadas

### 📄 Página de Detalhes do Mod
- Informações completas do mod
- Descrição detalhada
- Instruções de instalação passo a passo
- Download direto
- Tags e requisitos
- Mods relacionados

### 📂 Página de Categorias
- Descrição detalhada de cada tipo de mod
- Quantidade de mods por categoria
- Links diretos para cada categoria

### 📖 Página "Como Instalar"
- Tutoriais específicos por plataforma:
  - 📱 **Celular/Tablet** (Android/iOS)
  - 🪟 **Windows 10/11**
  - 🎮 **Console** (Xbox/PlayStation/Switch)
- Guia de tipos de arquivo (.mcpack, .mcaddon, .mcworld, .mcskin)
- Solução de problemas comuns

### 📤 Página "Enviar Mod"
- Formulário completo para envio de mods
- Upload de arquivo do mod
- Upload de imagens (screenshots)
- Validação de campos
- Confirmação de envio

## 🗂️ Estrutura do Projeto

```
Modss1/
├── index.html          # Página inicial
├── mods.html           # Listagem de todos os mods
├── mod.html            # Página de detalhes do mod (dinâmica)
├── categorias.html     # Página de categorias
├── como-instalar.html  # Tutorial de instalação
├── enviar.html         # Formulário de envio de mods
├── css/
│   └── style.css       # Estilos principais (dark mode)
├── js/
│   └── main.js         # JavaScript principal (dados, busca, filtros)
├── data/
│   └── mods.json       # Banco de dados dos mods (JSON)
├── assets/
│   └── img/            # Imagens do site (screenshots, logos)
└── README.md           # Este arquivo
```

## 🚀 Como Usar

### Opção 1: Abrir diretamente no navegador
Simplesmente abra o arquivo `index.html` em qualquer navegador moderno.

### Opção 2: Servidor local (recomendado)

```bash
# Usando Python 3
python -m http.server 8000

# Ou usando Node.js (npx)
npx serve .

# Ou usando PHP
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

### Opção 3: Hospedar online (grátis)
- **GitHub Pages**: Faça push do repositório e ative o GitHub Pages nas configurações
- **Netlify**: Arraste a pasta para [netlify.com/drop](https://netlify.com/drop)
- **Vercel**: Conecte o repositório em [vercel.com](https://vercel.com)

## 📝 Como Adicionar Novos Mods

Edite o arquivo `data/mods.json` e adicione um novo objeto no array `mods`:

```json
{
    "id": "nome-do-mod",
    "nome": "Nome do Mod",
    "descricao": "Descrição curta do mod",
    "descricaoLonga": "Descrição completa e detalhada",
    "categoria": "addon",
    "categoriaNome": "Add-on",
    "icone": "🧩",
    "imagem": null,
    "versao": "1.21.0",
    "tamanho": "5 MB",
    "downloads": 0,
    "rating": 5.0,
    "destaque": true,
    "recente": true,
    "dataAdicao": "2026-10-07",
    "autor": "Seu Nome",
    "arquivo": "nome-do-arquivo.mcaddon",
    "linkDownload": "https://seu-link.com/arquivo.mcaddon",
    "requisitos": "Minecraft Bedrock 1.21.0 ou superior",
    "tags": ["tag1", "tag2", "tag3"]
}
```

### Categorias disponíveis:
| Valor | Nome | Ícone sugerido |
|-------|------|----------------|
| `addon` | Add-on | 🧩 |
| `resource` | Resource Pack | 🎨 |
| `behavior` | Behavior Pack | ⚙️ |
| `map` | Mapa | 🗺️ |
| `skin` | Skin | 👤 |
| `utility` | Utilidade | 🛠️ |

## 🎨 Personalização

### Cores (CSS Variables)
Edite as variáveis no início do arquivo `css/style.css`:

```css
:root {
    --bg-primary: #0a0e14;      /* Fundo principal */
    --bg-secondary: #111722;     /* Fundo secundário */
    --bg-card: #151d2b;          /* Fundo dos cards */
    --accent-primary: #3ddc84;   /* Cor de destaque (verde Minecraft) */
    --accent-secondary: #00c853; /* Cor secundária */
    /* ... */
}
```

### Adicionar seu logo
Substitua o emoji ⛏️ no navbar por uma imagem:
```html
<img src="assets/img/logo.png" alt="Modss1" style="height: 40px;">
```

## 📱 Screenshots

*(Adicione screenshots do seu site aqui)*

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de código aberto. Sinta-se livre para usar, modificar e distribuir.

## ⚠️ Aviso Legal

Este site **não é afiliado, patrocinado ou endossado pela Mojang Studios ou Microsoft**. Minecraft é uma marca registrada da Mojang Studios.

Os mods hospedados neste site são criados pela comunidade e cada autor é responsável pelo conteúdo de seus mods.

---

Feito com ❤️ para a comunidade Minecraft Bedrock

**Modss1** - Seu portal de mods para Minecraft Bedrock 🎮
