import { expect, it } from "vitest";

import { Bidi } from "../../src/lenses/bidi";

it("should get and set a value", () => {
  const woo = new Bidi<{ woo: string }, string>(
    (source) => source.woo,
    (woo) => (source) => ({
      ...source,
      woo,
    })
  );
  expect(woo.get({ woo: "hoo" })).toEqual("hoo");
  expect(woo.set("boo")({ woo: "hoo" })).toEqual({ woo: "boo" });
});

it("should compose to get and set a nested value", () => {
  const items = new Bidi<{ items: string[] }, string[]>(
    (source) => source.items,
    (items) => (source) => ({
      ...source,
      items,
    })
  );
  const first = new Bidi<string[], string>(
    (items) => items[0],
    (item) => (items) => {
      const next = items.slice();
      next[0] = item;
      return next;
    }
  );
  const firstItem = items.compose(first);
  expect(firstItem.get({ items: ["one", "two"] })).toEqual("one");
  expect(firstItem.set("boo")({ items: ["one", "two"] })).toEqual({
    items: ["boo", "two"],
  });
});
