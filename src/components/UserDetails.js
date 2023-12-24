import { find, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { callApi } from '../utils/callApi';
import LoaderComp from "./LoaderComp";

const UserDetails = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [repos, setRepos] = useState([])
    const [followers, setFollowers] = useState([])
    const [isLoadingRepo, setIsLoadingRepo] = useState(false);
    const [isLoadingFollowers, setIsLoadingFollowers] = useState(false);


    const getRepos = async (user, user_id) => {
        const users_local_storage = localStorage.getItem(user_id)
        setIsLoadingRepo(true);
        if (isEmpty(users_local_storage)) {
            const data = await callApi(`https://api.github.com/users/${user.login}/repos`)
            setRepos(data)
            localStorage.setItem(user_id, JSON.stringify(data))
        } else {
            setRepos(JSON.parse(users_local_storage))
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoadingRepo(false);
    }

    const getFollowers = async (user, user_id) => {
        setIsLoadingFollowers(true)
        if (isEmpty(localStorage.getItem(`${user_id}followers`))) {
            const data = await callApi(user.followers_url)
            setFollowers(data)
            localStorage.setItem(`${user_id}followers`, JSON.stringify(data))
        }
        else {
            let data = JSON.parse(localStorage.getItem(`${user_id}followers`))
            setFollowers(data)
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoadingFollowers(false)
    }

    useEffect(() => {
        let user_id = searchParams.get("user_id");

        let user = null
        if (!isEmpty(localStorage.getItem('github_users'))) {
            let user_list = JSON.parse(localStorage.getItem('github_users'))
            user = find(user_list, { 'id': Number(user_id) })
        }
        getRepos(user, user_id)
        getFollowers(user, user_id)
    }, [])

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 ">
                    <h2>List of Repository</h2>
                    {isLoadingRepo ? (
                        <div style={{ width: "100px", margin: "auto", }}>
                            <LoaderComp />
                        </div>
                    ) : (
                        //if isloadingRepo is false: render rpos
                        <div>
                            <table className="table table-hover">
                                <tbody>
                                    {repos.map((repo, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                <a href={repo.html_url}>{repo.name}</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    <h2>List of Followers</h2>
                    {isLoadingFollowers ? (
                        <div style={{ width: "100px", margin: "auto", }}>
                            <LoaderComp />
                        </div>
                    ) : (
                        //if isloadingFollowers is false: render rpos
                        <div>
                            <table className="table table-hover">
                                <tbody>
                                    {followers.map((follower, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                <a href={follower.html_url}>{follower.login}</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export default UserDetails