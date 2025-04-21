'use client';

import { Input } from '@/shared/shadcn-ui/input';
import { CryptoSelect } from '@/shared/ui/crypto-select';
import { useExchangeStoreCtx } from '@/store/exchange-store-context';
import { observer } from 'mobx-react-lite';
import BarLoader from 'react-spinners/BarLoader';

export const FieldsSection = observer(({ type }: { type: 'FROM' | 'TO' }) => {
  const store = useExchangeStoreCtx();

  return (
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
              className="border-none text-white md:text-xl p-0"
              value={type === 'FROM' ? store.fromAmount : store.toAmount}
              onChange={(e) => {
                if (type === 'FROM') {
                  store.setFromAmount(e.target.value);
                } else {
                  store.setToAmount(e.target.value);
                }
              }}
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
  );
});
