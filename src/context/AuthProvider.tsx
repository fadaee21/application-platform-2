import useObjectLocalStorage from "@/hooks/useObjectLocalStorage";
import { createContext, useState } from "react";



const AuthContext = createContext<AuthContextType | undefined>(undefined);



export const AuthProvider = ({ children }: TChildren) => {
    const [auth, setAuth] = useState<IAuth | null>(null);
    const [persist, setPersist] = useObjectLocalStorage("persist", true)



    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
