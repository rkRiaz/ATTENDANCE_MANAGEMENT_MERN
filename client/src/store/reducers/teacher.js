import * as Types from '../actions/types'

const init = {
    teacherLoggedIn: false,
    sessionExpiresIn: '',
    teacherInfo: {},
}

const teacherReducer = (state=init, action) => {
    switch(action.type) {
        case Types.SET_TEACHER: {
            return {
                ...state,
                teacherInfo: action.payload.teacherInfo,
                teacherLoggedIn: Object.keys(action.payload.teacherInfo).length !== 0
            }
        }
     
        default: return state
    }
} 

export default teacherReducer