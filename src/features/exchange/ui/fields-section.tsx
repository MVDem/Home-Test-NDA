'use client';

import { Input } from '@/shared/shadcn-ui/input';
import { CryptoSelect } from '@/shared/ui/crypto-select';
import { useExchangeStoreCtx } from '@/store/exchange-store-context';
import { observer } from 'mobx-react-lite';
import BarLoader from 'react-spinners/BarLoader';

import { useState } from 'react';
import { amountSchema } from '../schemas';

export const FieldsSection = observer(({ type }: { type: 'FROM' | 'TO' }) => {
  const store = useExchangeStoreCtx();
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (value: string) => {
    const validation = amountSchema.safeParse(value);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }
    setError(null);
    if (type === 'FROM') {
      store.setFromAmount(value);
    } else {
      store.setToAmount(value);
    }
  };

  return (
    <>
      <div className="flex items-end justify-between border border-[#46475e] rounded-md bg-[#3e3e59] h-16 overflow-hidden">
        <div className="flex flex-col pl-4 w-2/3">
          {store.isLoading && type === 'TO' ? (
            <BarLoader
              color={'#00c26f'}
              height={5}
              width={100}
              className="mb-2"
            />
          ) : (
            <>
              <label className="text-[#aeb0bd] text-sm">
                {type === 'FROM' ? 'You Send' : 'You Get'}
              </label>
              <Input
                className="border-none text-white md:text-xl p-0 focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none bg-[#3e3e59] placeholder:text-[#aeb0bd]"
                value={
                  type === 'FROM'
                    ? store.fromAmount
                    : parseFloat(store.toAmount).toFixed(5)
                }
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </>
          )}
        </div>
        <CryptoSelect
          coins={store.coins}
          selected={type === 'FROM' ? store.fromCoin : store.toCoin}
          onSelect={
            type === 'FROM'
              ? (symbol) => store.setFromCoin(symbol)
              : (symbol) => store.setToCoin(symbol)
          }
        />
      </div>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </>
  );
});
