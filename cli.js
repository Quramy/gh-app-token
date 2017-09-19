#!/usr/bin/env node
const { auth } = require("./auth");
const minimist = require("minimist");

async function main() {
  const argv = minimist(process.argv.slice(2), {
    alias: {
      "i": "installationId",
      "a": "appId",
      "p": "pem",
    },
  });
  const { appId, pem, installationId } = argv;
  if (!appId || !installationId || !pem) {
    console.warn(`Usage ${process.argv[1]} --appId <your_app_id> --installationId <installation_id> --pem <path_to_pem_file>`);
    return;
  }
  const token = await auth(installationId, appId, pem);
  console.log(token);
  return;
}

main()
  .then(() => process.exit(0))
  .catch(x => {
    if (x) console.error(x);
    process.exit(1);
  })
;
