import { REQUEST_POSTS } from '@/constants';

export default (
    state = {
        pending: false,
        data: [],
        error: undefined
    },
    action
) => {
    switch (action.type) {
        case REQUEST_POSTS + '_FULFILLED': {
            return { ...state, pending: false, data: action.payload.data };
        }

        case REQUEST_POSTS + '_PENDING': {
            return { ...state, pending: true };
        }

        case REQUEST_POSTS + '_REJECTED': {
            return { ...state, pending: false, error: action.payload };
        }

        default: {
            return state;
        }
    }
};
