import { fetchWithDelay } from "../fetchUtils";
import { getFirstMatchGroup } from "../utils";
import { IChoice, IGithubStat } from "./Interfaces";

async function getGitHubStats(x: IChoice) {
    if (x.githubPath) {
        let json;
        json = await fetchWithDelay(`https://api.github.com/repos/${x.githubPath}`).then(resp => resp.json());
        if (json.default_branch) {
            let readme = await fetchWithDelay(`https://raw.githubusercontent.com/${x.githubPath}/${json.default_branch}/README.md`).then(resp => resp.text());
            const regexes = [/\(https:\/\/www\.npmjs\.com\/package\/(.+?)\)/m,
                /\(http:\/\/npm\.im\/(.+?)\)/m,
                /https:\/\/www\.npmjs\.com\/package\/(.+?)\s/m];
            x.npmPath = getFirstMatchGroup(readme, regexes);
        }
        
        x.stargazers_count = json.stargazers_count;
        x.watchers_count = json.watchers_count;
        x.forks_count = json.forks_count;
        x.open_issues_count = json.open_issues_count;
        x.network_count = json.network_count;
        x.subscribers_count = json.subscribers_count;
        x.pushed_at = json.pushed_at;

    }
}


export async function updateComparisonList(choices: Array<IChoice>): Promise<Array<IGithubStat>> {
    
    return await Promise.all(choices.map(async (x) => {
        await getGitHubStats(x);

        if (x.npmPath) {
            let json2 = await fetchWithDelay(`https://api.npmjs.org/downloads/point/last-month/${x.npmPath}`).then(resp => resp.json());
            x.npmLastMonthDownloadCount = json2.downloads;
            json2 = await fetchWithDelay(`https://registry.npmjs.org/${x.npmPath}`).then(resp => resp.json());
            x.npmLastModifiedDateStr = json2.time.modified;
            if (!x.githubPath) {
                x.githubPath = getFirstMatchGroup(json2.repository.url, [/https:\/\/github.com\/(.+?)\.git/]);
                await getGitHubStats(x);
            }
        }
        return x as IGithubStat;
    }
    ));
}
