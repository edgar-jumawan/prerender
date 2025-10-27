#!/usr/bin/env node
const prerender = require('./lib');
const chromium = require('chrome-aws-lambda');

(async () => {
  const chromiumPath = await chromium.executablePath;

  const server = prerender();

  // Middlewares
  server.use(prerender.sendPrerenderHeader());
  server.use(prerender.browserForceRestart());
  // server.use(prerender.blockResources());
  server.use(prerender.addMetaTags());
  server.use(prerender.removeScriptTags());
  server.use(prerender.httpHeaders());

  server.start({
    chromeLocation: chromiumPath,
    chromeFlags: chromium.args.concat([
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--remote-debugging-port=9222',
    ]),
  });
})();
