import path from "path";
import fs from "fs";
import simpleGit from "simple-git";

export async function gitClone(repoLink: string): Promise<string | null> {
    const git = simpleGit();

    const repoPath = path.resolve(process.cwd(), 'repo');

    try {
        console.log(`\n🔄️ Clonando repositório`);

        if (fs.existsSync(repoPath)) {
            fs.rmSync(repoPath, { recursive: true, force: true });
        }

        fs.mkdirSync(path.dirname(repoPath), { recursive: true });

        await git.clone(repoLink, repoPath);

        console.log(`✅ Repositório clonado com sucesso em: ${repoPath}`);
        return repoPath;
    } catch (err) {
        console.warn(`\n❌ Erro ao clonar repositório: ${err}`);
        return null;
    }
}
