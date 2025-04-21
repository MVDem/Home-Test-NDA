import { Coin } from '@/entities/coin/types';
import { getRateFromServer } from '@/features/exchange/actions/exchange';
import { makeAutoObservable, reaction, runInAction } from 'mobx';

export interface ExchangeState {
  coins: Coin[];
  fromCoin: Coin | null;
  toCoin: Coin | null;
  fromAmount: string;
  toAmount: string;
  rate: number | null;
  isLoading: boolean;
}

export class ExchangeStore implements ExchangeState {
  coins: Coin[] = [];
  fromCoin: Coin | null = null;
  toCoin: Coin | null = null;
  fromAmount = '';
  toAmount = '';
  rate: number | null = null;
  isFromAmountInput = true;
  isLoading = false;

  constructor(initialState?: Partial<ExchangeState>) {
    Object.assign(this, initialState);
    makeAutoObservable(this);

    reaction(
      () => [
        this.fromCoin?.id,
        this.toCoin?.id,
        this.fromAmount,
        this.toAmount,
        this.isFromAmountInput,
      ],
      () => {
        this.fetchRate();
      }
    );
  }

  setFromCoin(id: number) {
    const coin = this.coins.find((c) => c.id === id);
    if (coin) this.fromCoin = coin;
  }

  setToCoin(id: number) {
    const coin = this.coins.find((c) => c.id === id);
    if (coin) this.toCoin = coin;
  }

  setFromAmount(amount: string) {
    this.fromAmount = amount;
    this.isFromAmountInput = true;
  }

  setToAmount(amount: string) {
    this.toAmount = amount;
    this.isFromAmountInput = false;
  }

  reverseCoins() {
    const temp = this.fromCoin;
    this.fromCoin = this.toCoin;
    this.toCoin = temp;

    const tempAmount = this.fromAmount;
    this.fromAmount = this.toAmount;
    this.toAmount = tempAmount;

    this.isFromAmountInput = true;
  }

  async fetchRate() {
    if (!this.fromCoin || !this.toCoin) return;

    const from = this.fromCoin.id;
    const to = this.toCoin.id;

    const amount = this.isFromAmountInput
      ? parseFloat(this.fromAmount)
      : parseFloat(this.toAmount);

    if (isNaN(amount) || amount <= 0) return;

    const param = this.isFromAmountInput ? 'fromAmount' : 'toAmount';

    this.isLoading = true;

    try {
      const data = await getRateFromServer(from, to, param, amount);
      runInAction(() => {
        this.rate = data.rate;
        if (this.isFromAmountInput) {
          this.toAmount = data.estimatedAmount.toString();
        } else {
          this.fromAmount = data.estimatedAmount.toString();
        }
      });
    } catch (error) {
      console.error('Ошибка загрузки курса:', error);
      runInAction(() => {
        this.rate = null;
        this.toAmount = '';
        this.fromAmount = '';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
