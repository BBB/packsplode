import { None, Option, optional } from "../lib/option";

interface GetterLens<Subject, Value> {
  (from: Subject): Option<Value>;
}

const recordGetter =
  <Subject, Value>(name: string): GetterLens<Subject, Value> =>
  (subject: Subject) =>
    typeof subject === "object" && subject != null && name in subject
      ? optional((subject as any)[name])
      : new None();
