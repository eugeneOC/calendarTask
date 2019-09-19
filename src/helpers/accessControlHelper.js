import { store } from "Redux/store";

export const accessControlHelper = (action, match) => {
  var state = store.getState();
  var user = state.authUser.user;
  var access = state.authUser.loggedInUser.access;

  if (user) {
    for (let i = 0; i < action.length; i++) {
      var act = action[i];
      if (act == "me") {
        if (user.id == match.params.id) return true;
      } else if (act == "global") {
        return true;
      } else {
        if (user.isSuperAdmin) {
          return true;
        } else {
          if (
            access.find(acc => {
              return `${acc.model}:${acc.method}` == action[i];
            })
          )
            return true;
        }
      }
    }
  }

  return false;
};
