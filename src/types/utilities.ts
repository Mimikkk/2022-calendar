export type Unpostfix<Value extends string, Postfix extends string> = Value extends `${infer Prefix}${Postfix}`
  ? Prefix
  : never;
