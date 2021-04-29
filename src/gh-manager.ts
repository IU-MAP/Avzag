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

export async function pushToStore(
  content: string,
  path: string,
  message: string,
  branch: string
) {
  content = btoa(unescape(encodeURIComponent(content)));
  await createBranch(branch);
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
