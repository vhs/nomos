const { App } = require("@octokit/app");
const Octokit = require("@octokit/rest");

const config = {
  id: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY,
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

octokit.repos.createRelease({
  owner: "vhs",
  repo: "nomos",
  tag_name: config.version,
  target_commitish: config.commit
});
