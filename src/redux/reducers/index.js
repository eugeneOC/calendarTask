/**
 * App Reducers
 */
import { combineReducers } from "redux";
import { reducer as modal } from "redux-modal";
// system
import calendarReducer from "./calendar/CalendarReducer";

const reducers = combineReducers({
  calendarState: calendarReducer,
  modal
});

export default reducers;
