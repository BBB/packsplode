export class None {}

class Some<T> {
  constructor(public value: T) {}
}

export type Option<T> = Some<T> | None;
export const optional = <T>(value: T | null | undefined): Option<T> =>
  typeof value === "undefined" || value == null ? new None() : new Some(value);
