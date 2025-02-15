import { helper, User } from "edgeql-interfaces";
import { EnumType } from "edgeql-lib/reflection";
import e, { $infer } from "edgeql-js";
import * as edgedb from "edgedb";
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type Props<T> = helper.Props<T>;
type Links<T> = helper.Links<T>;
type Fields<T> = Expand<T>;

function Enum<T extends readonly string[]>(
  enumType: EnumType & { __values__: T }
): { [K in T[number]]: K } {
  // We could also utilize zod with z.enum(enumType.__values__) here, but this yields a cleaner object
  return Object.fromEntries(enumType.__values__.map((v) => [v, v])) as {
    [K in T[number]]: K;
  };
}

const Test = User

type UserStatusType = typeof e.UserStatus.__tstype__;
type UserType = typeof e.User.__type__;

const test = Enum(e.UserStatus);

const enum MyEnum {
  A = "A",
  B = "B",
  C = "C",
}
type Test = typeof e.User.__type__;

function createUserExample1(user: Pick<User, "username" | "email">) {
  return e.insert(e.User, user);
}

const client = edgedb.createClient();
const user = getUserById({ id: "1" }).run(client);

function getUserById({ id }: Pick<User, "id">) {
  return e.select(e.User, () => ({
    id: true,
    username: true,
    filter_single: { id },
  }));
}

export type { Props, Links, Fields, Enum };
