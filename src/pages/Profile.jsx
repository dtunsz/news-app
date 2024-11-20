import { useContext, useState } from "react"
import BaseInput from "../components/ui/BaseInput"
import BaseButton from "../components/ui/BaseButton"
import AppContext from "../components/context/AppContext";
import { fetcher } from "../components/utils/fetcher";

function Profile() {
    const { user, token, setUser, setToken } = useContext(AppContext);

    const [formData, setFormData] = useState({
        username: user?.profile?.username || '',
        source: user?.profile?.source || '',
    })

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const handleProfile = async(e) => {
        e.preventDefault()
        const data = await fetcher("/api/profiles", "POST", {headers, body: formData});

        if (data.errors || data.error) {
            setError(data.errors)
        } else {
            console.log(data);
            setUser({...user, profile: data.profile});
            setSuccess("Profile updated.")
        }
    }

    return(
        <div>
            <h1 className="title">Update your profile</h1>
            <form onSubmit={handleProfile} className="w-2/6">
                <div className="flex my-3">
                    <label className="my-3 mr-4">Select a article source:</label>
                    <select name="newsSource" id="newsSource" className="my-3 px-2 rounded border border-black" onChange={e => setFormData({...formData, source: e.target.value})} value={formData.source}>
                        <option value="">Choose one option</option>
                        <option value="news_api">NEWSAPI</option>
                        <option value="guardian">GUARDIAN</option>
                        <option value="nyt">NEW YORK TIMES</option>
                    </select>
                </div>
                {error && error.source && <p className="error mb-3">{error.source[0]}</p>}
                <div className="flex">
                    <label className="mr-4">Username:</label>
                    <BaseInput value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} placeholder={'Enter Username'} />
                </div>
                {error && error.username && <p className="error mb-3">{error.username[0]}</p>}
                <BaseButton  type={"submit"} btnText={ user?.profile?.source ? "Update Profile" : "Create Profile"} />

                {success && <p className="success mb-3">{success}</p>}
            </form>
        </div>
    )
}

export default Profile