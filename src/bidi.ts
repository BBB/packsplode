interface SetterLens<Subject, Value> {
  (value: Value): (into: Subject) => Subject;
}

interface GetterLens<Subject, Value> {
  (from: Subject): Option<Value>;
}

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

class None {}

class Some<T> {
  constructor(public value: T) {}
}

type Option<T> = Some<T> | None;

const optional = <T>(value: T | null | undefined): Option<T> =>
  typeof value === "undefined" || value == null ? new None() : new Some(value);

const recordSetter =
  <Subject, Value>(name: string): SetterLens<Subject, Value> =>
  (value: Value) =>
  (subject: Subject) => ({
    ...subject,
    [name]: value,
  });
const recordGetter =
  <Subject, Value>(name: string): GetterLens<Subject, Value> =>
  (subject: Subject) =>
    typeof subject === "object" && subject != null && name in subject
      ? optional((subject as any)[name])
      : new None();

type Package = {
  name: string;
};

const version = recordSetter<Package, string>("version");

const entries =
  <Subject>(...args: Array<(subject: Subject) => Subject>) =>
  (subject: Subject) => {
    return args.reduce((agg, set) => set(agg), subject);
  };
const dependencies =
  <Package, Subject>(...args: Array<(subject: Subject) => Subject>) =>
  (pack: Package) =>
    recordSetter<Package, Subject>("dependencies")(
      entries(...args)({} as Subject)
    )(pack);
const definition = entries;

const react = recordSetter<Record<string, string>, string>("react");
const reactDom = recordSetter<Record<string, string>, string>("react-dom");

const mypackage = definition(
  version("1.2.3"),
  dependencies(react("1.0.0"), reactDom("2.0.0"))
);

console.log(mypackage({} as Package));
