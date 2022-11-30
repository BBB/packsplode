import {
    definition,
    Dependencies,
    dependencyLens,
    devDependencyLens, nameLens,
    peerDependencyLens,
    versionLens,
} from "./domain/package";
import {Bidi} from "./lenses/bidi";

const library = (name: string) => (version: string) => {
    const lens = new Bidi<Dependencies, string>(
        (def) => def[name],
        (version) => (def) => ({...def, [name]: version}));
    return {
        asDependency: () => dependencyLens.compose(lens).set(version),
        asDevDependency: () => devDependencyLens.compose(lens).set(version),
        asPeerDependency: () => peerDependencyLens.compose(lens).set(version)
    };
};


const react = library("react")
const reactDom = library("react-dom")
const typescript = library("typescript")
const peer = library("peer")
const version = versionLens.set.bind(versionLens);
const name = nameLens.set.bind(nameLens);

export const mypackage = definition(
  name("@scope/mypackage"),
  version("1.2.3"),
  react("1.0.0").asDependency(),
  reactDom("2.0.0").asDependency(),
  typescript("3.0.0").asDevDependency(),
  peer("3.0.0").asPeerDependency(),
);

console.log(mypackage({}));

