const fs = require("fs");
const jwt = require("jsonwebtoken");
const rp = require("request-promise");
const zlib = require("zlib");

// const appId = process.env["GH_APP_ID"];
// const appClientId = process.env["GH_APP_CLIENT_ID"];
// const appClientSecret = process.env["GH_APP_CLIENT_SECRET"];
// const appCallbackUrl = process.env["GH_APP_AUTH_CALLBACK_URL"];
//

async function auth(installationId, appId, pemPath) {
  // const pem = fs.readFileSync(pemPath(), "utf-8");
  const iat = ~~(new Date().getTime() / 1000) - 5;
  const exp = iat + 60 * 8;
  const payload = {
    iss: appId,
    iat,
    exp,
  };
  const token = jwt.sign(payload, fs.readFileSync(pemPath, "utf-8"),  { algorithm: "RS256" });
  const options = {
    method: "POST",
    headers: {
      "User-Agent": "gh-app-token",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github.machine-man-preview+json",
    },
    body: {},
    url: `https://api.github.com/installations/${installationId}/access_tokens`,
    json: true,
  };
  return rp(options).then(body => {
    return body["token"];
  });
}

module.exports = {
  auth,
}

// export function authWidhCode({ code }: { code: string }) {
//   const options = {
//     url: "https://github.com/login/oauth/access_token",
//     method: "POST",
//     headers: {
//       "User-Agent": "simple-gh-pr-app-example",
//     },
//     body: {
//       code,
//       client_id: appClientId,
//       client_secret: appClientSecret,
//       redirect_url: appCallbackUrl,
//     },
//     json: true,
//   } as rp.OptionsWithUrl;
//   return rp(options).then(x => {
//     const token = x.access_token;
//     const error = x.error;
//     return { token, error };
//   });
// }
