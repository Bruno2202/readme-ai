import { readFiles } from './core/fileReader';
import { scanFiles } from './core/fileScanner';
import { generateReadme } from './readme/readmeGenerator';
import { File } from "./types/File";
import Enquirer from 'enquirer';
import { validateGitRepo } from './utils/validateGitRepo';
import { gitClone } from './core/gitCloner';
import { validateLocalPath } from './utils/validateLocalPath';

async function main() {
    const enquirer = new Enquirer();

    const banner = `
██████  ███████  █████  ██████  ███    ███ ███████     █████  ██ 
██   ██ ██      ██   ██ ██   ██ ████  ████ ██         ██   ██    
██████  █████   ███████ ██   ██ ██ ████ ██ █████      ███████ ██ 
██   ██ ██      ██   ██ ██   ██ ██  ██  ██ ██         ██   ██ ██ 
██   ██ ███████ ██   ██ ██████  ██      ██ ███████ ██ ██   ██ ██
                             README.ai
`;

    let running = true;
    let projectDir = "";
    let customPrompt = "";

    while (running) {
        console.clear();
        console.log(banner);

        const optionResponse = await enquirer.prompt({
            type: 'select',
            name: 'option',
            message: 'Escolha uma opção',
            choices: [
                { name: '1', message: 'Informar diretório do projeto' },
                { name: '2', message: 'Gerar README' },
                { name: '3', message: 'Definir prompt personalizado' },
                { name: '4', message: 'Sair' }
            ]
        });

        const option = (optionResponse as { option: string }).option;

        switch (option) {
            case '1': {
                const response = await enquirer.prompt({
                    type: 'input',
                    name: 'dir',
                    message: 'Informe a URL do repositório no GitHub ou o caminho do diretório local do projeto:'
                }) as { dir: string };

                const dirInput = response.dir.trim();

                if (!dirInput) {
                    console.warn("\n❔ Diretório não informado.\n");
                    await enquirer.prompt({ type: 'confirm', name: 'cont', message: 'Pressione Enter para voltar ao menu...' });
                } else if (!validateGitRepo(dirInput) && !validateLocalPath(dirInput)) {
                    console.warn("\n❌ Caminho ou repositório inválido.\n");
                    await enquirer.prompt({ type: 'confirm', name: 'cont', message: 'Pressione Enter para voltar ao menu...' });
                } else {
                    projectDir = dirInput;
                    console.log(`\n📁 Diretório definido como: ${projectDir}\n`);
                    await enquirer.prompt({ type: 'confirm', name: 'cont', message: 'Pressione Enter para voltar ao menu...' });
                }

                break;
            }

            case '2': {
                if (!projectDir.trim()) {
                    console.warn("\n⚠️ Você precisa informar o diretório primeiro (opção 1).\n");
                    await enquirer.prompt({ type: 'confirm', name: 'cont', message: 'Pressione Enter para voltar ao menu...' });
                } else {
                    const isGitRepo = validateGitRepo(projectDir);

                    if (isGitRepo) {
                        const newProjectDir = await gitClone(projectDir);

                        if (!newProjectDir) {
                            await enquirer.prompt({ type: 'confirm', name: 'cont', message: 'Pressione Enter para voltar ao menu...' });
                            return;
                        }

                        projectDir = newProjectDir;
                    }

                    console.log(`\n🛠️ Gerando README para: ${projectDir}\n`);

                    const files = readFiles(projectDir);
                    const abstracts: File[] = [];

                    const BATCH_SIZE = 10;

                    for (let i = 0; i < files.length; i += BATCH_SIZE) {
                        const batch = files.slice(i, i + BATCH_SIZE);

                        const batchResults = await scanFiles(batch);

                        if (batchResults.length === 0) {
                            console.log("⚠️ Falha no lote ou limite atingido. Tentando respirar mais tempo...");
                            await new Promise(resolve => setTimeout(resolve, 20000));
                            i -= BATCH_SIZE;
                            continue;
                        }

                        abstracts.push(...batchResults);

                        if (i + BATCH_SIZE < files.length) {
                            console.log("⏳ Respeitando cota da API (10s)...");
                            await new Promise(resolve => setTimeout(resolve, 10000));
                        }
                    }

                    await generateReadme(abstracts, customPrompt);

                    await enquirer.prompt({ type: 'confirm', name: 'cont', message: 'Pressione Enter para voltar ao menu...' });
                }
                break;
            }

            case '3': {
                const response = await enquirer.prompt({
                    type: 'input',
                    name: 'prompt',
                    message: 'Defina um prompt personalizado para gerar o seu README.me: '
                }) as { prompt: string };

                customPrompt = response.prompt.trim();

                if (!customPrompt) {
                    console.warn("\n❔ Prompt não informado.\n");
                    await enquirer.prompt({ type: 'confirm', name: 'cont', message: 'Pressione Enter para voltar ao menu...' });
                } else {
                    console.log(`\n✅ Prompt salvo com sucesso! O próximo README.me gerado será com base nele\n`);
                    await enquirer.prompt({ type: 'confirm', name: 'cont', message: 'Pressione Enter para voltar ao menu...' });
                }

                break;
            }

            case '4':
                console.log("\n👋 Saindo... Obrigado por usar o README.ai!");
                running = false;
                break;

            default:
                console.warn("\n❌ Opção inválida. Tente novamente.");
                await enquirer.prompt({ type: 'confirm', name: 'cont', message: 'Pressione Enter para voltar ao menu...' });
                break;
        }
    }
}

main();
