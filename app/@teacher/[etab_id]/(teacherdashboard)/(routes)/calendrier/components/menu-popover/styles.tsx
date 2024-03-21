// @mui
import { styled, alpha } from '@mui/material/styles';
import { MenuPopoverArrowValue } from './types';

//
const getArrowStyle = (arrow: MenuPopoverArrowValue, theme: any) => {
  const SIZE = 12;
  const POSITION = -(SIZE / 2);
  const borderStyle = `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`;

  const arrowStyles = {
    topLeft: {
      borderRadius: '0 0 3px 0',
      top: POSITION,
      borderBottom: borderStyle,
      borderRight: borderStyle,
    },
    topCenter: {
      borderRadius: '0 0 3px 0',
      top: POSITION,
      borderBottom: borderStyle,
      borderRight: borderStyle,
      left: 0,
      right: 0,
      margin: 'auto',
    },
    topRight: {
      borderRadius: '0 0 3px 0',
      top: POSITION,
      borderBottom: borderStyle,
      borderRight: borderStyle,
      right: 20,
    },
    bottomLeft: {
      borderRadius: '3px 0 0 0',
      bottom: POSITION,
      borderTop: borderStyle,
      borderLeft: borderStyle,
      left: 20,
    },
    bottomCenter: {
      borderRadius: '3px 0 0 0',
      bottom: POSITION,
      borderTop: borderStyle,
      borderLeft: borderStyle,
      left: 0,
      right: 0,
      margin: 'auto',
    },
    bottomRight: {
      borderRadius: '3px 0 0 0',
      bottom: POSITION,
      borderTop: borderStyle,
      borderLeft: borderStyle,
      right: 20,
    },
    leftTop: {
      borderRadius: '0 3px 0 0',
      top: 20,
      borderTop: borderStyle,
      borderRight: borderStyle,
      left: POSITION,
    },
    leftCenter: {
      borderRadius: '0 3px 0 0',
      top: 0,
      bottom: 0,
      margin: 'auto',
      borderTop: borderStyle,
      borderRight: borderStyle,
      left: POSITION,
    },
    leftBottom: {
      borderRadius: '0 3px 0 0',
      bottom: 20,
      borderTop: borderStyle,
      borderRight: borderStyle,
      left: POSITION,
    },
    rightTop: {
      borderRadius: '0 0 0 3px',
      top: 20,
      borderBottom: borderStyle,
      borderLeft: borderStyle,
      right: POSITION,
    },
    rightCenter: {
      borderRadius: '0 0 0 3px',
      top: 0,
      bottom: 0,
      margin: 'auto',
      borderBottom: borderStyle,
      borderLeft: borderStyle,
      right: POSITION,
    },
    rightBottom: {
      borderRadius: '0 0 0 3px
