import { recordSetter } from "../lenses/set";

export type Dependencies = Record<string, string>;
export type Package = {
  name?: string;
  dependencies?: Dependencies;
};
export const version = recordSetter<Package, string>("version");

const fold =
  <Subject>(...args: Array<(subject: Subject) => Subject>) =>
  (subject: Subject) => {
    return args.reduce((agg, set) => set(agg), subject);
  };

function foldAndSet(name: string) {
  return <Package, Subject>(...args: Array<(subject: Subject) => Subject>) =>
    (pack: Package) =>
      recordSetter<Package, Subject>(name)(fold(...args)({} as Subject))(pack);
}

export const dependencies = foldAndSet("dependencies");
export const devDependencies = foldAndSet("devDependencies");
export const peerDependencies = foldAndSet("peerDependencies");

export const definition = fold;
