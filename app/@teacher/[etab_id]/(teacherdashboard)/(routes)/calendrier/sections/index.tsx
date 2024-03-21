// src/components/Calendar/index.js

import StyledCalendar from './styles';
import CalendarForm from './CalendarForm';
import CalendarToolbar from './CalendarToolbar';
import CalendarFilterDrawer from './CalendarFilterDrawer';

// Export all components as the default export
export { StyledCalendar as default, CalendarForm, CalendarToolbar, CalendarFilterDrawer };


// Another file importing the Calendar components
import { CalendarForm, CalendarToolbar } from './components/Calendar';
