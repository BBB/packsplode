import { Bidi } from "./bidi";

export class ImmutableArrayBidi<Outer extends any[] | []> extends Bidi<
  Outer,
  Outer[number]
> {
  private constructor(ix: number) {
    super(
      (def) => def[ix],
      (version) => (def) =>
        [...def.slice(0, ix), version, ...def.slice(ix + 1)] as Outer
    );
  }

  static from<Outer>() {
    return <Outer extends any[] | []>(ix: number) =>
      new ImmutableArrayBidi<Outer>(ix);
  }
}

export const fromArray = <Outer extends any[] | []>() =>
  ImmutableArrayBidi.from<Outer>();
