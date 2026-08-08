# Portefólio — claudia v.

Site de portefólio com filtros por categoria e secções organizadas (infantil,
familiar, editorial, branding...), com uma área reservada em `/admin` para
adicionar e remover trabalhos sem tocar em código.

## Como está organizado

- `app/page.tsx` — página principal (cabeçalho, hero, explorador de trabalhos, sobre/contacto)
- `components/PortfolioExplorer.tsx` — filtros no topo + secções por categoria com o marcador triangular
- `app/admin` — área reservada onde se adiciona/remove trabalhos (protegida por palavra-passe)
- `lib/seed-data.ts` — trabalhos de exemplo, usados só enquanto o Supabase não estiver ligado

Sem o Supabase configurado, o site funciona na mesma com os trabalhos de
exemplo (incluindo "o lobo à porta"), para poderes ver o design. Assim que
ligares o Supabase, os trabalhos reais substituem os exemplos automaticamente.

## 1. Criar o projeto Supabase

1. Cria uma conta gratuita em [supabase.com](https://supabase.com) e cria um novo projeto.
2. Em **Project Settings > API**, copia o `Project URL`, a `anon public key` e a `service_role key`.
3. Vai a **SQL Editor** e corre isto para criar a tabela de trabalhos:

```sql
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  categories text[] not null default '{}',
  image_url text not null,
  storage_path text,
  created_at timestamptz not null default now()
);

alter table projects enable row level security;

-- Qualquer pessoa pode ler os trabalhos (para o site público)
create policy "Leitura pública" on projects
  for select using (true);

-- Só o servidor (service role) pode escrever — é o que a área /admin usa
```

4. Vai a **Storage** e cria um bucket chamado `projects`, marcado como **público**
   (para as imagens carregarem no site).

## 2. Configurar as variáveis de ambiente

Copia `.env.local.example` para `.env.local` e preenche:

```bash
cp .env.local.example .env.local
```

- `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` — do passo 1
- `SUPABASE_SERVICE_ROLE_KEY` — do passo 1 (mantém isto em segredo, nunca vai para o browser)
- `ADMIN_PASSWORD` — a palavra-passe que a tua esposa vai usar para entrar em `/admin`

## 3. Correr localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para o site, e
[http://localhost:3000/admin](http://localhost:3000/admin) para adicionar trabalhos.

## 4. Como ela adiciona trabalhos

1. Entra em `/admin` com a palavra-passe definida em `ADMIN_PASSWORD`.
2. Preenche o título, descrição (opcional), categorias separadas por vírgula
   (ex: `infantil, editorial`) e escolhe a imagem.
3. Clica em "adicionar trabalho" — a imagem é enviada para o Supabase e aparece
   logo no site, na(s) secção(ões) da(s) categoria(s) escolhida(s).

Um trabalho pode pertencer a mais do que uma categoria (ex: "infantil,
familiar"), e aparece em cada secção correspondente.

## 5. Publicar o site (deploy)

O mais simples é usar a [Vercel](https://vercel.com):

1. Sobe este projeto para um repositório no GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importa o repositório.
3. Adiciona as mesmas variáveis de ambiente do `.env.local` nas definições do projeto na Vercel.
4. Deploy — a Vercel dá-te um URL público (podes depois ligar um domínio próprio).

## Identidade visual

As cores vêm diretamente do trabalho dela ("o lobo à porta"):

- terracota `#b23a1d`, verde-azulado `#17685a`, âmbar `#d9a441`, bordô `#7a2320`

Cada categoria fica sempre associada à mesma cor (ver `lib/palette.ts`), e o
marcador triangular (`.tri` em `app/globals.css`) é o elemento assinatura
usado em todo o site — no hero, nas secções e nos cards ao passar o rato.
