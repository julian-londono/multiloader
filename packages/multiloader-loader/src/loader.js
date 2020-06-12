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
  if (resolveHooks.hooks[index]) {
    console.log("index", index);
    console.log("specifier", specifier, "context", context.parentURL);
    
    console.log("resolving for", resolveHooks.loaders[index], "\n*********************************************");
    return resolveHooks.hooks[index](specifier, context, (s, c) =>
      resolve(s, c, defaultResolve, index + 1),
    );
  }
  return defaultResolve(specifier, context, defaultResolve);
}

export async function getFormat(
  specifier,
  context,
  defaultGetFormat,
  index = 0,
) {
  if (getFormatHooks.hooks[index]) {
    console.log("formatting for", getFormatHooks.loaders[index], "\n*********************************************");

    return getFormatHooks.hooks[index](specifier, context, (s, c) =>
      getFormat(s, c, defaultGetFormat, index + 1),
    );
  }
  return defaultGetFormat(specifier, context, defaultGetFormat);
}

export async function getSource(
  specifier,
  context,
  defaultGetSource,
  index = 0,
) {
  if (getSourceHooks.hooks[index]) {
    console.log("sourcing for", getSourceHooks.loaders[index], "\n*********************************************");

    return getSourceHooks.hooks[index](specifier, context, (s, c) =>
      getSource(s, c, defaultGetSource, index + 1),
    );
  }
  return defaultGetSource(specifier, context, defaultGetSource);
}

export async function transformSource(
  specifier,
  context,
  defaultTransformSource,
  index = 0,
) {

  if (transformSourceHooks.hooks[index]) {
    console.log("transforming for", transformSourceHooks.loaders[index], "\n*********************************************");

    return transformSourceHooks.hooks[index](specifier, context, (s, c) =>
      transformSource(s, c, defaultTransformSource, index + 1),
    );
  }
  return defaultTransformSource(specifier, context, defaultTransformSource);
}
