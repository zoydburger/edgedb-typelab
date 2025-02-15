import { USER_STATUS, UserStatusValues } from "edgeql-types/generated";
import { Fields, Links, Props } from "edgeql-types/helper";
import { User, UserStatus } from "edgeql-types/interfaces";
import { db } from "~/edgedb";

// Type examples
type MyInterface = User; // This does not resolve the symbol, points to $default.User
type MyInterfaceFields = Fields<User>; // User with expanded fields
type MyInterfaceProps = Props<User>; // User with expanded props only
type MyInterfaceLinks = Links<User>; // User with expanded links only

// Enum examples
type MyStringLiteral = UserStatus; // This does not resolve the symbol, points to $UserStatus
const MyEnum = USER_STATUS; // Runtime object, members accessible via ENUM.$NAME
const MyEnumValues = UserStatusValues; // String array of enum values

// ObjectType examples
const MyObjectType = db.User; // Runtime object, members accessible via OBJECT.$NAME
const MyObjectTypeValues = db.User.__element__.__name__; // default::User

// EnumType examples
const MyEnumType = db.UserStatus; // Runtime object, members accessible via ENUM.$NAME
const MyEnumTypeValues = db.UserStatus.__values__; // This is the same as MyEnumValues
