export interface IGithubStat {
    githubPath: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    network_count: number;
    subscribers_count: number;
    pushed_at: string;
}export interface IChoice extends IGithubStat {
    name: string;
    npmPath: string;
    npmLastMonthDownloadCount: number;
    npmLastModifiedDateStr: string;
    [key: string]: any;
}

