interface BidiLens<Subject, Value> {
  get(from: Subject): Value;

  set(value: Value): (into: Subject) => Subject;
}

export class Bidi<Subject, Value> implements BidiLens<Subject, Value> {
  constructor(
    public get: (input: Subject) => Value,
    public set: (value: Value) => (into: Subject) => Subject
  ) {}

  compose<TopValue>(other: Bidi<Value, TopValue>) {
    return new Bidi<Subject, TopValue>(
      (from: Subject) => {
        const input = this.get(from);
        return other.get(input);
      },
      (value) => (subject: Subject) => {
        const b = this.get(subject);
        const b2 = other.set(value)(b);
        return this.set(b2)(subject);
      }
    );
  }
}
