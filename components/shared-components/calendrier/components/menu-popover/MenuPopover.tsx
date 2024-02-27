// @mui
import { Popover, PopoverOrigin } from '@mui/material';
//
import getPosition from './getPosition';
import { StyledArrow } from './styles';
import { MenuPopoverProps } from './types';

// ----------------------------------------------------------------------

export default function MenuPopover({
  open,
  children,
  arrow = 'top-right',
  disabledArrow,
  sx,
  ...other
}: MenuPopoverProps) {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow);

  return (
    <div className='calendar-menu-popover'>
      <Popover
        className='calendar-menu-popover'
        open={Boolean(open)}
        anchorEl={open}
        anchorOrigin={anchorOrigin as PopoverOrigin}
        transformOrigin={transformOrigin as PopoverOrigin}
        PaperProps={{
          sx: {
            p: 1,
            width: 'auto',
            overflow: 'inherit',
            ...style,
            '& .MuiMenuItem-root': {
              px: 1,

              typography: 'poppins',
              borderRadius: 0.75,
              fontSize: '1.5rem',
              '& svg': { mr: 2, width: 30, height: 30, flexShrink: 0 },
            },
            ...sx,
          },
        }}
        {...other}
      >
        {!disabledArrow && <StyledArrow arrow={arrow} />}

        {children}
      </Popover>
    </div>
  );
}
