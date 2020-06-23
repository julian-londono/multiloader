const resolveHooks = {
  name: 'resolve',
  hooks: [],
  loaders: [],
};

const getFormatHooks = {
  name: 'getFormat',
  hooks: [],
  loaders: [],
};

const getSourceHooks = {
  name: 'getSource',
  hooks: [],
  loaders: [],
};

const transformSourceHooks = {
  name: 'transformSource',
  hooks: [],
  loaders: [],
};

const hooks = [
  resolveHooks,
  getFormatHooks,
  getSourceHooks,
  transformSourceHooks,
];

export default function configureLoader(...loaders) {
  for (const loader of loaders) {
    for (const hook of hooks) {
      if (loader[hook.name]) {
        hook.hooks.push(loader[hook.name]);
        hook.loaders.push(loader.loader);
      }
    }
  }
  console.log("resolve: ", resolveHooks.loaders);
  console.log("getFormat: ", getFormatHooks.loaders);
  console.log("getSource: ", getSourceHooks.loaders);
  console.log("transformSource: ", transformSourceHooks.loaders);
}

export async function resolve(specifier, context, defaultResolve, index = 0) {

  /*
    Only use this hook depending on the file type
  */

  if (resolveHooks.hooks[index]) {
    
    console.log("START resolving for", resolveHooks.loaders[index], " -- Specifier: \n", specifier.slice(0,120), "\n*********************************************\n"); 
    
    let ret = resolveHooks.hooks[index](specifier, context, (s, c)  =>
      resolve(s, c, defaultResolve, index + 1),
    );

    console.log("DONE resolving for", resolveHooks.loaders[index], "\n*********************************************\n");

    return ret; 
  }

  
  return defaultResolve(specifier, context, defaultResolve);
}

export async function getFormat(
  url,
  context,
  defaultGetFormat,
  index = 0,
) {
  if (getFormatHooks.hooks[index]) {
    console.log("START formatting for", getFormatHooks.loaders[index], " -- url \n", url.slice(0,120), "\n*********************************************\n");

    let ret = getFormatHooks.hooks[index](url, context, (s, c) =>
      getFormat(s, c, defaultGetFormat, index + 1),
    );

    console.log("DONE formatting for", getFormatHooks.loaders[index], "\n*********************************************\n");

    return ret; 

    
  }
  return defaultGetFormat(url, context, defaultGetFormat);
}

export async function getSource(
  url,
  context,
  defaultGetSource,
  index = 0,
) {
  if (getSourceHooks.hooks[index]) {
    console.log("START sourcing for", getSourceHooks.loaders[index], " -- url \n", url.slice(0,120), "\n*********************************************\n");

    let ret = getSourceHooks.hooks[index](url, context, (s, c) =>
      getSource(s, c, defaultGetSource, index + 1),
    );

    // console.log("**********************SOURCE*************\n\n");
    // console.log((await ret).source.toString('utf8'));
    // console.log("**********************FIN*************\n\n");
    

    console.log("DONE sourcing for", getSourceHooks.loaders[index], "\n*********************************************\n");

    return ret; 

    
  }
  return defaultGetSource(url, context, defaultGetSource);
}

export async function transformSource(
  source,
  context,
  defaultTransformSource,
  index = 0,
) {

  if (transformSourceHooks.hooks[index]) {
    console.log("START transforming for", transformSourceHooks.loaders[index], "\n*********************************************\n");

    let ret = transformSourceHooks.hooks[index](source, context, (s, c) =>
      transformSource(s, c, defaultTransformSource, index + 1),
    );

    console.log("**********************POST TRANSFORM SOURCE*************\n\n");
    // console.log((await ret).source.toString('utf8'));
    console.log("******************************FIN***********************\n\n");

    console.log("DONE transforming for", transformSourceHooks.loaders[index], "\n*********************************************\n");

    return ret;

    
  }
  return defaultTransformSource(source, context, defaultTransformSource);
}
