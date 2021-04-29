import { ref, toRaw, watch } from "vue";
import { Octokit } from "@octokit/rest";

export const lects = ref([] as string[]);
export const root =
  process.env.VUE_APP_STORE ??
  "https://raw.githubusercontent.com/alkaitagi/avzag/store/";

export const lastUpdated = ref({} as Record<string, number>);
watch(
  () => lastUpdated.value,
  () => (localStorage.lastUpdated = JSON.stringify(toRaw(lastUpdated.value))),
  { deep: true }
);

const octokit = new Octokit();
export async function isOutdated(path: string) {
  const commits = await octokit.repos.listCommits({
    owner: "IU-MAP",
    repo: "avzag",
    sha: "store",
    path: path,
  });
  const time = commits.data[0].commit.committer?.date;
  if (!time) return;
  const timestamp = new Date(time).getTime();
  console.log(root + path, time);
}

export async function loadJSON<T>(path: string, defaultValue?: T) {
  path += ".json";
  const response = await fetch(root + path);
  console.log(Array.from(response.headers.entries()));
  isOutdated(path);
  return await response
    .json()
    .then((j) => j as T)
    .catch(() => defaultValue as T);
}
export async function loadLectsJSON<T>(path: string, lects_?: string[]) {
  const files = {} as Record<string, T>;
  for (const lect of lects_ ?? lects.value) {
    const file = await loadJSON<T>(lect + "/" + path);
    if (file) files[lect] = file;
  }
  return files;
}
