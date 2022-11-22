interface SetterLens<Subject, Value> {
  (value: Value): (into: Subject) => Subject;
}

export const recordSetter =
  <Subject, Value>(name: string): SetterLens<Subject, Value> =>
  (value: Value) =>
  (subject: Subject) => ({
    ...subject,
    [name]: value,
  });
