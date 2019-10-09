const fs = require("fs");
const { App } = require("@octokit/app");
const Octokit = require("@octokit/rest");

const config = {
  id: process.env.APP_ID,
  privateKey: fs.readFileSync(process.env.PRIVATE_KEY_FILE, "utf8"),
  installationId: process.env.INSTALLATION_ID,
  version: process.env.VERSION,
  commit: process.env.COMMIT_SHA
};

const app = new App({
  id: config.id,
  privateKey: config.privateKey
});

const octokit = new Octokit({
 async auth() {
   const installationAccessToken = await app.getInstallationAccessToken({
     installationId: config.installationId
   });
   
   return `token ${installationAccessToken}`;
 }
});

(async () => {
  const releases = await octokit.repos.listReleases({
    owner: "vhs",
    repo: "nomos",
    per_page: 1,
    page: 1
  });

  let last = null;
  
  if (releases && releases.length >= 1) {
    last = releases[0].;
  }

  octokit.repos.createRelease({
    owner: "vhs",
    repo: "nomos",
    tag_name: config.version,
    name: config.version,
    target_commitish: config.commit,
    body: "",
    draft: false,
    prerelease: false
  });
})();

