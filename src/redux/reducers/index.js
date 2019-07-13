import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { combineReducers } from 'redux';
import RootNavigation from './../../navigations/RootNavigation';
import register from './register';
import question from './question';

const router = createNavigationReducer(RootNavigation);

const appReducer = combineReducers({
  router,
  register,
  question
})

export default appReducer