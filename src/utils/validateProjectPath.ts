import { validateGitRepo } from "./validateGitRepo";

export function valiteProjectPath(projectPath: string): boolean {
    const localPathRegex = /^([a-zA-Z]:\\|\/)?([\w\s.-]+(\\|\/)?)+$/;

    if (!localPathRegex.test(projectPath)) {
        return false;
    }

    if (!validateGitRepo(projectPath)) {
        return false;
    }

    return true;
}