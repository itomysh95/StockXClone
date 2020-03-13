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
        default:
            return state;
    }
}

export default accountReducer