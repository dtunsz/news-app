import { useContext, useState } from "react"
import { fetcher } from "../components/utils/fetcher";
import AppContext from "../components/context/AppContext";
import { useNavigate } from "react-router-dom";
import BaseInput from "../components/ui/BaseInput";
import BaseButton from "../components/ui/BaseButton";

function Login() {
    const { setToken, setUser } = useContext(AppContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState(null);
    const handleLogin = async(e) => {
        e.preventDefault()
        console.log("Clicked", formData);
        const loginData  = await fetcher('/api/login', "POST", {body: formData});
        console.log(loginData, 'na data')
        if (loginData.errors) {
            setError(loginData.errors)
        } else {
            loginUser(loginData);
        }
    }

    const loginUser = (data) => {
        if (!data?.errors && data.token) {
            console.log("User was logged i");
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/feed");
        }
    }

    return(
        <div className="block">
            <h1 className="title">Login</h1>
            <form onSubmit={handleLogin} className="block">
                <div className="my-3">
                    <BaseInput type={'email'} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder={'Enter email'} />
                    {error && error.email && <p className="error">{error.email[0]}</p>}
                </div>
                <div>
                    <BaseInput type={'password'} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder={'Enter password'} />
                    {error && error.password && <p className="error">{error.password[0]}</p>}
                </div>
                <BaseButton  type={"submit"} btnText={"login"} />
            </form>
        </div>
    )
}

export default Login