# README-AI: Gerador de README.md com IA 🤖

Este projeto é uma ferramenta de linha de comando (CLI) inovadora que revoluciona o processo de documentação de projetos de software. Utilizando o poder da Inteligência Artificial Generativa (Google Gemini), o README-AI analisa o código-fonte e a estrutura de um projeto para gerar automaticamente um arquivo `README.md` completo, informativo e bem estruturado.

**Para que serve:** Eliminar o trabalho manual e repetitivo de criar e manter `README.md`s, garantindo que a documentação esteja sempre atualizada e padronizada.

**Público-alvo:** Desenvolvedores, equipes de engenharia e qualquer pessoa que precise documentar seus projetos de software de forma eficiente e profissional.

**Objetivo:** Acelerar o processo de onboarding em novos projetos, aumentar a produtividade dos desenvolvedores e facilitar a compreensão e a colaboração em qualquer base de código.

## 💻 Tecnologias Usadas

O projeto `README-AI` foi construído com as seguintes tecnologias e bibliotecas chave:

*   **Node.js**: Plataforma de execução JavaScript.
*   **TypeScript**: Linguagem de programação que adiciona tipagem estática ao JavaScript, melhorando a robustez e manutenibilidade do código.
*   **Google GenAI (`@google/genai`)**: Biblioteca oficial para interagir com os modelos de Inteligência Artificial da Google Gemini.
*   **Enquirer**: Biblioteca para criar interfaces de linha de comando interativas e amigáveis.
*   **@dotenvx/dotenvx**: Para gerenciar variáveis de ambiente de forma segura.
*   **tsx**: Ferramenta para executar arquivos TypeScript diretamente sem compilação prévia, ideal para o desenvolvimento.

## 🚀 Como Instalar e Rodar o Projeto

Siga os passos abaixo para configurar e executar o README-AI localmente:

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/en/download) e o `npm` (gerenciador de pacotes do Node.js) instalados em sua máquina.

### Configuração da Chave da API Gemini

Este projeto utiliza a API Google Gemini. Você precisará de uma chave de API válida:

1.  Obtenha uma chave de API Google Gemini através do [Google AI Studio](https://ai.google.dev/).
2.  Crie um arquivo `.env` na raiz do projeto (na mesma pasta onde está `package.json`).
3.  Adicione sua chave de API a este arquivo no seguinte formato:
    ```dotenv
    GEMINI_API_KEY=SUA_CHAVE_AQUI
    ```
    Substitua `SUA_CHAVE_AQUI` pela chave que você obteve.

### Instalação

1.  Clone este repositório:
    ```bash
    git clone https://github.com/Bruno2202/readme-ai.git
    cd readme-ai
    ```
2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```

### Rodando o Projeto

Para iniciar o gerador de README:

*   **Modo de Desenvolvimento (com monitoramento de arquivos):**
    ```bash
    npm run dev
    ```
*   **Modo de Produção (execução direta):**
    ```bash
    npm start
    ```

Após executar, o README-AI o guiará através de um menu interativo no terminal, onde você poderá informar o diretório do seu projeto e iniciar a geração do `README.md`.

## 📂 Estrutura Geral do Projeto

A estrutura do projeto é organizada para facilitar a modularidade e a clareza das responsabilidades:

```
.
├── src/
│   ├── config/
│   │   └── gemini.ts             # Configuração e inicialização do cliente Google Gemini API.
│   ├── core/
│   │   ├── fileReader.ts         # Lê recursivamente arquivos do projeto, filtrando irrelevantes.
│   │   └── fileScanner.ts        # Analisa o conteúdo de um arquivo usando IA (Google Gemini) para gerar um resumo.
│   ├── readme/
│   │   └── readmeGenerator.ts    # Orquestra a geração do README.md final com base nos resumos de IA.
│   ├── types/
│   │   └── File.ts               # Define a interface para objetos de arquivo (`name`, `content`).
│   └── main.ts                   # Ponto de entrada principal da aplicação, orquestra o fluxo e a CLI.
├── package.json                  # Define metadados do projeto, dependências e scripts.
├── package-lock.json             # Garante a reprodutibilidade das instalações de dependências.
├── tsconfig.json                 # Configurações do compilador TypeScript.
└── .env.example                  # Exemplo de arquivo de variáveis de ambiente (para GEMINI_API_KEY).
```

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Se você deseja colaborar com o projeto, siga estas diretrizes:

1.  **Fork** o repositório.
2.  Crie uma nova **branch** para sua funcionalidade ou correção de bug (`git checkout -b feature/minha-funcionalidade`).
3.  Faça suas alterações e **commit**-as (`git commit -m 'feat: Adiciona nova funcionalidade X'`).
4.  Faça **push** para a sua branch (`git push origin feature/minha-funcionalidade`).
5.  Abra um **Pull Request** para a branch `main` do repositório original.

Certifique-se de que seu código esteja em conformidade com as práticas de código existentes e que todos os testes passem (se houver). Descreva suas alterações de forma clara no Pull Request.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Para mais detalhes, consulte o arquivo `LICENSE` na raiz do repositório (não incluído aqui, mas padrão para projetos MIT).

---

*Este README.md foi gerado automaticamente pelo README.ai.*