# 🤖 README.ai

![{07DC0216-FF06-4CE1-A0E6-4A94706ABFE0}](https://github.com/user-attachments/assets/9aa90051-be25-4d26-af3a-bd9c2d2185e9)

## 📋 Descrição Geral do Projeto

`README.ai` é uma **ferramenta de linha de comando (CLI)** que automatiza a **geração de arquivos `README.md`** para projetos de software. Utilizando **Inteligência Artificial Generativa (Google Gemini)**, ela analisa a estrutura e o conteúdo dos arquivos de um projeto para criar um README completo e bem estruturado.

O objetivo principal desta ferramenta é **eliminar o trabalho manual e repetitivo** de criar e manter a documentação inicial de projetos, garantindo que os `README.md`s estejam sempre **atualizados, padronizados e de alta qualidade**. `README.ai` acelera o processo de `onboarding` de novos desenvolvedores, aumenta a produtividade e facilita a compreensão e colaboração em qualquer base de código. É ideal para desenvolvedores que buscam agilidade e eficiência na documentação de seus projetos.

## 🛠️ Tecnologias Usadas

O projeto `README.ai` foi desenvolvido utilizando as seguintes tecnologias principais:

*   **TypeScript**: Linguagem de programação que adiciona tipagem estática ao JavaScript.
*   **Node.js**: Ambiente de execução JavaScript do lado do servidor.
*   **Google Gemini API (`@google/genai`)**: Utilizada para interação com os modelos de Inteligência Artificial Generativa do Google, responsável pela criação do conteúdo do README.
*   **Enquirer**: Biblioteca para criação de interfaces de linha de comando interativas e amigáveis, usada para coletar informações do usuário.
*   **tsx**: Runner para executar arquivos TypeScript diretamente, sem a necessidade de compilação prévia.

## 🚀 Como Instalar e Rodar o Projeto

Para configurar e executar o `README.ai` em seu ambiente local, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Bruno2202/readme-ai.git
    cd readme-ai
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure a chave da API Google Gemini:**
    O projeto utiliza a API do Google Gemini. Você precisará de uma chave de API válida.
    *   Crie um arquivo `.env` na raiz do projeto.
    *   Adicione sua chave de API nele, conforme o exemplo:
        ```
        GEMINI_API_KEY=SUA_CHAVE_DE_API_DO_GEMINI
        ```
    *   Você pode obter uma chave de API seguindo as instruções na [documentação do Google AI Studio](https://ai.google.dev/gemini-api/docs/get-started/node).

4.  **Execute o projeto:**
    Você pode iniciar a ferramenta em modo de desenvolvimento (com `hot-reload`) ou em modo de produção:

    *   **Modo de Desenvolvimento:**
        ```bash
        npm run dev
        ```
    *   **Modo de Produção:**
        ```bash
        npm start
        ```

    Após executar, a ferramenta iniciará uma interface de linha de comando interativa para guiá-lo na geração do README.

## 🗂️ Estrutura Geral do Projeto

A estrutura de diretórios do `README.ai` é organizada de forma modular para facilitar o desenvolvimento e a manutenção:

```
.
├── src/
│   ├── config/              # Configurações globais (ex: chaves de API, regras de arquivos)
│   │   ├── files.ts         # Regras de inclusão/exclusão de arquivos
│   │   └── gemini.ts        # Configuração e inicialização do cliente Google Gemini AI
│   ├── core/                # Módulos principais de lógica de negócio
│   │   ├── fileReader.ts    # Leitura e varredura recursiva de arquivos
│   │   ├── fileScanner.ts   # Resumo e análise de arquivos usando IA
│   │   └── main.ts          # Ponto de entrada principal e orquestrador do fluxo da aplicação
│   ├── readme/              # Lógica relacionada à geração do README
│   │   └── readmeGenerator.ts # Função para gerar o arquivo README.md final usando IA
│   └── types/               # Definições de tipos TypeScript
│       └── File.ts          # Interface para representar objetos de arquivo
├── package.json             # Metadados do projeto e gerenciamento de dependências
├── package-lock.json        # Registro exato das versões das dependências
├── tsconfig.json            # Configurações do compilador TypeScript
└── README.md                # Este arquivo
```

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Se você deseja colaborar com o projeto `README.ai`, siga estas diretrizes:

1.  **Fork** o repositório.
2.  **Clone** o seu fork localmente: `git clone https://github.com/seu-usuario/README.ai.git`
3.  Crie uma nova **branch** para suas alterações: `git checkout -b feature/minha-nova-funcionalidade` ou `bugfix/correcao-de-erro`.
4.  Faça suas **alterações** e escreva **commits claros e descritivos**.
5.  Envie suas alterações para o seu fork: `git push origin feature/minha-nova-funcionalidade`
6.  Abra um **Pull Request (PR)** para a branch `main` do repositório original.

Certifique-se de que seu código siga as práticas de codificação existentes e inclua testes, se aplicável.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

---

*Este README foi gerado automaticamente pelo README.ai.*