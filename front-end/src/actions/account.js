// component calls action generator->action generator returns object ->
// component dispatches object returned -> redux store changes

export const setLoggedIn = ()=>({
    type: 'SET_LOGGEDIN'
})

export const setLoggedOut = ()=>({
    type: 'SET_LOGGEDOUT'
})

export const setUsername = (username)=>({
    type: 'SET_USERNAME',
    username
})