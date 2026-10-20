````md
# 🌤️ Simple Weather App

🇧🇷 Português | 🇺🇸 English

---

# 🇧🇷 Português

Uma aplicação de previsão do tempo desenvolvida como projeto de estudo, com foco em praticar integração com APIs, gerenciamento de estado assíncrono e organização de aplicações frontend.

## 📸 Screenshots

### 🌤️ Previsão do tempo

<p align="center">
  <img src="./screenshots/forecast(iPhone%2016%20Pro%20Max).png" width="300" alt="Tela principal com previsão do tempo" />
</p>

A tela principal apresenta as condições atuais, previsão horária e previsão para os próximos dias, utilizando um background adaptado às condições meteorológicas.

### 🔎 Busca de localidades

<p align="center">
  <img src="./screenshots/search(iPhone%2016%20Pro%20Max).png" width="300" alt="Tela de busca de localidades" />
</p>

Permite pesquisar localidades e visualizar resultados, além de manter um histórico de buscas recentes.

### 📍 Seleção de localização

<p align="center">
  <img src="./screenshots/permission(iPhone%2016%20Pro%20Max).png" width="300" alt="Tela de seleção de localização" />
</p>

O usuário pode utilizar sua localização atual ou pesquisar manualmente uma cidade.

### 📴 Estado offline

<p align="center">
  <img src="./screenshots/offline(iPhone%2016%20Pro%20Max).png" width="300" alt="Tela exibida quando o usuário está offline" />
</p>

A aplicação possui um estado específico para situações em que não há conexão com a internet.

### 👋 Tela inicial

<p align="center">
  <img src="./screenshots/start(iPhone%2016%20Pro%20Max).png" width="300" alt="Tela inicial do aplicativo" />
</p>

Tela de apresentação inicial do aplicativo antes da seleção da localização.

## 🚀 Funcionalidades

- 🔎 **Busca de Localidades:** pesquisa de localidades do mundo inteiro.
- 📍 **Localização Atual:** possibilidade de utilizar a localização do dispositivo.
- 🌡️ **Condições Atuais:** exibição da temperatura atual, máximas, mínimas e sensação térmica.
- 🕒 **Previsão Horária:** linha do tempo mostrando as variações do clima ao longo das próximas horas.
- 📅 **Previsão Estendida:** previsão de temperatura e condições meteorológicas para os próximos dias.
- 📴 **Tratamento de Offline:** estado específico para quando não há conexão disponível.
- 🕘 **Histórico de Busca:** armazenamento das localidades pesquisadas anteriormente.
- 🎨 **Background Dinâmico:** a interface se adapta às condições meteorológicas apresentadas.

## 🧠 Dificuldades e Aprendizados

No início do projeto, eu tinha pouca experiência em estruturar a arquitetura de uma aplicação e também encontrava dificuldades para trabalhar com integrações de APIs. Isso tornou o começo do desenvolvimento mais difícil do que eu esperava.

Ao longo do projeto, fui entendendo melhor como organizar uma aplicação, trabalhar com dados vindos de APIs e transformar requisitos em funcionalidades concretas.

Hoje, olhando para o código, consigo identificar vários pontos que faria de uma maneira diferente. Considero isso uma das partes mais importantes do projeto: ele me mostrou não apenas o que aprendi, mas também o que ainda posso melhorar.

Pretendo levar esses aprendizados para os próximos projetos, buscando construir aplicações cada vez mais organizadas e tomar decisões técnicas melhores durante o desenvolvimento.

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura baseada em features, separando responsabilidades entre componentes, gerenciamento de estado, integração com APIs e transformação dos dados.

Um dos principais objetivos dessa organização foi evitar que a lógica de consumo da API e transformação dos dados ficasse diretamente acoplada à interface.

A aplicação também utiliza uma camada de adaptação para transformar os dados recebidos da API em um modelo utilizado pela aplicação, mantendo a interface independente do formato original da resposta.

## 🛠️ Tecnologias

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Zustand**
- **React Router**
- **Open-Meteo API**
- **Vitest**
- **MSW**
- **Oxlint**
- **npm**

## 🧪 Testes

Os testes foram desenvolvidos utilizando **Vitest** e **MSW (Mock Service Worker)** para simular as respostas da API e testar diferentes cenários da aplicação sem depender diretamente da API externa.

Para executar os testes:

```bash
npm run test
```
````

## ⚙️ Como executar

### Pré-requisitos

- Node.js
- npm

### Instalação

Clone o repositório e instale as dependências:

```bash
git clone <repository-url>
cd weather-app
npm install
```

### Desenvolvimento

Inicie o servidor de desenvolvimento do Vite:

```bash
npm run dev
```

A aplicação estará disponível no endereço exibido pelo Vite no terminal.

### Lint

O projeto utiliza **Oxlint** para análise estática do código:

```bash
npm run lint
```

---

# 🇺🇸 English

A weather application developed as a study project, focused on practicing API integration, asynchronous state management, and frontend application organization.

## 📸 Screenshots

### 🌤️ Weather Forecast

<p align="center">
  <img
    src="./screenshots/forecast.png"
    width="300"
    alt="Main weather forecast screen"
  />
</p>

### 🔎 Location Search

<p align="center">
  <img
    src="./screenshots/search.png"
    width="300"
    alt="Location search screen"
  />
</p>

### 📍 Location Selection

<p align="center">
  <img
    src="./screenshots/permission.png"
    width="300"
    alt="Location selection screen"
  />
</p>

### 📴 Offline State

<p align="center">
  <img
    src="./screenshots/offline.png"
    width="300"
    alt="Offline state screen"
  />
</p>

### 👋 Welcome Screen

<p align="center">
  <img
    src="./screenshots/start.png"
    width="300"
    alt="Application welcome screen"
  />
</p>

## 🚀 Features

- 🔎 **Location Search:** search for locations around the world.
- 📍 **Current Location:** use the device's current location.
- 🌡️ **Current Conditions:** display current temperature, highs, lows, and feels-like temperature.
- 🕒 **Hourly Forecast:** a timeline showing weather changes throughout the upcoming hours.
- 📅 **Extended Forecast:** temperature and weather conditions for the upcoming days.
- 📴 **Offline Handling:** a dedicated state for when there is no internet connection.
- 🕘 **Search History:** keeps track of previously searched locations.
- 🎨 **Dynamic Background:** the interface adapts to the displayed weather conditions.

## 🧠 Challenges & Learnings

At the beginning of the project, I had little experience with application architecture and also struggled with API integration. This made the early stages of development more difficult than I expected.

Throughout the project, however, I gained a much better understanding of how to structure an application, work with data from APIs, and turn project requirements into actual features.

Looking back at the code today, I can see many things I would approach differently. I consider this one of the most valuable parts of the project: it showed me not only what I have learned, but also what I still need to improve.

I plan to take these lessons into my next projects and continue improving both my technical decisions and the way I structure and develop applications.

## 🏗️ Architecture

The project uses a feature-based architecture, separating responsibilities between components, state management, API integration, and data transformation.

One of the main goals of this structure was to avoid tightly coupling API logic and data transformation with the user interface.

The application also uses an adapter layer to transform API responses into a model used by the application, keeping the interface independent from the original API response format.

## 🛠️ Technologies

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Zustand**
- **React Router**
- **Open-Meteo API**
- **Vitest**
- **MSW**
- **Oxlint**
- **npm**

## 🧪 Testing

Tests were developed using **Vitest** and **MSW (Mock Service Worker)** to simulate API responses and test different application scenarios without directly depending on the external API.

To run the tests:

```bash
npm run test
```

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd weather-app
npm install
```

### Development

Start the Vite development server:

```bash
npm run dev
```

The application will be available at the address displayed by Vite in the terminal.

### Lint

The project uses **Oxlint** for static code analysis:

```bash
npm run lint
```

````

### Uma observação importante

Eu deixaria o **link da demo fora por enquanto**, já que você ainda não me passou a URL. Quando publicar, podemos colocar logo abaixo da descrição:

```md
🔗 [Live Demo](https://...)
````

E eu faria mais uma pequena alteração antes de considerar esse README **100% final**: conferir seu `package.json` para validar se os scripts são realmente `npm run test` e `npm run lint`. O lockfile confirma Vitest, MSW e Oxlint instalados, mas não confirma os nomes dos scripts. Isso evita colocar um comando no README que depois não funciona.
