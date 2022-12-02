import { Bidi } from "./bidi";

export class ImmutableRecordBidi<Outer, Key extends keyof Outer> extends Bidi<
  Outer,
  Outer[Key]
> {
  private constructor(key: Key) {
    super(
      (def) => def[key],
      (version) => (def) => ({ ...def, [key]: version })
    );
  }

  static from<Outer>() {
    return <Key extends keyof Outer>(key: Key) =>
      new ImmutableRecordBidi<Outer, Key>(key);
  }
}

export const fromRecord = <Outer>() => ImmutableRecordBidi.from<Outer>();
