import type { FC, PropsWithChildren } from 'react';
import { createContext as create, useContext } from 'react';

export function createContext<State>(provider: () => State, initial?: State): [() => State, FC<PropsWithChildren>];
export function createContext<State, Args>(
  provider: (args: Args) => State,
  initial?: State,
): [() => State, FC<PropsWithChildren<Args>>];

export function createContext<State, Args>(
  provider: ((args: Args) => State) | (() => State),
  initial?: State,
): readonly [() => State, FC<PropsWithChildren<Args>> | FC<PropsWithChildren>] {
  const Context = create<State | undefined>(initial ?? undefined);

  return [
    () => useContext(Context)!,
    (({ children, ...props }) => <Context.Provider value={provider(props as Args)}>{children}</Context.Provider>) as FC<
      PropsWithChildren<Args>
    >,
  ] as const;
}
