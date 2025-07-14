import path from "path";
import { ai } from "../config/gemini";
import { File } from "../types/File";
import fs from "fs";
import { fileURLToPath } from "url";

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

                1. # Nome do Projeto (com emoji)
                2. Descrição geral — para que serve, público-alvo, objetivo
                3. Tecnologias usadas — linguagens, frameworks, bibliotecas importantes
                4. Como instalar e rodar — passos para configurar localmente
                5. Estrutura do projeto — pastas e arquivos mais importantes resumidamente
                6. Como contribuir — orientações para colaboradores
                7. Licença — informe a licença utilizada, se houver
                8. Nota final — informe que o README foi gerado automaticamente pelo README.ai

                Use uma linguagem clara, profissional e objetiva. Evite detalhes técnicos muito específicos. Foque em facilitar o entendimento do projeto para novos desenvolvedores. Caso as informações não estejam explícitas, use inferência com base na análise dos arquivos.

                **IMPORTANTE**:  
                Sua resposta **deve conter apenas o conteúdo do arquivo README.md**, em **formato Markdown válido**. **Não adicione nenhuma explicação ou frase adicional fora do markdown.**

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

        const outputDir = path.resolve(process.cwd(), 'output');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        const outputPath = path.join(outputDir, 'README.md');
        fs.writeFileSync(outputPath, readme, 'utf8');

        console.log("🏁 README.md gerado com sucesso!\n");
    } catch (err) {
        console.error(`❌ Erro ao gerar README.md: ${err}\n`);
    }
}