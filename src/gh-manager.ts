import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.VUE_APP_GH_TOKEN });

function getDate() {
  const date = new Date();
  const components = [
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  ];
  return components.join(".");
}

async function createBranch() {
  const store = await octokit.repos.getBranch({
    owner: "IU-MAP",
    repo: "avzag",
    branch: "store",
  });
  await octokit.git.createRef({
    owner: "IU-MAP",
    repo: "avzag",
    ref: "refs/heads/store-editor-" + getDate(),
    sha: store.data.commit.sha,
  });
}

export async function pushToStore(
  content: string,
  path: string,
  message: string
) {
  content = btoa(unescape(encodeURIComponent(content)));
  await createBranch();
  await octokit.repos.createOrUpdateFileContents({
    owner: "IU-MAP",
    repo: "avzag",
    path,
    content,
    message,
    branch: "store-test-GH-PR",
  });
}
