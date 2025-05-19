import {createContext, useEffect,useReducer} from 'react'

interface AuthContextProps {
    children: any;
}

interface AuthState {
    user: any | null;
    loading: boolean;
    error: any | null;
}

interface AuthContextType extends AuthState {
    dispatch: React.Dispatch<any>;
}

const initial_state: AuthState ={
    user: localStorage.getItem('user')!==undefined ? JSON.parse(localStorage.getItem('user') ?? ''):null,
    loading:false,
    error:null
}

export const AuthContext = createContext<AuthContextType>({
    ...initial_state,
    dispatch: () => {},
});

const AuthReducer = (state: any,action: any)=>{
    switch(action.type){
        case 'LOGIN_START':
            return{
                user:null,
                loading:false,
                error:null
            };
        case 'LOGIN_SUCCESS':
            return{
                user:action.payload,
                loading:false,
                error:null
            };
        case 'LOGIN_FAILURE':
            return{
                user:null,
                loading:false,
                error:action.payload
            };
        case 'REGISTER_SUCCESS':
            return{
                user:null,
                loading:false,
                error:null
            };
            
        case 'LOGOUT':
            return{
                user:null,
                loading:false,
                error:null
            }; 
        
        default:
        return state
    }
};

export const AuthContextProvider: React.FC<AuthContextProps> = ({children})=>{

    const [state, dispatch] = useReducer(AuthReducer , initial_state)

    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(state.user))
    },[state.user])


    return <AuthContext.Provider value={{
        user: state.user,
        loading: state.loading,
        error:state.error,
        dispatch
    }}>
        {children}
    </AuthContext.Provider>
}