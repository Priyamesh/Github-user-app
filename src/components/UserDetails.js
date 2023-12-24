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
        let users_local_storage = JSON.parse(localStorage.getItem('github_users_details'))
        let users_repos = users_local_storage?.[`${user_id}_repos`]
        setIsLoadingRepo(true);
        try {
            if (isEmpty(users_repos)) {
                const data = await callApi(`https://api.github.com/users/${user.login}/repos`)
                setRepos(data)
                users_local_storage[`${user_id}_repos`] = data
                localStorage.setItem('github_users_details', JSON.stringify(users_local_storage))
            }
            else {
                setRepos(users_repos)
            }
        } catch (error) {
            alert("Something went wrong while fetching repositiries, Please try Again!\
            If the issue persists please email us at support@dummy.com")
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsLoadingRepo(false);
    }

    const getFollowers = async (user, user_id) => {
        let users_local_storage = JSON.parse(localStorage.getItem('github_users_details'))
        let users_followers = users_local_storage?.[`${user_id}_followers`]
        setIsLoadingFollowers(true)
        try {
            if (isEmpty(users_followers)) {
                const data = await callApi(user.followers_url)
                setFollowers(data)
                users_local_storage[`${user_id}_followers`] = data
                localStorage.setItem('github_users_details', JSON.stringify(users_local_storage))
            }
            else {
                setFollowers(users_followers)
            }
        } catch (error) {
            alert("Something went wrong while fetching followers, Please try Again!\
            If the issue persists please email us at support@dummy.com")
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsLoadingFollowers(false)
    }

    useEffect(() => {
        let user_id = searchParams.get("user_id");
        if (!isEmpty(localStorage.getItem('github_users'))) {
            let user_list = JSON.parse(localStorage.getItem('github_users'))
            const user = find(user_list, { 'id': Number(user_id) })

            //setups a empty object for followers and repos
            if (isEmpty(localStorage.getItem('github_users_details'))) {
                localStorage.setItem('github_users_details', JSON.stringify({}))
            }
            getRepos(user, user_id)
            getFollowers(user, user_id)
        }
    }, [])

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 ">
                    <h2 className="mb-4 ">List of Repository</h2>
                    {isLoadingRepo ? (
                        <div style={{ width: "100px", margin: "auto", }}>
                            <LoaderComp />
                        </div>
                    ) : (
                        //if isloadingRepo is false: render rpos
                        <div>
                            <table className="table table-hover" style={{ border: '1px solid #dee2e6', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <tbody>
                                    {!isEmpty(repos) ? repos.map((repo, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                <a href={repo.html_url} target={"_blank"} > {repo.name}</a>
                                            </td>
                                        </tr>
                                    )) :
                                        <tr>
                                            <td>
                                                No Repos Yet !!
                                            </td>
                                        </tr>}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    <h2 className="mb-4 ">List of Followers</h2>
                    {isLoadingFollowers ? (
                        <div style={{ width: "100px", margin: "auto", }}>
                            <LoaderComp />
                        </div>
                    ) : (
                        //if isloadingFollowers is false: render rpos
                        <div>
                            <table className="table table-hover" style={{ border: '1px solid #dee2e6', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <tbody>
                                    {!isEmpty(followers) ? followers.map((follower, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                <a href={follower.html_url} target={"_blank"}> {follower.login} </a>
                                            </td>
                                        </tr>
                                    )) :
                                        <tr>
                                            <td>
                                                No Followers Yet !!
                                            </td>
                                        </tr>}
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