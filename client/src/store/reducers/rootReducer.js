import { combineReducers } from 'redux';
import teacherReducer from './teacher';


const rootReducer = combineReducers({
    teacher: teacherReducer,
})

export default rootReducer