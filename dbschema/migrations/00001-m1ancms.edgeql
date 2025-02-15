CREATE MIGRATION m1ancmscetgwtuqlxhbsahpfugicpdx2eii3vqklpvz4sknr6dliyq
    ONTO initial
{
  CREATE TYPE default::Role {
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE SCALAR TYPE default::UserStatus EXTENDING enum<verified, unverified, banned, deleted>;
  CREATE TYPE default::User {
      CREATE MULTI LINK roles: default::Role {
          ON SOURCE DELETE ALLOW;
      };
      CREATE REQUIRED PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY status: default::UserStatus;
      CREATE REQUIRED PROPERTY username: std::str;
  };
};
