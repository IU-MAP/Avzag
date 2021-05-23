import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.VUE_APP_GH_TOKEN });
const args = {
  owner: "alkaitagi",
  repo: "avzag",
};

async function createBranch(name: string) {
  const store = await octokit.repos.getBranch({
    ...args,
    branch: "store",
  });
  await octokit.git.createRef({
    ...args,
    ref: "refs/heads/" + name,
    sha: store.data.commit.sha,
  });
}

async function getFileSha(path: string) {
  const parts = path.split("/");
  const folders = parts.slice(0, -1).join("/");
  const file = parts[parts.length - 1];

  const tree = await octokit.git
    .getTree({
      ...args,
      tree_sha: "store:" + folders,
    })
    .catch(() => undefined);
  return tree?.data?.tree?.find((t) => t?.path === file)?.sha;
}

export async function pushToStore(
  content: string,
  path: string,
  message: string,
  branch: string
) {
  content = btoa(unescape(encodeURIComponent(content + "\n")));
  branch = encodeURI(branch + "/" + Date.now());
  await createBranch(branch);
  const sha = await getFileSha(path);
  await octokit.repos.createOrUpdateFileContents({
    ...args,
    path,
    content,
    message,
    branch,
    sha,
  });
  await octokit.pulls.create({
    ...args,
    title: message,
    head: branch,
    base: "store",
  });
}

export async function lastCommitTime(path: string) {
  const commits = await octokit.repos.listCommits({
    ...args,
    sha: "store",
    path: path,
    per_page: 1,
  });
  const time = commits.data[0]?.commit.committer?.date;
  return new Date(time ?? 0).getTime();
}
