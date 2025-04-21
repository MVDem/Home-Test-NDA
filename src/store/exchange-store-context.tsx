'use client';

import { createContext, useContext } from 'react';
import { ExchangeStore, ExchangeState } from './exchange-store';

const ExchangeStoreContext = createContext<ExchangeStore | null>(null);

export function ExchangeStoreProvider({
  initialState,
  children,
}: {
  initialState: Partial<ExchangeState>;
  children: React.ReactNode;
}) {
  const store = new ExchangeStore(initialState);
  return (
    <ExchangeStoreContext.Provider value={store}>
      {children}
    </ExchangeStoreContext.Provider>
  );
}

export function useExchangeStoreCtx() {
  const store = useContext(ExchangeStoreContext);
  if (!store)
    throw new Error(
      'useExchangeStoreCtx must be used within ExchangeStoreProvider'
    );
  return store;
}
