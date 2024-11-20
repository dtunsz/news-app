import { useContext, useEffect, useState } from "react";
import { fetcher } from "../components/utils/fetcher";
import AppContext from "../components/context/AppContext";
import BaseInput from "../components/ui/BaseInput";
import BaseButton from "../components/ui/BaseButton";


function Feed() {
    const { user, token, setUser, setToken } = useContext(AppContext);
    const [guardianArticles, setGuardianArticles] = useState([]);
    const [nytArticles, setNytArticles] = useState([]);
    const [newsApiArticles, setNewsApiArticles] = useState([]);
    const [resObject, setResObject] = useState({});
    const [ search, setSearch ] = useState('');
    const [ dateSort, setDateSort ] = useState('');


    const fetchArticles = async () => {
        const searchString = search ? `?search=${search}` : ''
        const dateSortString = dateSort ? `?date=${dateSort}` : ''
        const data = await fetcher(`/api/${user?.profile?.source}/articles${dateSortString ? dateSortString : searchString}`, "GET");

        if (data.data) {
            setResObject(data);

            if (user.profile && user.profile.source === "guardian") {
                setGuardianArticles(data.data)
            } else if (user.profile && user.profile.source === "nyt") {
                setNytArticles(data.data)
            } else {
                setNewsApiArticles(data.data)
            }
        }
    }

    useEffect(() => {
        fetchArticles()
    }, [])

    const listGuardianArticles = guardianArticles.map((article, index) => {
        return (
        <div key={index+article.title} className="max-w-2xl min-w-80 mb-4 rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{article.title}</div>
            <p className="text-gray-700 text-base">{article.web_url}</p>
        </div>
        </div>
       )})

    const listNytArticles = nytArticles.map((article, index) => {
        return (
        <div key={index+article.abstract} className="max-w-2xl min-w-80 mb-4 rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{article.abstract}</div>
            <p className="text-gray-700 text-base">{article.lead_paragraph}</p>
        </div>
        </div>
       )})

    const listNewsApiArticles = newsApiArticles.map((article, index) => {
        return (
        <div key={index+article.title} className="max-w-2xl min-w-80 mb-4 rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{article.title}</div>
            <p className="text-gray-700 text-base">{article.content}</p>
        </div>
        </div>
       )})

    return (
        <div>
            <h1 className="title">User feed</h1>
            <div className="w-full md:w-3/6 lg:w-3/6">
                <div className="flex my-4">
                    <BaseInput type={"search"} className={"my-3 mr-3"} onChange={(e) => setSearch(e.target.value)} placeholder={"enter a keyword to search for articles"} />
                    <BaseButton onClick={fetchArticles} btnText={"search"} />
                </div>
                <div className="flex my-4">
                    <label className="mr-4">Sort by:</label>
                    <select onChange={e => setDateSort(e.target.value)} className="rounded border border-black" value={dateSort}>
                        <option value="">Choose one option</option>
                        <option value="asc">Oldest</option>
                        <option value="desc">Newest</option>
                        <option value="">Category</option>
                    </select>
                </div>
            </div>
            <div className="font-bold text-yellow-500">
                {
                    user && user?.profile && user?.profile?.source ? "" : "Please navigate to profile page and create profile to get a feed."
                }
            </div>
            <div>
                { user?.profile?.source === "guardian" && !listGuardianArticles.length ? (<h2 >No articles found</h2>): listGuardianArticles}
            </div>
            <div>
                { user?.profile?.source === "nyt" && !listNytArticles.length ? (<h2>No articles found</h2>): listNytArticles }
            </div>
            <div>
                { user?.profile?.source === "news_api" && !listNewsApiArticles.length ? (<h2>No articles found</h2>): listNewsApiArticles }
            </div>
        </div>
    )
}


export default Feed;