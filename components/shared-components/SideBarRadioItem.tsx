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
import { redirect, useParams, usePathname, useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { useQueryClient } from '@tanstack/react-query';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';

const FormSchema = z.object({
  type: z.enum(['all', 'mentions', 'none'], {
    required_error: 'You need to select a notification type.',
  }),
});
interface SideBarRadioItemProps {
  data: any;
  // data: { name: string; id: number }[] | undefined;
}

export function SideBarRadioItem({ data }: SideBarRadioItemProps) {
  //
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  let Path = pathname.split('/');

  Path.shift();
  Path.shift();
  const currPath = Path.join('/');
  const params = useParams();
  const etabId = +params?.etab_id;

  const currentestab = data.find((res: any) => +res?.id === +etabId);
  const currentestabName = currentestab?.id;

  if (data.every((res: any) => +res?.id !== +etabId)) {
    if (+etabId === 0) {
      return;
    }
    router.push(`/${data[0]?.id}/${currPath}`);
  }

  const { collapsed } = useSidebar((state) => state);

  function onSubmit(data: z.infer<typeof FormSchema>) {}
  const shorting = (ch: string | null) => {
    let arr = ch?.split(' ');
    let newarr = '';
    arr?.map((arr) => {
      newarr += arr[0];
    });
    return newarr;
  };
  if (!data) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-3 space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }: { field: any }) => (
            <>
              {field?.value !== undefined &&
                (router.push(`/${field.value}/${currPath}`),
                queryClient.removeQueries({ queryKey: ['classe'] }))}
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={'' + currentestabName}
                    // onChange={(e: any) => router.push(`/${e.target?.value}`)}
                    className="flex flex-col space-y-1"
                  >
                    {data.map((lyce: any) => (
                      <FormItem // Add a unique key for each item
                        key={lyce.id}
                        className={cn(
                          'flex items-end gap-4 ',
                          collapsed && 'flex-col items-center w-full'
                        )}
                      >
                        <FormControl>
                          <RadioGroupItem
                            id={'' + lyce?.id} // Add an id for each item
                            value={'' + lyce?.id}
                            className="text-[#FBB800] border-[#F0F6F8] w-4 h-4"
                            // checked={+lyce.establishement?.id === etabId}
                            defaultChecked={+lyce?.id === etabId}
                          />
                        </FormControl>
                        <FormLabel
                          className={cn(
                            'w-full h-4 font-normal',
                            collapsed && 'w-[38px] overflow-hidden text-center'
                          )}
                        >
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <span className="">
                                {collapsed
                                  ? shorting(lyce?.name)
                                  : lyce?.name?.length > 20
                                  ? lyce?.name?.slice(0, 15) + '...'
                                  : lyce?.name}
                              </span>
                            </HoverCardTrigger>
                            <HoverCardContent className="max-w-[200px] bg-white p-2 rounded-lg text-pretty">
                              <span className="text-[#727272]  break-words w-[200px] text-md">
                                {lyce?.name}
                              </span>
                            </HoverCardContent>
                          </HoverCard>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
      </form>
    </Form>
  );
}
