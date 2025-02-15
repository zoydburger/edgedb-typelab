  
module default {

  type Role {
    required name: str {
      constraint exclusive;
    };
  }

  scalar type UserStatus extending enum<verified, unverified, banned, deleted>;

  type User {
    required username: str;
    required email: str {
      constraint exclusive;
    }

    multi roles: Role {
      on source delete allow;
    };

    status: UserStatus;
  }
  
}