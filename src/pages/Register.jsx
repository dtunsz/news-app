import { useContext, useEffect, useState } from "react";
import useFetch from "../components/utils/Usefetch";
import { fetcher, getData } from "../components/utils/fetcher";
import  AppContext from "../components/context/AppContext";
import { useNavigate } from "react-router-dom";
import BaseInput from "../components/ui/BaseInput";
import BaseButton from "../components/ui/BaseButton";


function Register() {
    const { setToken,setUser } = useContext(AppContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState(null)

    const handleRegister = async(e) => {
        e.preventDefault()
        const data = await fetcher("/api/register", "POST", {body: formData});

        if (data.errors) {
            setError(data.errors)
        } else {
            loginUser(data);
        }
    }
    const loginUser = (data) => {
        if (!data?.errors && data.token) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/feed");
        }
    }

    return(
        <div>
            <div><h1 className="title">Create an account</h1></div>
            <form onSubmit={handleRegister}>
                <div className="my-3">
                    <BaseInput value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder={'Enter name'} />
                    {error && error.name && <p className="error">{error.name[0]}</p>}
                </div>
                <div>
                    <BaseInput type={'email'} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder={'Enter email'} />
                    {error && error.email && <p className="error">{error.email[0]}</p>}
                </div>

                <div className="my-3">
                    <BaseInput type={'password'} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder={'Enter password'} />
                    {error && error.password && <p className="error">{error.password[0]}</p>}
                </div>

                <div>
                    <BaseInput type={'password'} value={formData.password_confirmation} onChange={e => setFormData({...formData, password_confirmation: e.target.value})} placeholder={'Confirm password'} />
                </div>
                <BaseButton  type={"submit"} btnText={"Register"} />
            </form>
        </div>
    )
}

export default Register;