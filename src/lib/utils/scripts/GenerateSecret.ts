import { createHash, randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const envPath = resolve(process.cwd(), '.env');

if (!existsSync(envPath)) {
  throw new Error('.env file not found');
}

const secret = createHash('sha512')
  .update(randomBytes(64))
  .digest('hex');

const env = readFileSync(envPath, 'utf8');

const apiSecretPattern = /^API_SECRET=.*$/m;

const updatedEnv = apiSecretPattern.test(env)
  ? env.replace(apiSecretPattern, `API_SECRET=${secret}`)
  : `${env}${env.endsWith('\n') ? '' : '\n'}API_SECRET=${secret}\n`;

writeFileSync(envPath, updatedEnv);

console.log('API_SECRET generated successfully.');