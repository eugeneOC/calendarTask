/**
 * Calendar Reducers
 */
import { NotificationManager } from "react-notifications";
import * as Types from "Types/calendar/CalendarTypes";

const INIT_STATE = {
  eventAdd: {},
  isAddEvent: false,
  slotSelected: null,
  isSlotSelected: false,
  dayView: new Date(),
  viewIndex: 0,
  eventView: "My Calendar",
  eventViewOptions: ["My Calendar", "Company Calendar"],
  myEvents: [],
  allEvents: [],
  showEvents: [],
  eventsLoading: false
};

export default (state = INIT_STATE, action) => {
  let showEvents = [...state.showEvents];

  switch (action.type) {
    /**
     * Get All Events
     */
    case Types.GET_ALL_EVENTS:
      return {
        ...state,
        eventsLoading: true
      };
    case Types.GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        allEvents: action.payload.events,
        myEvents: action.payload.myEvents,
        showEvents: action.payload.myEvents,
        eventsLoading: false
      };
    case Types.GET_EVENT_FAILURE:
      NotificationManager.warning("Failed to get events from database.");
      return {
        ...state,
        eventsLoading: false
      };

    /**
     * Add Event
     */
    case Types.ADD_EVENT:
      return {
        ...state,
        eventsLoading: true
      };
    case Types.ADD_EVENT_SUCCESS:
      NotificationManager.success("Event Added");
      let event = action.payload;
      showEvents.push(event);

      return {
        ...state,
        eventsLoading: false,
        isAddEvent: false,
        showEvents: showEvents
      };
    case Types.ADD_EVENT_FAILURE:
      NotificationManager.warning("Failed to Add Event");
      return {
        ...state,
        eventsLoading: false,
        isAddEvent: false
      };

    /**
     * Delete Event
     */
    case Types.DELETE_EVENT:
      return {
        ...state,
        eventsLoading: true
      };
    case Types.DELETE_EVENT_SUCCESS:
      NotificationManager.success("Event has been sucessfully deleted");
      showEvents = showEvents.filter(e => e.id != action.payload);

      return {
        ...state,
        showEvents: showEvents,
        eventsLoading: true
      };
    case Types.DELETE_EVENT_FAILURE:
      NotificationManager.warning(
        action.payload + ". " + "As you might have deleted before"
      );
      return {
        ...state,
        eventsLoading: true
      };

    /**
     * Update Event
     */
    case Types.UPDATE_EVENT_SUCCESS:
      NotificationManager.success("Event Updated");

      let data = showEvents.map(item => {
        if (item.id == action.payload.id) {
          item = action.payload;
          item.start = new Date(action.payload.start);
          item.end = new Date(action.payload.end);
          return item;
        } else {
          return item;
        }
      });

      return {
        ...state,
        eventsLoading: false,
        isAddEvent: false,
        showEvents: data
      };
    case Types.UPDATE_EVENT_FAILURE:
      NotificationManager.warning("Failed to Update Event");
      return {
        ...state,
        eventsLoading: false,
        isAddEvent: false
      };

    default:
      return { ...state };
  }
};
