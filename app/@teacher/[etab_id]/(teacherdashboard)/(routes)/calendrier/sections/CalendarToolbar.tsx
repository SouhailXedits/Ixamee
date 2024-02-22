'use client';
import { useState } from 'react';
// @mui
import { Stack, Typography, IconButton, MenuItem } from '@mui/material';
// utils
import { fDate } from '../utils/formatTime';
// hooks
import { ICalendarViewValue } from '../types';
// components
import Iconify from '../components/iconify';
import MenuPopover from '../components/menu-popover';
import useMediaMatch from '@rooks/use-media-match';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'dayGridMonth', label: 'Month', icon: 'ic:round-view-module' },

  { value: 'listWeek', label: 'Agenda', icon: 'ic:round-view-agenda' },
] as const;

// ----------------------------------------------------------------------

type Props = {
  date: Date;
  view: ICalendarViewValue;
  onToday: VoidFunction;
  onNextDate: VoidFunction;
  onPrevDate: VoidFunction;
  onChangeView: (newView: ICalendarViewValue) => void;
  colorOptions: any[];
  handleFilterEventColor: any;
  handleResetFilter: any;
};

export default function CalendarToolbar({
  date,
  view,
  colorOptions,
  onToday,
  onNextDate,
  onPrevDate,
  onChangeView,
  handleFilterEventColor,
  handleResetFilter,
}: Props) {
  const isDesktop = useMediaMatch('(min-width: 600px)');
  const [colors, setColors]: any = useState([]);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const selectedItem = VIEW_OPTIONS.filter((item) => item.value === view)[0];
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
        {/* {isDesktop && (
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
        )} */}
        <div></div>
        <Stack direction="row" alignItems="center" spacing={1} className=' !text-11'>
          <IconButton onClick={onPrevDate}>
            <Iconify icon="eva:arrow-ios-back-fill" />
          </IconButton>

          <Typography variant="h6">{`${month} ${year}`}</Typography>

          <IconButton onClick={onNextDate}>
            <Iconify icon="eva:arrow-ios-forward-fill" />
          </IconButton>
        </Stack>

        <Stack direction="row" className="calendar-filter-cont" alignItems="center" spacing={2}>
          <button className="calendar-todayBtn text-2 " onClick={onToday}>
            Aujourd’hui
          </button>
          {/* <div className="calendar-filter-btn">
            <div className="filter-colors">
              <div className="color-picker-container color-picker-filter-cont">
                {colorOptions.map((color: any) => (
                  <button
                    key={uuid()}
                    type="button"
                    onClick={() => {
                      const index = colors.findIndex(
                        (el: any) => el.dark === color.dark && el.light === color.light
                      );

                      const newColors =
                        index === -1
                          ? [...colors, color]
                          : [...colors.slice(0, index), ...colors.slice(index + 1)];

                      setColors(newColors);
                      handleFilterEventColor(newColors);
                    }}
                    className={`color-picker-color color-picker-filter ${
                      colors.findIndex(
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
                  onClick={() => {
                    setColors([]);
                    handleResetFilter();
                  }}
                >
                  <Cancel />
                </button>
              </div>
            </div>
          </div> */}
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
            onClick={() => {
              handleClosePopover();
              onChangeView(viewOption.value);
            }}
            sx={{
              ...(viewOption.value === view && {
                bgcolor: 'action.selected',
              }),
            }}
          >
            <Iconify icon={viewOption.icon} />
            {viewOption.label}
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
