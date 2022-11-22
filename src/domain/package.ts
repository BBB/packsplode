import { recordSetter } from "../lenses/set";

export type Dependencies = Record<string, string>;
export type Package = {
  name?: string;
  dependencies?: Dependencies;
};
export const version = recordSetter<Package, string>("version");
const entries =
  <Subject>(...args: Array<(subject: Subject) => Subject>) =>
  (subject: Subject) => {
    return args.reduce((agg, set) => set(agg), subject);
  };
export const dependencies =
  <Package, Subject>(...args: Array<(subject: Subject) => Subject>) =>
  (pack: Package) =>
    recordSetter<Package, Subject>("dependencies")(
      entries(...args)({} as Subject)
    )(pack);
export const definition = entries;
