import {
  Dependencies,
  definition,
  dependencyLens,
  devDependencyLens,
  nameLens,
  peerDependencyLens,
  versionLens,
} from "./domain/package";
import { Bidi } from "./lenses/bidi";

const library = (name: string) => (version: string) => {
  const lens = new Bidi<Dependencies, string>(
    (def) => def[name],
    (version) => (def) => ({ ...def, [name]: version })
  );
  return {
    prod: () => dependencyLens.compose(lens).set(version),
    dev: () => devDependencyLens.compose(lens).set(version),
    peer: () => peerDependencyLens.compose(lens).set(version),
  };
};

const react = library("react");
const reactDom = library("react-dom");
const typescript = library("typescript");
const peer = library("peer");
const version = versionLens.set.bind(versionLens);
const name = nameLens.set.bind(nameLens);

export const mypackage = definition(
  name("@scope/mypackage"),
  version("1.2.3"),
  react("1.0.0").prod(),
  reactDom("2.0.0").prod(),
  typescript("3.0.0").dev(),
  peer("3.0.0").peer()
);

console.log(mypackage({}));
