#!/usr/bin/env node
const prerender = require('./lib');
const puppeteer = require('puppeteer');

(async () => {
  // Use Puppeteer's built-in Chromium
  const chromiumPath = puppeteer.executablePath();
  process.env.CHROME_LOCATION = chromiumPath;

  const server = prerender();

  // Optional middlewares
  server.use(prerender.sendPrerenderHeader());
  server.use(prerender.browserForceRestart());
  // server.use(prerender.blockResources());
  server.use(prerender.addMetaTags());
  server.use(prerender.removeScriptTags());
  server.use(prerender.httpHeaders());

  server.start({
    chromeLocation: chromiumPath,
    chromeFlags: [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--remote-debugging-port=9222',
    ],
  });
})();
