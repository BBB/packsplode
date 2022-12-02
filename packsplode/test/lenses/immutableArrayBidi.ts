import { expect, it } from "vitest";

import { fromArray } from "../../src/lenses/immutableArrayBidi";
import { fromRecord } from "../../src/lenses/immutableRecordBidi";

type Woo = [string, number];
type Root = Array<Woo>;
const woo = fromArray<Root>()(0);
const hoo = fromArray<Woo>()(1);
const wooHoo = woo.compose(hoo);

it("should get and set a value", () => {
  const orig = [
    ["1", 2],
    ["3", 4],
  ];
  expect(wooHoo.get(orig)).toEqual(2);
  expect(wooHoo.set(99)(orig)).toStrictEqual([
    ["1", 99],
    ["3", 4],
  ]);
  expect(orig).toStrictEqual([
    ["1", 2],
    ["3", 4],
  ]);
});

it("should modify a value", () => {
  const orig = [
    ["1", 2],
    ["3", 4],
  ];
  expect(wooHoo.modify((v) => 99)(orig)).toEqual([
    ["1", 99],
    ["3", 4],
  ]);
  expect(orig).toStrictEqual([
    ["1", 2],
    ["3", 4],
  ]);
});
