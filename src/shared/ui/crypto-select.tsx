'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn-ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../shadcn-ui/command';
import { Button } from '../shadcn-ui/button';
import { cn } from '../lib/utils';
import { Coin } from '@/entities/coin/types';

interface CryptoSelectProps {
  coins: Coin[];
  selected: Coin | null;
  onSelect: (id: number) => void;
}

export function CryptoSelect({ coins, selected, onSelect }: CryptoSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="h-full w-1/3 rounded-none bg-[#36324a] border-none flex items-center justify-between text-white text-xl hover:bg-[#36324a] hover:cursor-pointer hover:text-white focus:outline-none focus:ring-0 focus:ring-offset-0"
            onClick={() => setOpen((prev) => !prev)}
          >
            {selected ? `${selected.symbol}` : 'Select coin'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search coin..." />
            <CommandEmpty>No coins found.</CommandEmpty>
            <CommandGroup>
              {coins.map((coin) => (
                <CommandItem
                  key={coin.id}
                  onSelect={() => {
                    onSelect(coin.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selected?.id === coin.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {coin.symbol} - {coin.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
