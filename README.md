# edgedb-typelab

This project is part of a research regarding edgedb's query builder including its interface generator.

## Setup

If you are running this project for the first time, you can initialize it by running the following command:

```bash
npm run setup
```

This will:

- destroy any existing edgedb instance named `edgedb-typelab`
- create a new edgedb instance named `edgedb-typelab`
- generate the query builder and interfaces with @edgedb/generate
- generate enums and value arrays for string literal types via a custom script (see `./src/generator.ts`)

## Configuration

This project aims to be an example setup that facilitates usage with the edgedb query builder and its interfaces. It specifically aims towards reducing clutter of imports from the query builder mixed with imports from the edgedb package and the generated types.

This is achieved by the following configuration:

### tsconfig.json

```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"],
      // This allows us to still explicitly import stuff from the query builder
      "edgeql-lib/*": ["./dbschema/edgeql-js/*"],
      // We only use this in ./src/edgedb.ts for explicit export of 'db'
      "edgeql-querybuilder": ["./dbschema/edgeql-js"],
      // This makes it clear where our types are coming from
      "edgeql-types/*": ["./dbschema/types/*"]
    },
    ...
  },
  // We only add the types folder and not the edgeql-js folder here!
  "include": ["./src/**/*.ts", "./dbschema/types/*.ts"],
  // Maybe we want to include this in the future, we are very restrictive here
  "exclude": ["node_modules/edgedb"]
}
```

### .vscode/settings.json

We prevent Intellisense from showing us imports from the edgeql-js and edgedb packages.

```json
{
  "typescript.preferences.autoImportFileExcludePatterns": [
    "./dbschema/edgeql-js/**",
    "./node_modules/edgedb/**"
  ]
}
```

## Examples

You can find some usage examples in `./src/examples/.ts`
