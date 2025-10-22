[produtos.csv](https://github.com/user-attachments/files/23059386/produtos.csv)# 📚 Documentação do Projeto Next-Auth Products

## 📋 Visão Geral

Este é um projeto de e-commerce desenvolvido com Next.js 15, que permite usuários comprarem produtos e vendedores gerenciarem seus produtos. O sistema possui autenticação, carrinho de compras, favoritos, pedidos e dashboard para vendedores.

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15.5.5** - Framework React com App Router
- **React 19.1.0** - Biblioteca de interface
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS 4.1.14** - Framework CSS
- **React Hook Form 7.65.0** - Gerenciamento de formulários
- **Zod 4.1.12** - Validação de schemas
- **TanStack React Query 5.90.5** - Gerenciamento de estado do servidor
- **Axios 1.12.2** - Cliente HTTP
- **React Icons 5.5.0** - Ícones

### Desenvolvimento
- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS
- **Turbopack** - Bundler otimizado

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd next-auth-products-frontend
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

4. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

O projeto estará disponível em `http://localhost:3000`

## 📁 Estrutura de Pastas

```
src/
├── app/                          # App Router do Next.js
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Autenticação
│   │   ├── cart/                 # Carrinho de compras
│   │   ├── favorites/            # Favoritos
│   │   ├── orders/               # Pedidos
│   │   ├── products/             # Produtos
│   │   └── users/                # Usuários
│   ├── auth/                     # Páginas de autenticação
│   ├── seller/                   # Área do vendedor
│   ├── user/                     # Área do usuário
│   ├── globals.css               # Estilos globais
│   └── layout.tsx                # Layout principal
├── components/                   # Componentes React
│   ├── auth/                     # Componentes de autenticação
│   ├── cart/                     # Componentes do carrinho
│   ├── common/                   # Componentes comuns
│   ├── favorites/                # Componentes de favoritos
│   ├── forms/                    # Formulários
│   ├── product/                  # Componentes de produtos
│   ├── seller/                   # Componentes do vendedor
│   ├── ui/                       # Componentes de UI
│   └── user/                     # Componentes do usuário
├── contexts/                     # Contextos React
├── hooks/                        # Hooks customizados
│   ├── analytics/                # Hooks de analytics
│   ├── cart/                     # Hooks do carrinho
│   ├── favorites/                # Hooks de favoritos
│   ├── orders/                   # Hooks de pedidos
│   ├── products/                 # Hooks de produtos
│   └── users/                    # Hooks de usuários
├── schemas/                      # Schemas de validação
├── services/                     # Serviços de API
└── types/                        # Definições de tipos TypeScript
```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Gera build de produção
npm run start        # Executa build de produção
npm run lint         # Executa linting do código
```

## 🏗️ Arquitetura do Projeto

### Contextos

#### AuthContext (`src/contexts/AuthContext.tsx`)
- Gerencia estado de autenticação
- Funções de login/logout
- Persistência de token no localStorage
- Configuração automática de headers de autorização

#### Providers (`src/contexts/Providers.tsx`)
- Configuração do React Query
- Wrapper dos contextos da aplicação

### Hooks Customizados

#### Carrinho (`src/hooks/cart/`)
- `useCart.ts` - Busca dados do carrinho
- `useAddToCart.ts` - Adiciona itens ao carrinho
- `useRemoveCartItem.ts` - Remove itens do carrinho

#### Produtos (`src/hooks/products/`)
- `useCreateProduct.ts` - Cria novos produtos
- `useProduct.ts` - Busca produto específico
- `useProductDetails.ts` - Detalhes do produto
- `useSellerProducts.ts` - Produtos do vendedor
- `allAvailableProducts.ts` - Produtos disponíveis

#### Favoritos (`src/hooks/favorites/`)
- `useAllFavorites.ts` - Lista favoritos
- `useIsFavorite.ts` - Verifica se é favorito
- `useToggleFavorite.ts` - Alterna favorito

#### Pedidos (`src/hooks/orders/`)
- `useCreateOrder.ts` - Cria pedidos
- `useOrdersByUser.ts` - Pedidos do usuário

#### Analytics (`src/hooks/analytics/`)
- `useMostSoldProduct.ts` - Produto mais vendido
- `useTotalProductsSold.ts` - Total de produtos vendidos
- `useTotalRevenue.ts` - Receita total

### Schemas de Validação

#### Produtos (`src/schemas/products/index.ts`)
```typescript
export const createProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  price: z.number().min(0.01, 'Preço deve ser maior que 0'),
  stock: z.number().min(0, 'Estoque não pode ser negativo'),
  isVisible: z.boolean(),
});
```

#### Usuários (`src/schemas/users/index.ts`)
```typescript
export const userSignupSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
  role: z.string().refine((val) => val === 'CLIENT' || val === 'SELLER'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
});
```

### Serviços de API (`src/services/api.ts`)

#### Configuração Base
- Cliente Axios configurado
- Interceptor para adicionar token automaticamente
- Base URL: `/api`

#### Serviços Disponíveis
- `usersService` - Criação de usuários
- `productsService` - CRUD de produtos
- `cartService` - Gerenciamento do carrinho
- `favoritesService` - Gerenciamento de favoritos
- `ordersService` - Gerenciamento de pedidos
- `analyticsService` - Métricas e analytics

## 🎨 Componentes

### Formulários (`src/components/forms/`)
- `LoginForm` - Formulário de login
- `SignupForm` - Formulário de cadastro
- `AddProductForm` - Formulário de criação de produtos
- `UploadCSV` - Upload de arquivos CSV

### Componentes de Produto (`src/components/product/`)
- `ProductCard` - Card de produto
- `ProductGrid` - Grid de produtos

### Componentes de Carrinho (`src/components/cart/`)
- `addToCart` - Botão de adicionar ao carrinho

### Componentes de Favoritos (`src/components/favorites/`)
- `FavoriteButton` - Botão de favoritar
- `FavoritesGrid` - Grid de favoritos

### Componentes Comuns (`src/components/common/`)
- `LoadingScreen` - Tela de carregamento
- `LogoutButton` - Botão de logout
- `MenuItem` - Item de menu
- `Section` - Seção de conteúdo
- `SellerDashboard` - Dashboard do vendedor
- `SellerLayout` - Layout do vendedor
- `UserLayout` - Layout do usuário

### Componentes de UI (`src/components/ui/`)
- `ConfirmationDialog` - Diálogo de confirmação
- `InputDefault` - Input padrão
- `InputPassword` - Input de senha
- `InputRadioGroup` - Grupo de radio buttons

## 🛣️ API Routes

### Autenticação (`/api/auth/`)
- `POST /login` - Login de usuário

### Usuários (`/api/users/`)
- `POST /` - Criação de usuário

### Produtos (`/api/products/`)
- `GET /all-available-for-sale` - Produtos disponíveis
- `GET /all-products-by-seller` - Produtos do vendedor
- `GET /all-products-sold-by-seller` - Produtos vendidos
- `GET /count-products-by-seller` - Contagem de produtos
- `GET /more-sold` - Produto mais vendido
- `GET /total-revenue-by-seller` - Receita total
- `POST /create-product` - Criar produto

### Carrinho (`/api/cart/`)
- `GET /` - Buscar carrinho
- `POST /add-item` - Adicionar item
- `PUT /items/[itemId]` - Atualizar item
- `DELETE /items/[itemId]` - Remover item
- `DELETE /clear` - Limpar carrinho

### Favoritos (`/api/favorites/`)
- `GET /` - Listar favoritos
- `POST /toggle` - Alternar favorito
- `DELETE /[productId]` - Remover favorito

### Pedidos (`/api/orders/`)
- `POST /create` - Criar pedido
- `GET /my-orders` - Meus pedidos
- `GET /[id]` - Detalhes do pedido

## 🎯 Funcionalidades

### Para Usuários
- ✅ Cadastro e login
- ✅ Visualizar produtos disponíveis
- ✅ Adicionar produtos ao carrinho
- ✅ Gerenciar carrinho (adicionar/remover/atualizar)
- ✅ Favoritar produtos
- ✅ Realizar pedidos
- ✅ Visualizar histórico de pedidos

### Para Vendedores
- ✅ Dashboard com métricas
- ✅ Criar e gerenciar produtos
- ✅ Visualizar produtos vendidos
- ✅ Analytics de vendas
- ✅ Upload de produtos via CSV

## 🔒 Autenticação

O sistema utiliza autenticação baseada em JWT:
- Token armazenado no localStorage
- Headers de autorização automáticos
- Monitoramento de expiração do token
- Redirecionamento automático para login


## 📄 Upload de CSV

O sistema permite que vendedores façam upload de produtos em lote através de arquivos CSV. Esta funcionalidade facilita a criação de múltiplos produtos de uma só vez.

### 📋 Formato do Arquivo CSV

O arquivo CSV deve seguir o formato abaixo com as seguintes colunas obrigatórias:

```csv
name,description,price,imageUrl,stock
Açaí Tradicional,Açaí 300ml,12.50,https://example.com/images/acai-tradicional.jpg,50
Açaí com Granola,Açaí 300ml + granola,15.00,https://example.com/images/acai-granola.jpg,30
Açaí Banana Split,Açaí 500ml com banana e chocolate,20.00,https://example.com/images/acai-banana.jpg,20
Açaí Morango,,18.00,,25
Açaí Chocolate,Açaí 500ml + chocolate,22.00,https://example.com/images/acai-chocolate.jpg,15
Açaí Nutella,Açaí 500ml + Nutella,25.00,https://example.com/images/acai-nutella.jpg,10
Açaí Kiwi,Açaí 300ml + kiwi,17.50,https://example.com/images/acai-kiwi.jpg,40
Açaí Mix Frutas,Açaí 300ml + frutas variadas,19.00,https://example.com/images/acai-mix-frutas.jpg,35
Açaí Doce de Leite,Açaí 300ml + doce de leite,21.00,https://example.com/images/acai-doce-leite.jpg,12
Açaí Paçoca,Açaí 300ml + paçoca,18.50,https://example.com/images/acai-pacoca.jpg,18
```

### 📝 Especificações das Colunas

| Coluna | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `name` | string | ✅ | Nome do produto (máximo 100 caracteres) |
| `description` | string | ❌ | Descrição detalhada do produto |
| `price` | number | ✅ | Preço do produto (formato decimal: 12.50) |
| `imageUrl` | string | ❌ | URL da imagem do produto |
| `stock` | number | ✅ | Quantidade em estoque (número inteiro) |

### ⚠️ Regras de Validação

- **Nome**: Obrigatório, não pode estar vazio
- **Preço**: Deve ser um número decimal positivo (ex: 12.50)
- **Estoque**: Deve ser um número inteiro não negativo (0 ou maior)
- **Descrição**: Opcional, pode estar vazia
- **Imagem**: Opcional, deve ser uma URL válida se fornecida

### 🚀 Como Usar

1. **Acesse a área do vendedor**
2. **Navegue até "Produtos" → "Novo Produto"**
3. **Clique em "Upload CSV"**
4. **Selecione seu arquivo CSV**
5. **Clique em "Enviar"**

### 📊 Exemplo de Uso

O arquivo `produtos.csv` fornecido contém um exemplo completo de produtos de açaí com diferentes variações, preços e estoques. Você pode usar este arquivo como base para criar seus próprios produtos:

### 🔧 Tratamento de Erros

O sistema valida cada linha do CSV e retorna:
- ✅ **Sucesso**: Produtos criados com sucesso
- ⚠️ **Avisos**: Linhas com problemas menores (ex: descrição vazia)
- ❌ **Erros**: Linhas com problemas críticos (ex: preço inválido)

### 💡 Dicas

- Use vírgulas como separadores decimais para preços
- Mantenha URLs de imagens válidas
- Verifique o estoque antes do upload
- Teste com poucos produtos primeiro

## 📊 Estado da Aplicação

- **React Query** para cache e sincronização de dados do servidor
- **Context API** para estado global de autenticação
- **Local Storage** para persistência de dados do usuário

## 🎨 Estilização

- **Tailwind CSS** para estilização utilitária
- **Componentes reutilizáveis** para consistência
- **Design responsivo** para mobile e desktop
- **Tema personalizado** com cores da marca

## 🚀 Deploy

O projeto está configurado para deploy em:
- **Vercel** (recomendado)
- **Netlify**
- **Railway**
- **Qualquer plataforma que suporte Next.js**

## 📝 Próximos Passos

- [ ] Implementar testes unitários
- [ ] Adicionar PWA
- [ ] Implementar notificações push
- [ ] Adicionar sistema de avaliações


