import { forwardRef, Ref, SVGProps } from 'react';
import { Icon, IconProps } from '@iconify/react';
import { Box, BoxProps } from '@mui/material';

interface IconifyProps extends BoxProps {
  icon: string;
  width?: number;
  height?: number;
}

const Iconify = forwardRef<SVGElement, IconifyProps>(({ icon, width = 20, height = 20, sx, ...other }, ref) => (
  <Box
    ref={ref as Ref<SVGElement>}
    component={Icon}
    icon={icon}
    sx={{ width, height, ...sx }}
    {...other}
  />
));

export default Iconify;
