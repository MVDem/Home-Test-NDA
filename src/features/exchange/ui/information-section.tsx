import { useExchangeStoreCtx } from '@/store/exchange-store-context';
import { observer } from 'mobx-react-lite';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';

export const InformationSection = observer(() => {
  const store = useExchangeStoreCtx();
  return (
    <div className="min-h-16 flex justify-between items-center ">
      <div className="text-xs text-white pl-4">{`Estimated rate:
                  1 ${store.fromCoin?.symbol} ~ ${store.rate} ${store.toCoin?.symbol}`}</div>
      <button
        onClick={() => store.reverseCoins()}
        className="h-8 w-8 flex items-center justify-center rounded bg-[#3e3f57] transition"
      >
        <FaArrowRightArrowLeft color="#00c26f" rotate={90} />
      </button>
    </div>
  );
});
