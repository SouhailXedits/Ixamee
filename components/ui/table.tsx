import * as React from 'react';

import { cn } from '@/lib/utils';

type TableProps = React.HTMLAttributes<HTMLTableElement>;
const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, role = 'grid', ariaLabel, ...props }, ref) => (
    <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} role={role} aria-label={ariaLabel}>
      <thead>
        <tr>
          <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground" />
        </tr>
      </thead>
      <tbody className={cn('[&_tr:last-child]:border-0', className)} />
      <tfoot className={cn('border-t bg-muted/50 font-medium', className)} />
    </table>
  )
);
Table.displayName = 'Table';

type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;
const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
);
TableHeader.displayName = 'TableHeader';

type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;
const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
);
TableBody.displayName = 'TableBody';

type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;
const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => <tfoot ref={ref} className={cn('border-t bg-muted/50 font-medium', className)} {...props} />
);
TableFooter.displayName = 'TableFooter';

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b  transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;
const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, colSpan, role = 'columnheader', scope = 'col', ...props }, ref) => (
    <th
      ref={ref}
      colSpan={colSpan}
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
        className
      )}
      {...props}
      role={role}
      scope={scope}
    />
  )
);
TableHead.displayName = 'TableHead';

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, colSpan, ...props }, ref) => {
    if (colSpan && colSpan > 1) {
      return (

