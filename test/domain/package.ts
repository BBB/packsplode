import { expect, it } from "vitest";

import {
  definition,
  library,
  nameLens,
  versionLens,
} from "../../src/domain/package";

const react = library("react");
const reactDom = library("react-dom");
const typescript = library("typescript");
const peer = library("peer");
const version = versionLens.set.bind(versionLens);
const name = nameLens.set.bind(nameLens);

const mypackage = definition(
  name("@scope/mypackage"),
  version("1.2.3"),
  react("1.0.0").prod(),
  reactDom("2.0.0").prod(),
  typescript("3.0.0").dev(),
  peer("3.0.0").peer()
);
it("prod deps should add", () => {
  expect(react("1").prod()({})).toMatchInlineSnapshot(`
    {
      "dependencies": {
        "react": "1",
      },
    }
  `);
});

it("dev deps should add", () => {
  expect(react("1").dev()({})).toMatchInlineSnapshot(`
    {
      "devDependencies": {
        "react": "1",
      },
    }
  `);
});

it("peer deps should add to dev deps too", () => {
  expect(peer("1").peer()({})).toMatchInlineSnapshot(`
    {
      "devDependencies": {
        "peer": "1",
      },
      "peerDependencies": {
        "peer": "1",
      },
    }
  `);
});

it("should render the package json", () => {
  expect(mypackage).toMatchInlineSnapshot(`
    {
      "dependencies": {
        "react": "1.0.0",
        "react-dom": "2.0.0",
      },
      "devDependencies": {
        "peer": "3.0.0",
        "typescript": "3.0.0",
      },
      "name": "@scope/mypackage",
      "peerDependencies": {
        "peer": "3.0.0",
      },
      "version": "1.2.3",
    }
  `);
});
