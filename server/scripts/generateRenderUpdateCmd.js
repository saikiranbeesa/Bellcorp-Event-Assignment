#!/usr/bin/env node
const { argv, env } = require('process');

function usage() {
  console.log(`
Usage:
  node scripts/generateRenderUpdateCmd.js --netlifyUrl=<NETLIFY_URL> --serviceId=<RENDER_SERVICE_ID>

You can also set environment variables and run without args:
  NETLIFY_URL and RENDER_SERVICE_ID

This will print a curl command you can run locally (replace RENDER_API_KEY with your secret).
`);
}

function parseArgs() {
  const out = {};
  argv.slice(2).forEach((arg) => {
    if (arg.startsWith('--netlifyUrl=')) out.netlifyUrl = arg.split('=')[1];
    if (arg.startsWith('--serviceId=')) out.serviceId = arg.split('=')[1];
  });
  out.netlifyUrl = out.netlifyUrl || env.NETLIFY_URL;
  out.serviceId = out.serviceId || env.RENDER_SERVICE_ID;
  return out;
}

const { netlifyUrl, serviceId } = parseArgs();
if (!netlifyUrl || !serviceId) {
  usage();
  process.exit(1);
}

// Sanitize
const normalizedUrl = netlifyUrl.trim().replace(/\/$/, '');

console.log('\nGenerated curl command to set Render env var CLIENT_URL:\n');
console.log('Replace <RENDER_API_KEY> with your Render API key and run this command:');

const payload = JSON.stringify([
  {
    key: 'CLIENT_URL',
    value: normalizedUrl,
    sync: true
  }
]);

console.log('\ncurl -X POST "https://api.render.com/v1/services/' + serviceId + '/env-vars" \\');
console.log("  -H 'Accept: application/json' \\ ");
console.log("  -H 'Authorization: Bearer <RENDER_API_KEY>' \\ ");
console.log("  -H 'Content-Type: application/json' \\ ");
console.log("  -d '" + payload.replace(/'/g, "'\\''") + "'\n");

console.log('Notes:');
console.log('- This posts a batch of env vars (here only CLIENT_URL).');
console.log('- The Render API requires a valid API key with service permissions.');
console.log('- If the var already exists, Render will update its value.');
console.log('- Do not commit secrets. Use Render dashboard or API for secret management.\n');
