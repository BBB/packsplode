import { expect, it } from "vitest";

import {
  definition,
  library,
  nameLens,
  versionLens,
} from "../../src/domain/package";

const version = versionLens.set.bind(versionLens);
const name = nameLens.set.bind(nameLens);

it("prod deps should add", () => {
  expect(definition(library("react", "1").prod())).toMatchInlineSnapshot(`
    {
      "dependencies": {
        "react": "1",
      },
    }
  `);
});

it("dev deps should add", () => {
  expect(definition(library("react", "1").dev())).toMatchInlineSnapshot(`
    {
      "devDependencies": {
        "react": "1",
      },
    }
  `);
});

it("peer deps should add to dev deps too", () => {
  expect(definition(library("peer", "1").peer())).toMatchInlineSnapshot(`
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
  expect(
    definition(
      name("@scope/mypackage"),
      version("1.2.3"),
      library("react", "1.0.0").prod(),
      library("react-dom", "2.0.0").prod(),
      library("typescript", "3.0.0").dev(),
      library("peer", "3.0.0").peer()
    )
  ).toMatchInlineSnapshot(`
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
