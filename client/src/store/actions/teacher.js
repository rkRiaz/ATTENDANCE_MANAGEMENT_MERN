import * as Types from './types'
// import jwt from 'jsonwebtoken'


// export const login = (loginInfo) => async (dispatch) => {
//     const res = await fetch('/api/customer/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(loginInfo),
//     });
//     try{
//         const data = await res.json();

//         let token = jwt.sign({
//             id: data.data.id,
//             name: data.data.first_name
//         }, 'SECRET', {expiresIn: '24h'})
//         console.log(token)
//         localStorage.setItem('customer_auth', token)

//         dispatch({
//             type: Types.SET_CUSTOMER,
//             payload: {
//                 customerInfo: {
//                     id: data.data.id,
//                     name: data.data.first_name
//                 }
//             }
//         })

//     } catch(err) {
//         console.log(err)
//     }
// }

export const logoutAction = () => dispatch => {
    console.log('riaz')
    localStorage.removeItem('customer_auth')
    dispatch({
        type: Types.SET_CUSTOMER,
        payload: {
            customerInfo: {}
        }
    })
}



