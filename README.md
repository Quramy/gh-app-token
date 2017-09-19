# gh-app-token

Get and display API token for GitHub Apps.

## Usage
### CLI

```sh
npx gh-app-token --appId <your_app_id> --installationId <installation_id> --pem <path_to_pem_file>
```

or 

```sh
npm -g install gh-app-token
gh-app-token --appId <your_app_id> --installationId <installation_id> --pem <path_to_pem_file>
```

### API

```js
const { auth } = require("gh-app-token");

auth(appId, installationId, pemFilePath).then(token => {
  // use token
});
```

## License
MIT. See LICENSE under this repository.
