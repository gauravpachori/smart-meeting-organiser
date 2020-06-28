import * as types from "./types";

const initialState = {
    data: {}
};

const data = function(state = initialState, action) {
    switch(action.type) {
        case types.UPDATE_MEETING:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
}

export default data;