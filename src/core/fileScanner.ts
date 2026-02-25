import { ai } from "../config/gemini";
import { File } from "../types/File";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function scanFiles(files: { name: string, content: string }[], retryCount = 0): Promise<File[]> {
    const MAX_RETRIES = 3;
    
    try {
        console.log(`🔍 Analisando lote de ${files.length} arquivos...`);

        const filesContext = files.map(f => `ARQUIVO: ${f.name}\nCONTEÚDO:\n${f.content}`).join("\n\n---\n\n");

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Você é um assistente de documentação. Analise os arquivos abaixo e forneça um resumo curto de cada um.
            Retorne OBRIGATORIAMENTE um JSON no formato: [{"name": "nome_do_arquivo", "abstract": "resumo"}]
            
            Arquivos:
            ${filesContext}`,
        });

        const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (rawText) {
            const results = JSON.parse(rawText.replace(/```json|```/g, ""));
            return results.map((res: any) => ({
                name: res.name,
                content: res.abstract
            }));
        }
        
        return [];
    } catch (err: any) {
        if (err.status === 429 && retryCount < MAX_RETRIES) {
            const waitTime = (retryCount + 1) * 30000;
            console.warn(`⚠️ Rate Limit atingido. Tentativa ${retryCount + 1} de ${MAX_RETRIES}. Aguardando ${waitTime/1000}s...`);
            await sleep(waitTime);
            return scanFiles(files, retryCount + 1);
        }

        console.error(`❌ Erro fatal no processamento do lote:`, err.message);
        return [];
    }
}