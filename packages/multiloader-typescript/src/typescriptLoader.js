import TypeScript from 'typescript';

export default function typescriptLoader(compilerOptions = {}) {
  return {
    getFormat(url, context, defaultGetFormat) {
      if (url.endsWith('.ts')) {
        return { format: 'module' };
      }
      return defaultGetFormat(url, context);
    },

    transformSource(source, context, defaultTransformSource) {
      const { url } = context;
      if (url.endsWith('.ts')) {
        return {
          source: TypeScript.transpileModule(source, compilerOptions).outputText,
        };
      }
      return defaultTransformSource(source, context);
    },
    loader: "TypeScript",
  };
}
