import { filter, find, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { callApi } from '../utils/callApi';

const UserDetails = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [repos, setRepos] = useState([])
    const [followers, setFollowers] = useState([])


    const getRepos = async (user, user_id) => {
        const users_local_storage = localStorage.getItem(user_id)
        if (isEmpty(users_local_storage)) {
            const data = await callApi(`https://api.github.com/users/${user.login}/repos`)
            setRepos(data)
            localStorage.setItem(user_id, JSON.stringify(data))
        } else {
            setRepos(JSON.parse(users_local_storage))
        }
    }

    const getFollowers = async (user, user_id) => {
        if (isEmpty(localStorage.getItem(`${user_id}followers`))) {
            const data = await callApi(user.followers_url)
            setFollowers(data)
            localStorage.setItem(`${user_id}followers`, JSON.stringify(data))
        }
        else {
            let data = JSON.parse(localStorage.getItem(`${user_id}followers`))
            setFollowers(data)
        }
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
                <div className="col-md-6">
                    <h2>List of Repos</h2>
                    {
                        repos.map((repo, idx) => (
                            <div key={idx}>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <a href={repo.html_url}>{repo.name}</a>
                                    </li>
                                </ul>
                            </div>
                        ))}
                </div>
                <div className="col-md-6">
                    <h2>List of Followers</h2>
                    {followers.map((follower, idx) => (
                        <div key={idx}>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <a href={follower.html_url}>{follower.login}</a>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default UserDetails