/**
 * Root Sagas
 */
import { all } from "redux-saga/effects";

// calendar
import calendarSagas from "./calendar/Calendar";

export default function* rootSaga(getState) {
  yield all([
    // Calendar
    calendarSagas()
  ]);
}
