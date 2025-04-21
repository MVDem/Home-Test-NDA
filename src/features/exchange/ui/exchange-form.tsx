'use client';

import { observer } from 'mobx-react-lite';
import { ExchangeState } from '@/store/exchange-store';
import { FieldsSection } from './fields-section';
import { ExchangeStoreProvider } from '@/store/exchange-store-context';
import { InformationSection } from './information-section';

const ExchangeForm = observer(
  ({ initialState }: { initialState: ExchangeState }) => {
    return (
      <ExchangeStoreProvider initialState={initialState}>
        <div className="p-6 max-w-xl mx-auto bg-[#343443] rounded-xl border border-[#46475e]">
          <h5 className="text-md font-bold mb-4 text-white">Crypto Exchange</h5>
          <FieldsSection type="FROM" />

          <InformationSection />

          <FieldsSection type="TO" />
        </div>
      </ExchangeStoreProvider>
    );
  }
);

export default ExchangeForm;
