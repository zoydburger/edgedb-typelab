import { EnumType } from "edgeql-lib/reflection";
import { helper } from "./interfaces";
import { type $infer } from "edgeql-lib/syntax";
import { BaseType, Cardinality, TypeSet } from "./exports";

function Enum<T extends readonly string[]>(
  enumType: EnumType & { __values__: T }
): { [K in T[number]]: K } {
  // We could also utilize zod with z.enum(enumType.__values__) here, but this yields a cleaner type
  return Object.fromEntries(enumType.__values__.map((v) => [v, v])) as {
    [K in T[number]]: K;
  };
}

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type Props<T> = helper.Props<T>;
type Links<T> = helper.Links<T>;
type Fields<T> = Expand<T>;
type Infer<T extends TypeSet<BaseType, Cardinality>> = $infer<T>;

export { Enum };
export type { Expand, Props, Links, Fields, Infer };
