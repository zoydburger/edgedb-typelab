import { User } from "edgeql-types/interfaces";
import { db, runQuery } from "~/edgedb";
import { Infer } from "edgeql-types/helper";

type UserCreateData = Pick<User, "username" | "email">;
// Use the exported type from edgeql-types/interfaces for types
const exampleUser = {
  username: "test",
  email: "test@test.com",
};

// Use exported type and runtime object from db.*
function createUser(user: UserCreateData) {
  return db.insert(db.User, user);
}

// We can infer the type of the object that gets returned, when the query is executed
type InferredWithHelperFunction = Infer<ReturnType<typeof createUser>>;

// The generically typed runQuery function also correctly infers the return type
const user = runQuery(createUser(exampleUser));
