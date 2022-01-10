import {ADD_USER, USER_UPDATE} from '../constants/index';

let userData: any = null;

const initialState = {
  user: {},
};

export const getUserStore = () => {
  return userData;
};

/**
 * Redux reducer for add / update user details
 */
const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_USER:
      userData = {
        ...state,
        user: action.payload,
      };
      return {
        ...state,
        user: action.payload,
      };
    case USER_UPDATE:
      /* so you return a new state object with all the data from old state
      user also contain the data from old state.user but you update some of his parameters
      like this.props.updateUser({  email:'abc@gmail.com' }); update only email field 
      this.props.updateUser({   user_name : 'abc' , email:'abc@gmail.com' }); 
      update only user_name field

      change the name of action too, 
      because later you will add more item in the redux and "change" dont say it 
      change what ( just an idea )
      */
      userData = {
        ...state.user,
        ...action.payload,
      };
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
