const accountReducerDefaultState=[]

const accountReducer = (state=accountReducerDefaultState,action)=>{
    switch(action.type){
        case 'SET_LOGGEDIN':
            return {
                ...state,
                loggedIn: true
            }
        case 'SET_LOGGEDOUT':
            return{
                ...state,
                loggedIn: false
            }
        case 'SET_ACCOUNT_RATES':
            return{
                ...state,
                accountRates:action.accountRates
            }
        default:
            return state;
    }
}

export default accountReducer