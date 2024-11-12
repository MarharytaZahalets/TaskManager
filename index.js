/**
 * @format
 */

import { AppRegistry } from 'react-native';

import { Provider } from 'react-redux';

import App from './App';
import { name as appName } from './app.json';
import { store } from 'state/store';

const app = () => {
  // const dispatch = useDispatch();
  //
  // useEffect(() => {
  //   // load taskList from AsyncStorage on app launch
  //   dispatch(loadTaskList());
  //
  //   // save taskList to AsyncStorage whenever tasks state changes
  //   const unsubscribe = store.subscribe(() => {
  //     dispatch(saveTaskList());
  //   });
  //
  //   return () => unsubscribe();
  // }, [dispatch]);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => app);
