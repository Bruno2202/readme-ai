import { ai } from "../config/gemini";
import { File } from "../types/File";

export async function scanFile(name: string, content: string): Promise<File> {
    try {
        console.log(`🔍 Analisando o arquivo: ${name}`);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Você é um assistente de documentação. Analise o arquivo ${name} e diga de forma resumida o que ele faz e sua importância no projeto:\n\n${content}`,
        });

        const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

        const abstract: File = {
            name,
            content: ""
        }

        if (text) {
            abstract.content = text;
            return abstract;
        } else {
            console.warn(`⚠️ Nenhuma resposta válida para ${name}`);
            return abstract;
        }
    } catch (err) {
        console.error(`❌ Erro ao gerar conteúdo para ${name}:`, err);

        const abstract: File = {
            name,
            content: ""
        }

        return abstract;
    }
}