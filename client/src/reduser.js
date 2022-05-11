export default (state, action) => {
    switch (action.type) {
        case 'JOINED':
            return {
                ...state,
                joined: action.payload,
                username: action.payload.username,
                room: action.payload.room
            };

        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
        };

        case 'NEW_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload]
        };
    
    default:
        return state;
    }
};