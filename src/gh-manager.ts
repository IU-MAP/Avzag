import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.VUE_APP_GH_TOKEN });
const owner = "IU-MAP";
const repo = "avzag";

async function createBranch() {
  const store = await octokit.repos.getBranch({
    owner,
    repo,
    branch: "store",
  });
  const branch = "store-editor-" + Date.now();
  await octokit.git.createRef({
    owner,
    repo,
    ref: "refs/heads/" + branch,
    sha: store.data.commit.sha,
  });
  return branch;
}

export async function pushToStore(
  content: string,
  path: string,
  message: string
) {
  content = btoa(unescape(encodeURIComponent(content)));
  const branch = await createBranch();
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    content,
    message,
    branch,
  });
  await octokit.pulls.create({
    owner,
    repo,
    title: message,
    head: branch,
    base: "store",
  });
}
