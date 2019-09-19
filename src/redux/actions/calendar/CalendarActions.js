/**
 * Redux App Settings Actions
 */
import * as types from "Types/calendar/CalendarTypes";

/**
 * Get All Events
 */
export const getAllEvents = (filter, start, end, id) => ({
  type: types.GET_ALL_EVENTS,
  payload: {
    filter,
    start,
    end,
    id
  }
});
export const getAllEventsSuccess = (events, myEvents) => ({
  type: types.GET_ALL_EVENTS_SUCCESS,
  payload: { events, myEvents }
});
export const getAllEventsFailure = (events, myEvents) => ({
  type: types.GET_ALL_EVENTS_FAILURE,
  payload: { events, myEvents }
});

/**
 * Add Events
 */
export const onChangeAddEvent = (field, value) => ({
  type: types.ON_CHANGE_ADD_EVENT,
  payload: { field, value }
});
export const addEvent = (item, type) => ({
  type: types.ADD_EVENT,
  payload: { item, type }
});
export const addEventSuccess = event => ({
  type: types.ADD_EVENT_SUCCESS,
  payload: event
});
export const addEventFailure = err => ({
  type: types.ADD_EVENT_FAILURE,
  payload: err
});

export const deleteEvent = id => ({
  type: types.DELETE_EVENT,
  payload: id
});

/**
 * Delete Events
 */
export const deleteEventSuccess = item => ({
  type: types.DELETE_EVENT_SUCCESS,
  payload: item
});

export const deleteEventFailure = item => ({
  type: types.DELETE_EVENT_FAILURE,
  payload: item
});

/**
 * Update Events
 */
export const updateEvent = id => ({
  type: types.UPDATE_EVENT,
  payload: id
});

export const updateEventSuccess = item => ({
  type: types.UPDATE_EVENT_SUCCESS,
  payload: item
});

export const updateEventFailure = item => ({
  type: types.UPDATE_EVENT_FAILURE,
  payload: item
});

/**
 * Get Event Failure
 */
export const getEventFailure = err => ({
  type: types.GET_EVENT_FAILURE,
  payload: err
});
