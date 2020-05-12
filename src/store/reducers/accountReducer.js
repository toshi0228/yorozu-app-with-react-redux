import { SIGN_IN_ACCOUNT, SIGN_OUT } from '../actionTypes'
// import Account from '../../models/account';

export const DEFAULT_STATE = {
  authToken: '',
  yorozuId: '',
  isLoggedIn: false,
  // ...new Account({}),
}

const accountReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_ACCOUNT:
      return { ...state, ...action.payload }

    case 'CREATE_ACCOUNT':
      return { ...state, ...action.res }

    case SIGN_OUT:
      return DEFAULT_STATE

    default:
      return state
  }
}

export default accountReducer
