import loader from './packages/multiloader-loader/src/loader.js';
export * from './packages/multiloader-loader/src/loader.js';

import https from './packages/multiloader-https/src/httpsLoader.js';
import json from './packages/multiloader-json/src/jsonLoader.js';
import typescript from './packages/multiloader-typescript/src/typescriptLoader.js';
import yaml from './packages/multiloader-yaml/src/yamlLoader.js';
import babel from './packages/multiloader-babel/src/babelLoader.js';
import coffee from '../node-loaders/coffeescript-loader/loader.js';

import tsConfig from "./tsconfig.mjs";
 
loader(
  https({
    allowHttp: true,
  }),
  // json(),
  // coffee(), 
  typescript(tsConfig),
  // babel({
  //   presets: ['@babel/preset-react'],
  // }),
  // yaml(),
);
