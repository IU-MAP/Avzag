import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.VUE_APP_GH_TOKEN });
const owner = "IU-MAP";
const repo = "avzag";

async function createBranch(name: string) {
  const store = await octokit.repos.getBranch({
    owner,
    repo,
    branch: "store",
  });
  await octokit.git.createRef({
    owner,
    repo,
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
      owner,
      repo,
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
  content = btoa(unescape(encodeURIComponent(content)));
  await createBranch(branch);
  const sha = await getFileSha(path);
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    content,
    message,
    branch,
    sha,
  });
  await octokit.pulls.create({
    owner,
    repo,
    title: message,
    head: branch,
    base: "store",
  });
}
