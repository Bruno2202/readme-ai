export function validateGitRepo(link: string): boolean {
    const regex = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+(?:\.git)?\/?$/;
    const isGitRepo = regex.test(link);

    return isGitRepo;
}