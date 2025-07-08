import { ai } from "../config/gemini";
import { File } from "../types/File";
import fs from "fs";

export async function generateReadme(abstracts: File[]) {

    const abstractsAnalysis = abstracts
        .map(({ name, content }) => `Arquivo: ${name}\nResumo: ${content}\n`)
        .join("\n");

    console.log(`\n💡 Analisando resumos dos arquivos\n`);

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
                Você é um assistente de documentação de software.

                Baseado nas informações e análises que você tem sobre o projeto, escreva um README.md completo e bem estruturado, com as seguintes seções:

                1. Título do projeto (com emoji)
                2. Descrição geral do projeto — para que serve, público-alvo, objetivo
                3. Tecnologias usadas — linguagens, frameworks, bibliotecas importantes
                4. Como instalar e rodar o projeto — passos para configurar localmente
                5. Estrutura geral do projeto — pastas e arquivos mais importantes resumidamente
                6. Como contribuir — dicas para quem quiser colaborar
                7. Licença — use MIT por padrão
                8. Nota final dizendo que o README foi gerado automaticamente por IA

                Use uma linguagem clara, profissional e objetiva. Evite detalhes técnicos muito específicos. Foque em facilitar o entendimento do projeto para novos desenvolvedores.

                **IMPORTANTE**:  
                Sua resposta **deve conter apenas o conteúdo do arquivo README.md**. **Não adicione nenhuma explicação ou frase adicional fora do markdown.**

                ---

                Aqui estão as análises dos arquivos do projeto:

                ${abstractsAnalysis}
            `,
        });

        const readme = response.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!readme) {
            console.warn(`\n⚠️ README.md gerado sem conteúdo\n`)

            return;
        }

        fs.writeFileSync("README.md", readme, "utf8");

        console.log("\n🏁 README.md gerado com sucesso!\n");
    } catch (err) {
        console.error(`\n❌ Erro ao gerar README.md: ${err}\n`);
    }
}