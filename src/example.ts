import {
  Dependencies,
  definition,
  dependencies,
  devDependencies,
  version,
} from "./domain/package";
import { recordSetter } from "./lenses/set";

const react = recordSetter<Dependencies, string>("react");
const reactDom = recordSetter<Dependencies, string>("react-dom");
const typescript = recordSetter<Dependencies, string>("typescript");

export const mypackage = definition(
  version("1.2.3"),
  dependencies(react("1.0.0"), reactDom("2.0.0")),
  devDependencies(typescript("3.0.0"))
);

console.log(mypackage({}));
