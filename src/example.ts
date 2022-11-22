import {
  Dependencies,
  definition,
  dependencies,
  version,
} from "./domain/package";
import { recordSetter } from "./lenses/set";

const react = recordSetter<Dependencies, string>("react");
const reactDom = recordSetter<Dependencies, string>("react-dom");

export const mypackage = definition(
  version("1.2.3"),
  dependencies(react("1.0.0"), reactDom("2.0.0"))
);

console.log(mypackage({}));
