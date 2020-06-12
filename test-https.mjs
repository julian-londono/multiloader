import { Sha256 } from 'https://deno.land/std/hash/sha256.ts';
const sha = new Sha256();
sha.update('done');
console.log(sha.hex());

// import linters from 'https://raw.githubusercontent.com/nodejs/node/master/.github/workflows/linters.yml';
// console.log(linters);

// import * as sqlite from 'https://deno.land/x/sqlite/build/sqlite.wasm';
// console.log(sqlite);

import reddit_json from 'https://api.reddit.com/r/javascript/about';

console.log(typeof(reddit_json));