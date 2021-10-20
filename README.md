# Extension skeleton
Based of [Samuel's Chrome Extension Boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate). Added a content script, wrapped some API in Promisses ready to be used in asynchronous functions and added json-server for database mock.

## Testing
1. After cloning the respository, run `yarn install`, `yarn build` and `yarn mock` then go to your chrome browser extension management page.

2. On the top right corner, activate `Developer mode` and three buttons should appear bellow the navbar.

3. Click on `Load unpacked` button and find the `{extension}/build` folder, that is the one with the `manifest.json` file.

4. The extension should now be active, you can pin it on the navbar of your browser and begin testing.

## Development
After cloning the respository, you should run `yarn install` and `yarn build` then follow the same steps described in testing for adding the extension to your chrome browser.

1. Access `chrome://extensions/`
2. Check `Developer mode`
3. Click on `Load unpacked extension`
4. Select the `build` folder.

Now run `yarn start` and `yarn mock` then update the extension on the browser. This should activate the live reload function of webpack, so there is no need to update the extension manually. If everything was made correctly, your browser console should log every time the project is compiled. Note that content scripts cannot connect to the webpack websocket while in external sources, so either remove them from hotreload or develop on a local application.

## Known issues
- While starting the server, if there are errors on the first build, some files are not written to the file system
- Content scripts changes will not be live reloaded
   - [Because there is no connection with the webpack dev server socket in other domains](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate/issues/4#issuecomment-261788690)

## Planned features
- Script injection as a service
   - A way of injecting scripts with `tabs` API, but without the need of addressing it as a content script in the webpack config