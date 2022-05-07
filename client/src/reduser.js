export default (state, action) => {
    switch (action.type) {
        case 'JOINED':
            return {
                ...state,
                joined: action.payload,
                username: action.payload.username,
                room: action.payload.room
            }
    
    default:
        return state;
    }
};