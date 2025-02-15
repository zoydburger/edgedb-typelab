import e from "edgeql-querybuilder";
import * as edgedb from "edgedb";
import {
  BaseType,
  Cardinality,
  Expression,
  TypeSet,
} from "edgeql-types/exports";
import { Infer } from "edgeql-types/helper";

const client = edgedb.createClient();

// We utilize the Infer helper function to infer the type of the object that gets returned,
// when the query is executed
function runQuery<T extends TypeSet<BaseType, Cardinality>>(
  query: Expression<T>
): Infer<T> {
  return query.run(client);
}

export { e as db, client, runQuery };
