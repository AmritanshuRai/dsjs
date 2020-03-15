const INITIAL_DATA = {
    loading: false
};

const universalReducer = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case "TOGGLE_LOADER":
            return {
                ...state,
                loading: !state.loading
            };
        default:
            return state;
    }
};

export default universalReducer;
