import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import measureSystemReducer from './measureSystem/measureSystem.reducer.js';
import searchReducer from './search/search.reducer.js';
import favoritesReducer from './favorites/favorites.reducer.js';
import locationReducer from './location/location.reducer.js';
import themeReducer from './theme/theme.reducer.js'

const persistConfig = {
	key:'root',
	storage,
	whitelist:['favorites']
}

const rootReducer = combineReducers({
	search:searchReducer,
	favorites:favoritesReducer,
	location:locationReducer,
	theme:themeReducer,
	measureSystem:measureSystemReducer
})

export default persistReducer(persistConfig,rootReducer);