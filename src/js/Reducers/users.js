import { REQUEST_USERS } from '@/constants';

export default (
    state = {
        pending: false,
        data: [],
        error: undefined
    },
    action
) => {
    switch (action.type) {
        case REQUEST_USERS + '_FULFILLED': {
            return { ...state, pending: false, data: action.payload };
        }

        case REQUEST_USERS + '_PENDING': {
            return { ...state, pending: true };
        }

        case REQUEST_USERS + '_REJECTED': {
            return { ...state, pending: false, error: action.payload };
        }

        default: {
            return state;
        }
    }
};
