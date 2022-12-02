import { expect, it } from "vitest";

import { fromRecord } from "../../src/lenses/immutableRecordBidi";

type Woo = { hoo: boolean };
type Root = { woo: Woo };
it("should get and set a value", () => {
  const woo = fromRecord<Root>()("woo");
  const hoo = fromRecord<Woo>()("hoo");
  const wooHoo = woo.compose(hoo);
  const orig = { woo: { hoo: true } };
  expect(wooHoo.get(orig)).toEqual(true);
  expect(wooHoo.set(false)(orig)).toStrictEqual({ woo: { hoo: false } });
  expect(orig).toStrictEqual({ woo: { hoo: true } });
});
