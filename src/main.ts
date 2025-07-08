import path from 'path';
import { readFiles } from './core/fileReader';
import { scanFile } from './core/fileScanner';
import { generateReadme } from './readme/readmeGenerator';
import { File } from "./types/File";
import Enquirer from 'enquirer';

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
                { name: '3', message: 'Sair' }
            ]
        });

        const option = (optionResponse as { option: string }).option;

        switch (option) {
            case '1': {
                const response = await enquirer.prompt({
                    type: 'input',
                    name: 'dir',
                    message: 'Informe o diretório do projeto:'
                }) as { dir: string };

                const dirInput = response.dir.trim();

                if (!dirInput) {
                    console.warn("\n❔ Diretório não informado.");
                    await enquirer.prompt({ type: 'confirm', name: 'cont', message: 'Pressione Enter para voltar ao menu...' });
                } else {
                    projectDir = path.resolve(dirInput.normalize('NFC')).replace(/\\/g, '/');
                    console.log(`\n📁 Diretório definido como: ${projectDir}\n`);
                    await enquirer.prompt({ type: 'confirm', name: 'cont', message: 'Pressione Enter para voltar ao menu...' });
                }
                break;
            }

            case '2': {
                if (!projectDir.trim()) {
                    console.warn("\n⚠️ Você precisa informar o diretório primeiro (opção 1).");
                    await enquirer.prompt({ type: 'confirm', name: 'cont', message: 'Pressione Enter para voltar ao menu...' });
                } else {
                    console.log(`\n🛠️ Gerando README para: ${projectDir}\n`);

                    const files = readFiles(projectDir);
                    const abstracts: File[] = [];

                    for (const file of files) {
                        const abstract = await scanFile(file.name, file.content);
                        abstracts.push(abstract);

                        await new Promise(resolve => setTimeout(resolve, 3500));
                    }

                    await generateReadme(abstracts);

                    await enquirer.prompt({ type: 'confirm', name: 'cont', message: 'Pressione Enter para voltar ao menu...' });
                }
                break;
            }

            case '3':
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
