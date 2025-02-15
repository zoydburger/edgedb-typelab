import { generateTypes } from "./generator";

const [, , methodName] = process.argv;

const defaultConsole = {
  log: console.log,
  warn: console.warn,
  error: console.error,
  info: console.info,
  debug: console.debug,
};

const runnerFunctions: Record<
  string,
  () => Promise<string> | string | Promise<void> | void
> = {
  generateTypes,
} as const;

const functionToCall =
  runnerFunctions[methodName as keyof typeof runnerFunctions];

if (!functionToCall) {
  console.log(Object.keys(runnerFunctions));
  throw new Error(`Invalid method name: ${methodName}`);
}

function suppressConsoleOutput() {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.info = () => {};
  console.debug = () => {};
}

function restoreConsoleOutput() {
  Object.assign(console, defaultConsole);
}

/**
 * *❗ Do not remove these console outputs ❗*
 * The stdout is used in bash scripts to read the function output
 */
// suppressConsoleOutput()
try {
  const output = await functionToCall();
  restoreConsoleOutput();
  if (output) {
    console.log(output);
  }
  process.exit(0);
} catch (error) {
  restoreConsoleOutput();
  console.error(error);
  process.exit(1);
}
