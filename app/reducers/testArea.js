const initialState = {

}

export function testAreaReducer(state = initialState, action) {
    switch(action.type) {
        case "ADD_TEST_AREA":
            console.log('action', action);

            return {
                state
            };

        default:
            return state;
    }
}