
import { INCREMENT, DECREMENT } from '../action/counterAction';
import { FETCH_USER_LOGIN_SUCCESS, UPDATE_PROFILE_SUCCESS, USER_LOGOUT_SUCCESS } from '../action/userAction';
import _ from 'lodash'

const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: '',
        email: ''
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    image: action?.payload?.DT?.image,
                    role: action?.payload?.DT?.role,
                    email: action?.payload?.DT?.email
                },
                isAuthenticated: true
            };
        case USER_LOGOUT_SUCCESS:
            return {
                account: {
                    access_token: '',
                    refresh_token: '',
                    username: '',
                    image: '',
                    role: '',
                    email: ''
                },
                isAuthenticated: false
            }
        case UPDATE_PROFILE_SUCCESS:
            console.log('action: ', action)
            let stateClone = _.cloneDeep(state)
            stateClone.account.username = action.payload.username
            stateClone.account.image = action.payload.image
            return stateClone
        default: return state;
    }
};

export default userReducer;