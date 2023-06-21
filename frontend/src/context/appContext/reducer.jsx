import * as actionTypes from './types';

export const initialState = {
  isNavMenuClose: false,
  currentActiveMenu: '',
};

export function contextReducer(state, action) {
  switch (action.type) {
    case actionTypes.OPEN_NAV_MENU:
      return {
        ...state,
        isNavMenuClose: false,
      };
    case actionTypes.CLOSE_NAV_MENU:
      return {
        ...state,
        isNavMenuClose: true,
      };
    case actionTypes.COLLAPSE_NAV_MENU:
      return {
        ...state,
        isNavMenuClose: !state.isNavMenuClose,
      };
    case actionTypes.CLICK_NAV_MENU:
      return {
        ...state,
        isNavMenuClose: true,
        currentActiveMenu: window.location.pathname,
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
