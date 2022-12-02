import { definition, fold, library, nameLens } from "./src/domain/package";

const name = nameLens.set.bind(nameLens);

const prettier = fold(
  library("prettier", "^2.7.1").dev(),
  library("@trivago/prettier-plugin-sort-imports", "^3.4.0").dev()
);

export const def = definition(
  name("packsplode"),
  prettier,
  library("typescript", "^4.9.3").dev(),
  library("vitest", "^0.15.2").dev(),
  library("@ollierelph/result4t", "^0.0.3").prod()
);
