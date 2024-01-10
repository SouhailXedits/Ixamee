"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
//import { toast } from "@/components/ui/use-toast"
import { useSidebar } from "@/store/use-sidebar"
import { cn } from "@/lib/utils"

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
})
interface EtablissementItemProps {
  data: { lyceName: string ,isChecked :boolean ,subLyceName :string }[];
}

export function EtablissementItem({ data }: EtablissementItemProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {collapsed } =useSidebar((state) =>state)


  function onSubmit(data: z.infer<typeof FormSchema>) {
  
  }

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
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {data.map((lyce) => (
                    <FormItem  // Add a unique key for each item
                      key={lyce.lyceName}
                      className={cn("flex items-center space-x-3", collapsed && "flex-col items-center w-full")}
                    >
                      <FormControl>
                        <RadioGroupItem
                          id={lyce.lyceName} // Add an id for each item
                          value={lyce.lyceName}
                          className="text-[#FBB800] border-[#F0F6F8] w-4 h-4"
                          // checked={lyce.isChecked}
                          defaultChecked ={lyce.isChecked}
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
