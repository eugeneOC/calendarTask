import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import * as Types from "Types/calendar/CalendarTypes";
import * as Actions from "Actions";

import api from "Api";

//=========================
// REQUESTS
//=========================
const getAllEventsRequestWithFilter = async (start, end, id) => {
  try {
    const result = await api.get(
      `/events?filter[where][userId]=${id}&filter[where][end][gt]=${start}&filter[where][end][lt]=${end}&filter[order]=start ASC&`
    );

    return result.data;
  } catch (err) {
    return err;
  }
};
const getAllEventsRequest = async () => {
  try {
    const result = await api.get("/events");
    return result.data;
    // console.log("++++++++++",result);
  } catch (err) {
    return err;
  }
};
const addEventRequest = async newEvent => {
  try {
    const result = await api.post("/events", newEvent);
    console.log("POST--------", newEvent);
    // const result = newEvent;
    return result.data;
  } catch (err) {
    return err;
  }
};
const deleteEventRequest = async id => {
  try {
    const result = await api.delete(`/events/${id}`);
    // const result = newEvent;
    // console.log(id);
    return result.data;
  } catch (err) {
    return err;
  }
};
const updateEventRequest = async id => {
  try {
    // console.log("Update event is-----------");
    // console.log(id);
    const result = await api.patch(`/events/${id.id}`, id);
    // const result = await api.patch(`/events/?id=${id.id}`, id);
    // const result = newEvent;
    return result.data;
  } catch (err) {
    return err;
  }
};

//=========================
// CALL(GENERATOR) ACTIONS
//=========================
function* getAllEventsFromDB(item) {
  
  const { payload } = item;

  if (payload.filter) {
    try {
      let myEvents = yield call(
        getAllEventsRequestWithFilter,
        payload.start,
        payload.end,
        payload.id
      );
      myEvents.map(item => {
        item.start = new Date(item.start);
        item.end = new Date(item.end);
        return;
      });
      yield put(Actions.getAllEventsSuccess(myEvents, myEvents));
    } catch (err) {
      yield put(Actions.getEventFailure(err));
    }
  } else {
    try {
      // console.log("++++++++++",item);
      let myEvents = yield call(getAllEventsRequest);
      console.log("++++++++++",myEvents)
      myEvents.map(item => {
        item.start = new Date(item.start);
        item.end = new Date(item.end);
        // console.log(item.start,"=====",item.end)
        return;
      });
      yield put(Actions.getAllEventsSuccess(myEvents, myEvents));
    } catch (err) {
      yield put(Actions.getEventFailure(err));
    }
  }
}

function* addEventToDB({ payload }) {
  const { item, type } = payload;
  try {
    const data = yield call(addEventRequest, item);
    if (type == "Lead") {
      yield put(Actions.addLeadEvent(data));
    } else if (type == "Customer") {
      yield put(Actions.addCustomerEvent(data));
    } else if (type == "Account") {
      yield put(Actions.addAccountEvent(data));
    } else if (type == "Deal") {
      yield put(Actions.addDealEvent(data));
    } else {
      yield put(Actions.addEventSuccess(data));
    }
  } catch (err) {
    yield put(Actions.addEventFailure(err));
  }
}

function* deleteEventFromDB(item) {
  try {
    const data = yield call(deleteEventRequest, item.payload);
    if (!data.count == 1) {
      throw "Item could not be deleted";
    }
    yield put(Actions.deleteEventSuccess(item.payload));
  } catch (err) {
    yield put(Actions.deleteEventFailure(err));
  }
}
function* updateEventFromDB(item) {
  try {
    const data = yield call(updateEventRequest, item.payload);
    // console.log("DDDDDDDDDTTTTTTTTTTT",data);
    yield put(Actions.updateEventSuccess(data));
  } catch (err) {
    yield put(Actions.updateEventFailure(err));
  }
}

//=======================
// WATCHER FUNCTIONS
//=======================
export function* getAllEventsWatcher() {
  yield takeEvery(Types.GET_ALL_EVENTS, getAllEventsFromDB);
}
export function* addEventWatcher() {
  yield takeEvery(Types.ADD_EVENT, addEventToDB);
}
export function* deleteEventWatcher() {
  yield takeEvery(Types.DELETE_EVENT, deleteEventFromDB);
}

export function* updateEventWatcher() {
  yield takeEvery(Types.UPDATE_EVENT, updateEventFromDB);
}

//=======================
// FORK SAGAS TO STORE
//=======================
export default function* rootSaga() {
  yield all([
    ,
    fork(getAllEventsWatcher),
    fork(addEventWatcher),
    fork(deleteEventWatcher),
    fork(updateEventWatcher)
  ]);
}
