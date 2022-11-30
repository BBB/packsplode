import { Bidi } from "../lenses/bidi";
import { optional } from "../lib/option";

export type Dependencies = Record<string, string>;
export type Package = {
  name?: string | undefined;
  version?: string;
  dependencies?: Dependencies;
  devDependencies?: Dependencies;
  peerDependencies?: Dependencies;
};
export const versionLens = new Bidi<Package, string | undefined>(
  (def) => def.version,
  (version) => (def) => ({ ...def, version })
);
export const nameLens = new Bidi<Package, string | undefined>(
  (def) => def.name,
  (name) => (def) => ({ ...def, name })
);
export const dependencyLens = new Bidi<Package, Dependencies>(
  (def) => optional(def.dependencies).orElse({}),
  (dependencies) => (def) => ({ ...def, dependencies })
);
export const devDependencyLens = new Bidi<Package, Dependencies>(
  (def) => optional(def.devDependencies).orElse({}),
  (devDependencies) => (def) => ({ ...def, devDependencies })
);
export const peerDependencyLens = new Bidi<Package, Dependencies>(
  (def) => optional(def.peerDependencies).orElse({}),
  (peerDependencies) => (def) => ({ ...def, peerDependencies })
);

const fold =
  <Subject>(...args: Array<(subject: Subject) => Subject>) =>
  (subject: Subject) => {
    return args.reduce((agg, set) => set(agg), subject);
  };

export const definition = (...args: Array<(subject: Package) => Package>) =>
  fold(...args)({});

export const library = (name: string) => (version: string) => {
  const lens = new Bidi<Dependencies, string>(
    (def) => def[name],
    (version) => (def) => ({ ...def, [name]: version })
  );
  return {
    prod: () => dependencyLens.compose(lens).set(version),
    dev: () => devDependencyLens.compose(lens).set(version),
    peer: () => (into: Package) =>
      peerDependencyLens.compose(lens).set(version)(
        devDependencyLens.compose(lens).set(version)(into)
      ),
  };
};
