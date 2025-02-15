import { User } from "edgeql-types/interfaces";
import { db, runQuery } from "~/edgedb";
import { Infer } from "edgeql-types/helper";
import { USER_STATUS } from "edgeql-types/generated";

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

function updateUserStatus({ id, status }: Pick<User, "id" | "status">) {
  return db.update(db.User, (user) => ({
    set: {
      status,
    },
    filter_single: { id },
  }));
}

// We use our custom generated enum here and validate that update return values is inferred correctly
const updatedUser = runQuery(
  updateUserStatus({ id: user.id, status: USER_STATUS.verified })
);
