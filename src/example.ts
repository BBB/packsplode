import { definition, library, nameLens, versionLens } from "./domain/package";

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
