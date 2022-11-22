import { Option } from "../lib/option";

interface BidiLens<Subject, Value> {
  get(from: Subject): Option<Value>;

  set(value: Value): (into: Subject) => Subject;
}

class Bidi<Subject, Value> implements BidiLens<Subject, Value> {
  constructor(
    public get: (input: Subject) => Option<Value>,
    public set: (value: Value) => (into: Subject) => Subject
  ) {}
}
