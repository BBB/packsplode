import { expect, it } from "vitest";

import { Bidi } from "../../src/lenses/bidi";

class Widget {
  constructor(private value: number) {}

  get id() {
    return this.value;
  }
}

class Gadget {
  constructor(public widget: Widget) {}
}

const widgetId = new Bidi<Widget, number>(
  (source) => source.id,
  (woo) => (source) => new Widget(woo)
);
const widget = new Bidi<Gadget, Widget>(
  (source) => source.widget,
  (widget) => (source) => new Gadget(widget)
);

it("should get and set a value", () => {
  expect(widgetId.get(new Widget(1))).toEqual(1);
  expect(widgetId.set(1)(new Widget(2))).toEqual(new Widget(1));
});

it("should compose to get and set a nested value", () => {
  const gadgetWidgetId = widget.compose(widgetId);
  expect(gadgetWidgetId.get(new Gadget(new Widget(2)))).toEqual(2);
  expect(gadgetWidgetId.set(11)(new Gadget(new Widget(2)))).toEqual(
    new Gadget(new Widget(11))
  );
});

it("should modify a value", () => {
  const orig = new Widget(1);
  expect(widgetId.modify((v) => v + 20)(orig)).toEqual(new Widget(21));
  expect(orig).toStrictEqual(orig);
});
