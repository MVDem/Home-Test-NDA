import { getCoinsFromServer } from '@/entities/coin/actions/coins';
import { Coin } from '@/entities/coin/types';
import { getRateFromServer } from '@/features/exchange/actions/exchange';
import ExchangeForm from '@/features/exchange/ui/exchange-form';
import Image from 'next/image';

export default async function Home() {
  const coins = await getCoinsFromServer();

  const defaultFrom = coins.find((c: Coin) => c.symbol === 'BTC');
  const defaultTo = coins.find((c: Coin) => c.symbol === 'ETH');

  let rateData = null;

  if (defaultFrom && defaultTo) {
    rateData = await getRateFromServer(
      defaultFrom.id,
      defaultTo.id,
      'fromAmount',
      1
    );
  }

  return (
    <main
      className="flex h-full w-full"
      style={{
        backgroundImage:
          'url(https://changenow.io/dist/f8f35b771d96ff153613.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="md:max-w-[868px] xl:max-w-[1037px] flex flex-col md:flex-row mx-auto mt-16 px-4 gap-2">
        <div className="text-center md:text-start mb-12 md:w-[45%] mt-10 flex flex-col justify-around">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Limitless Web3.0 Crypto Exchange
          </h2>
          <p className="text-lg text-[#aeb0bd] mt-4 xl:text-xl">
            Buy, sell, swap crypto: fast & secure
          </p>
          <div className=" hidden md:flex flex-row gap-2">
            <Image
              width={28}
              height={28}
              src="https://changenow.io/icons/checkmark-green-circle.svg"
              alt="Checkmark"
            />
            <p className="text-lg text-white xl:text-xl">Licensed service</p>
          </div>
          <div className=" hidden md:flex flex-row gap-2">
            <Image
              width={28}
              height={28}
              src="https://changenow.io/icons/shield-blue.svg"
              alt="Checkmark"
            />
            <p className="text-lg text-white xl:text-xl">Trusted since 2017</p>
          </div>
        </div>
        <div className=" md:w-[55%]">
          <ExchangeForm
            initialState={{
              coins,
              fromCoin: defaultFrom,
              toCoin: defaultTo,
              fromAmount: '1',
              toAmount: rateData?.estimatedAmount?.toString() ?? '',
              rate: rateData?.rate ?? null,
              isLoading: false,
            }}
          />
        </div>
      </div>
    </main>
  );
}
