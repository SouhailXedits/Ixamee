'use client';

import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DatePickerWithRange({
  onChange,
  className,
  name,
  filters,
}: {
  className?: React.HTMLAttributes<HTMLDivElement>;
  onChange: (date: any) => void;
  name?: string;
  filters?: any;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const handleDateChange = (newDates: any) => {
    setDate(newDates);

    // Call the onChange prop with the updated date range
    
    if(name === 'created_at'){
      onChange({
        ...filters,
        created_at: {
          from: newDates.from,
          to: addDays(newDates.to, 1),
        },
      });
    } else {
      onChange({
        ...filters,
        dateRange:{
          from: newDates.from,
          to: addDays(newDates.to, 1),
        },
      });
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Selectionner date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            // onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
