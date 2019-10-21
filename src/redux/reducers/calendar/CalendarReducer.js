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

let allShowEvents = [];
let showEvents = [];


export default (state = INIT_STATE, action) => {
  let showEvents = [...state.showEvents];
  let myData = [];
  // console.log("+++++++++++showEvents",showEvents);
        function recurrence(dst, src) {
        dst["allDay"] = src["allDay"];
        dst["createdAt"] = src["createdAt"];
        dst["createdBy"] = src["createdBy"];
        dst["creatorInfo"] = src["creatorInfo"];
        dst["desc"] = src["desc"];
        dst["eventableType"] = src["eventableType"];
        dst["id"] = src["id"];
        dst["location"] = src["location"];
        dst["participants"] = src["participants"];
        dst["recurrence"] = src["recurrence"];

        dst["title"] = src["title"];
        dst["updatedAt"] = src["updatedAt"];
        dst["updatedBy"] = src["updatedBy"];
        dst["updaterInfo"] = src["updaterInfo"];
        dst["userId"] = src["userId"];
        dst["userInfo"] = src["userInfo"];
        dst["__proto__"] = src["__proto__"];

        return dst;
      }

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
      NotificationManager.success("All events are loaded!");
      // allShowEvents = showEvents;
      // myData = action.payload.myEvents;
      // console.log("ShowEvents", action.payload.myEvents);
      showEvents = action.payload.myEvents;

      // i = 3;
      // myData.push(showEvents[i]);
      // let count = 0;
      let daily = [];
      let weekly = [];
      let monthly = [];
      let yearly = [];
      var d = 0;
      var m = 0;
      var w = 0;
      var y = 0;
      var i = 0;
      var j = 0;
      let tmp = [];
      var start_date = "", end_date = "";
      // console.log(showEvents.length);
      for (i = 0; i < showEvents.length; i++) {
        switch (showEvents[i]["recurrence"]) {
          case "Daily":
            daily[d++] = i;
            break;
          case "Weekly":
            weekly[w++] = i;
            break;
          case "Monthly":
            monthly[m++] = i;
            break;
          case "Yearly":
            yearly[y++] = i;
            break;
          case "No repeat":
            myData.push(showEvents[i]);
            // code...
            break;
        }
      }
      // console.log(d,w,m,y);
      i = 0;



      while(i < d) {
               
        tmp = [];
        
        tmp = showEvents[daily[i]];
        start_date = Date.parse(tmp["start"]);
        end_date = Date.parse(tmp["end"]);

        for(j = 0; j < 365; j++) {
          let temp = {};

          temp = recurrence(temp, showEvents[daily[i]]);
          temp["start"] = new Date(start_date);
          temp["end"] = new Date(end_date);

          // console.log(temp["start"]);

          start_date +=  86400000;
          end_date +=  86400000;

          myData.push(temp);
        }
        i++;
      }





      i = 0;
      while(i < w) {
        tmp = [];
        // myData = [];
        tmp = showEvents[weekly[i]];
        start_date = Date.parse(tmp["start"]);
        end_date = Date.parse(tmp["end"]);


        for(j = 0; j < 52; j++) {
          let temp = {};

          temp = recurrence(temp, showEvents[weekly[i]]);
          temp["start"] = new Date(start_date);
          temp["end"] = new Date(end_date);

          start_date +=  604800000;
          end_date +=  604800000;

          myData.push(temp);
        }
        i++;
      }


      i = 0;
      while(i < m) {
        tmp = [];
        // myData = [];
        tmp = showEvents[monthly[i]];
        start_date = Date.parse(tmp["start"]);
        end_date = Date.parse(tmp["end"]);
        // console.log(start_date);


        for(j = 0; j < 12; j++) {
          let temp = {};

          temp = recurrence(temp, showEvents[monthly[i]]);
          var start1 = new Date(start_date);
          var end1 = new Date(end_date);
          start1.setMonth(start1.getMonth() + j);
          end1.setMonth(end1.getMonth() + j);
          // console.log(start1);
          temp["start"] = start1;
          temp["end"] = end1;
          // console.log(temp["start"]);

          // start_date +=  2678400000;
          // end_date +=  2678400000;

          myData.push(temp);
        }
        i++;
      }

      i = 0;
      while(i < y) {
        tmp = [];
        // myData = [];
        tmp = showEvents[yearly[i]];
        // console.log(tmp);
        start_date = Date.parse(tmp["start"]);
        end_date = Date.parse(tmp["end"]);


        for(j = 0; j < 10; j++) {
          let temp = {};

          temp = recurrence(temp, showEvents[yearly[i]]);
          var start1 = new Date(start_date);
          var end1 = new Date(end_date);
          start1.setFullYear(start1.getFullYear() + j);
          end1.setFullYear(end1.getFullYear() + j);
          // console.log(start1);
          temp["start"] = start1;
          temp["end"] = end1;
          myData.push(temp);
        }
        i++;
      }
      allShowEvents = myData;
    //   console.log(myData);

      
      return {
        ...state,
        allEvents: action.payload.events,
        myEvents: action.payload.myEvents,
        showEvents: myData,
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
    case Types.GET_EVENT_SEARCH:
      let searchEvents = [];
      // console.log(action.payload.filter);
        for(let i = 0; i < allShowEvents.length; i ++) {
          if(allShowEvents[i].title.toLowerCase().indexOf(action.payload.filter) > -1) {
            if(action.payload.state[allShowEvents[i].eventableType] == true)
            // console.log(action.payload.state[allShowEvents[i].eventableType]);
              searchEvents.push(allShowEvents[i]);
            // console.log(allShowEvents[i].title)
          }
        }

      return{
        ...state,
        showEvents: searchEvents
      };
    case Types.ADD_EVENT:
      return {
        ...state,
        eventsLoading: true
      };
    case Types.ADD_EVENT_SUCCESS:

      NotificationManager.success("Event Added");

      let event = action.payload;
      // console.log(event.recurrence);
      switch (event.recurrence) {
        case "Daily":
          start_date = Date.parse(event["start"]);
          end_date = Date.parse(event["end"]);

          for(var j = 0; j < 365; j++) {
            let temp = {};
            temp = recurrence(temp, event);
            
            temp["start"] = new Date(start_date);
            temp["end"] = new Date(end_date);

            start_date +=  86400000;
            end_date +=  86400000;
            
            showEvents.push(temp);
          }
          break;
        case "Weekly":
          start_date = Date.parse(event["start"]);
          end_date = Date.parse(event["end"]);

          for(var j = 0; j < 52; j++) {
            let temp = {};
            temp = recurrence(temp, event);
            
            temp["start"] = new Date(start_date);
            temp["end"] = new Date(end_date);

            start_date +=  604800000;
            end_date +=  604800000;
            
            showEvents.push(temp);
          }
          break;
        case "Monthly":
          start_date = Date.parse(event["start"]);
          end_date = Date.parse(event["end"]);

          for(var j = 0; j < 12; j++) {
            let temp = {};
            temp = recurrence(temp, event);
            var start1 = new Date(start_date);
            var end1 = new Date(end_date);
            start1.setMonth(start1.getMonth() + j);
            end1.setMonth(end1.getMonth() + j);
            // console.log(start1);
            temp["start"] = start1;
            temp["end"] = end1;
            
            showEvents.push(temp);
          }
          break;
        case "Yearly":
          start_date = Date.parse(event["start"]);
          end_date = Date.parse(event["end"]);

          for(var j = 0; j < 10; j++) {
            let temp = {};
            temp = recurrence(temp, event);
            var start1 = new Date(start_date);
            var end1 = new Date(end_date);
            start1.setFullYear(start1.getFullYear() + j);
            end1.setFullYear(end1.getFullYear() + j);
            // console.log(start1);
            temp["start"] = start1;
            temp["end"] = end1;
            
            showEvents.push(temp);
          }
          break;
        
        default:
          showEvents.push(event);
          // console.log("okau");
          // code...
          break;
      }
      allShowEvents = showEvents;
      // myData.push(event);
      // allShowEvents = showEvents;
      // allShowEvents = myData;
      // console.log(action.type);
      return {
        ...state,
        eventsLoading: false,
        isAddEvent: false,
        // showEvents: showEvents
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
      allShowEvents = showEvents;

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
      // console.log(action.payload);
      // let data = showEvents.map(item => {
      //   console.log(action.payload.id);
      //   if (item.id == action.payload.id) {
      //     item = action.payload;
      //     item.start = new Date(action.payload.start);
      //     item.end = new Date(action.payload.end);
      //     return item;
      //   } else {
      //     return item;
      //   }
      // });
      // console.log(data);
      let data = {};
      for (var i = 0; i < showEvents.length; i++) {
        if(showEvents[i]["id"] == action.payload.id) {
          // console.log(showEvents[j]["id"]);
          switch (action.payload["recurrence"]) {
            case "No repeat":
              data = action.payload;
              break;

            case "Daily":
              start_date = Date.parse(action.payload["start"]);
              end_date = Date.parse(action.payload["end"]);

              for(var j = 0; j < 365; j++) {
                let temp = {};
                temp = recurrence(temp, action.payload);
                
                temp["start"] = new Date(start_date);
                temp["end"] = new Date(end_date);

                start_date +=  86400000;
                end_date +=  86400000;
                showEvents[i+j] = temp;
              }
              break;

            case "Weekly":
              start_date = Date.parse(action.payload["start"]);
              end_date = Date.parse(action.payload["end"]);

              for(var j = 0; j < 52; j++) {
                let temp = {};
                temp = recurrence(temp, action.payload);
                
                temp["start"] = new Date(start_date);
                temp["end"] = new Date(end_date);

                start_date +=  604800000;
                end_date +=  604800000;
                showEvents[i+j] = temp;
              }
              break;

            case "Monthly":
            // start_date.mo
              start_date = Date.parse(action.payload["start"]);
              end_date = Date.parse(action.payload["end"]);

              for(var j = 0; j < 12; j++) {
                let temp = {};
                temp = recurrence(temp, action.payload);
                var start1 = new Date(start_date);
                var end1 = new Date(end_date);
                start1.setMonth(start1.getMonth() + j);
                end1.setMonth(end1.getMonth() + j);
                // console.log(start1);
                temp["start"] = start1;
                temp["end"] = end1;
                showEvents[i+j] = temp;
              }
              break;

            case "Yearly":
              start_date = Date.parse(action.payload["start"]);
              end_date = Date.parse(action.payload["end"]);

              for(var j = 0; j < 10; j++) {
                let temp = {};
                temp = recurrence(temp, action.payload);
                
                var start1 = new Date(start_date);
                var end1 = new Date(end_date);
                start1.setFullYear(start1.getFullYear() + j);
                end1.setFullYear(end1.getFullYear() + j);
                temp["start"] = start1;
                temp["end"] = end1;
                showEvents[i+j] = temp;
              }
              break;
            
            default:
              // code...
              break;
          }
          break;
        }
        // console.log(showEvents[j]);
      }
      
      allShowEvents = showEvents;
      return {
        ...state,
        eventsLoading: false,
        isAddEvent: false,
        showEvents: showEvents
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
