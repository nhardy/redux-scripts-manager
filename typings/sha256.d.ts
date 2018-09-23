/**
 * TODO: Remove when DefinitelyTypes/DefinitelyTypes#29130 is merged
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/29130
 */
declare module 'sha256' {
  // Type definitions for sha256 0.2
  // Project: https://github.com/cryptocoinjs/sha256
  // Definitions by: Nathan Hardy <https://github.com/nhardy>
  // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

  /// <reference types="node" />

  type Message = string | Buffer | number[];

  interface ISha256 {
    (message: Message, options?: { asString: true }): string;
    (message: Message, options: { asBytes: true }): number[];
  }

  interface ISha256WithX2 extends ISha256 {
    x2: ISha256;
  }

  const sha256: ISha256WithX2;

  export = sha256;
}
