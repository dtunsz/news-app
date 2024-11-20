import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { fetcher } from "../utils/fetcher";

export default function AppContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    async function getUser() {
        const user = await fetcher('/api/user', "GET", {headers});

        if (user?.user) {
            setUser(user.user);
        }
    }

    useEffect(() => {
        if (token) {
            getUser();
        }
    }, [token]);

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AppContext.Provider>
    );
  }