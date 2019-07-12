import { createNavigationReducer } from 'react-navigation-redux-helpers';
import RootNavigation from './../../navigations/RootNavigation';
import example from './example';

const router = createNavigationReducer(RootNavigation);

const appReducer = {
  router,
  example,
}

export default appReducer