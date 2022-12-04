import * as Types from "./types"

export const menuSideBarAction = (action) => dispatch => {
    if(action === 'open') {
        dispatch({
            type: Types.SIDE_BARS,
            payload: {
                menuOpen: true,
            }
        })
    } else {
        dispatch({
            type: Types.SIDE_BARS,
            payload: {
                menuOpen: false,
            }
        })
    }
}

export const cartSideBarAction = (action) => dispatch => {
    if(action === 'open') {
        dispatch({
            type: Types.SIDE_BARS,
            payload: {
                cartOpen: true,
            }
        })
    } else {
        dispatch({
            type: Types.SIDE_BARS,
            payload: {
                cartOpen: false,
            }
        })
    }

}
export const loginPopupAction = (action) => dispatch => {
    if(action === 'open') {
        dispatch({
            type: Types.SIDE_BARS,
            payload: {
                loginOpen: true,
            }
        })
    } else {
        dispatch({
            type: Types.SIDE_BARS,
            payload: {
                loginOpen: false,
            }
        })
    }

}





