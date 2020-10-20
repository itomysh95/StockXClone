

const getAccount = state => state.account

const isAuthenticated = state => getAccount(state).loggedIn

export {
    getAccount,
    isAuthenticated
}