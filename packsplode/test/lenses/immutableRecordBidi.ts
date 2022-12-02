import { expect, it } from "vitest";

import { fromRecord } from "../../src/lenses/immutableRecordBidi";

type Woo = { hoo: boolean };
type Root = { woo: Woo };
const woo = fromRecord<Root>()("woo");
const hoo = fromRecord<Woo>()("hoo");
const wooHoo = woo.compose(hoo);
it("should get and set a value", () => {
  const orig = { woo: { hoo: true } };
  expect(wooHoo.get(orig)).toEqual(true);
  expect(wooHoo.set(false)(orig)).toStrictEqual({ woo: { hoo: false } });
  expect(orig).toStrictEqual({ woo: { hoo: true } });
});

it("should modify a value", () => {
  const orig = { woo: { hoo: true } };
  expect(wooHoo.modify((v) => false)(orig)).toEqual({ woo: { hoo: false } });
  expect(orig).toStrictEqual({ woo: { hoo: true } });
});
