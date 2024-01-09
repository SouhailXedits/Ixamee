'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { getFromLocalStorage, setInLocalStorage } from '@/app/_utils/localStorage';

const FormSchema = z.object({
  type: z.enum(['all', 'mentions', 'none'], {
    required_error: 'You need to select a notification type.',
  }),
});
interface EtablissementItemProps {
  data: { id: string; lyceName: string; isChecked: boolean; subLyceName: string }[];
}

// ... (previous imports and code)

// ... (previous imports and code)

export function EtablissementItem({ data }: EtablissementItemProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { collapsed } = useSidebar((state) => state);

  function onSubmit(data: z.infer<typeof FormSchema>) {}

  const handleRadioChange = (value: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('selectedLycee', value);
    }
  };


  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.localStorage &&
      !getFromLocalStorage('selectedLycee')
    ) {
      setInLocalStorage('selectedLycee', data[0].id);
    }
        
  }, [data]);
  const defaultSelectedLycee = getFromLocalStorage('selectedLycee') || data[0].id
  console.log(defaultSelectedLycee + '', data)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-3 space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleRadioChange(value);
                  }}
                  defaultValue={defaultSelectedLycee + ''}
                  className="flex flex-col space-y-1"
                >
                  {data.map((lyce) => (
                    <FormItem
                      key={lyce.lyceName}
                      className={cn(
                        'flex items-center space-x-3',
                        collapsed && 'flex-col items-center w-full'
                      )}
                    >
                      <FormControl>
                        <RadioGroupItem
                          id={lyce.lyceName}
                          value={lyce.id}
                          className="text-[#FBB800] border-[#F0F6F8] w-4 h-4"
                          defaultChecked={lyce.id === defaultSelectedLycee + ''}
                        />
                      </FormControl>
                      <FormLabel className="w-full h-10 font-normal">
                        {collapsed ? lyce.subLyceName : lyce.lyceName}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
