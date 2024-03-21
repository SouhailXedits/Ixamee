import { useState } from 'react';
import {
  Stack,
  Typography,
  IconButton,
  MenuItem,
  Button,
  useMediaQuery,
} from '@mui/material';
import { fDate } from '../utils/formatTime';
import { ICalendarViewValue } from '../types';
import Iconify from '../components/iconify';
import MenuPopover from '../components/menu-popover';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  setCalendarView,
  setSelectedColors,
  resetFilter,
} from '../redux/slices/calendarSlice';

const VIEW_OPTIONS = [
  { value: 'dayGridMonth', label: 'Month', icon: 'ic:round-view-module' },
  { value: 'listWeek', label: 'Agenda', icon: 'ic:round-view-agenda' },
];

type Props = {
  date: Date;
};

export default function CalendarToolbar({ date }: Props) {
  const isDesktop = useMediaQuery('(min-width: 600px)');
  const dispatch = useAppDispatch();
  const view = useAppSelector((state) => state.calendar.view);
  const selectedColors = useAppSelector((state) => state.calendar.selectedColors);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangeView = (view: ICalendarViewValue) => {
    dispatch(setCalendarView(view));
    handleClosePopover();
  };

  const handleColorClick = (color: any) => {
    const index = selectedColors.findIndex((el: any) => el.dark === color.dark);
    if (index === -1) {
      dispatch(setSelectedColors([...selectedColors, color]));
    } else {
      dispatch(
        setSelectedColors([...selectedColors.slice(0, index), ...selectedColors.slice(index + 1)])
      );
    }
  };

  const handleResetFilterClick = () => {
    dispatch(resetFilter());
  };

  const [month, year] = [dayjs(date).locale('fr').format('MMMM'), dayjs(date).format('YYYY')];

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="toolbar-cont"
        sx={{ p: 2.5, pr: 2 }}
      >
        {isDesktop && (
          <Button
            color="inherit"
            onClick={handleOpenPopover}
            startIcon={<Iconify icon={selectedItem.icon} />}
            endIcon={<Iconify icon="eva:chevron-down-fill" />}
            sx={{
              py: 0.5,
              pl: 1.5,
              bgcolor: 'action.selected',
              '& .MuiButton-endIcon': { ml: 0.5 },
            }}
          >
            {selectedItem.label}
          </Button>
        )}
        <div></div>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => dispatch(setCalendarView('previous'))}>
            <Iconify icon="eva:arrow-ios-back-fill" />
          </IconButton>

          <Typography variant="h6">{`${month} ${year}`}</Typography>

          <IconButton onClick={() => dispatch(setCalendarView('next'))}>
            <Iconify icon="eva:arrow-ios-forward-fill" />
          </IconButton>
        </Stack>

        <Stack direction="row" className="calendar-filter-cont" alignItems="center" spacing={2}>
          <Button variant="contained" onClick={() => dispatch(setCalendarView('today'))}>
            Aujourd’hui
          </Button>
          <div className="calendar-filter-btn">
            <div className="filter-colors">
              <div className="color-picker-container color-picker-filter-cont">
                {COLOR_OPTIONS.map((color: any) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => handleColorClick(color)}
                    className={`color-picker-color color-picker-filter ${
                      selectedColors.findIndex(
                        (el: any) => el.dark === color.dark && el.light === color.light
                      ) > -1
                        ? 'selected'
                        : ''
                    }`}
                    style={{
                      borderLeft: `5px solid ${color?.dark} `,
                      backgroundColor: color?.light,
                    }}
                  ></button>
                ))}
                <button
                  className="color-picker-color"
                  onClick={handleResetFilterClick}
                >
                  <Cancel />
                </button>
              </div>
            </div>
          </div>
        </Stack>
      </Stack>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="top-left"
        sx={{ width: 160 }}
      >
        {VIEW_OPTIONS.map((viewOption) => (
          <MenuItem
            key={viewOption.value}
            onClick={() => handleChangeView(viewOption.value)}
           
