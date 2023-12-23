import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AddContacts = () => {

    const [userName, setUserName] = useState("")
    const [users, setUsers] = useState([])

    //to load all the user from localstorage
    useEffect(() => {
        if (localStorage.getItem('github_users') != null) {
            setUsers(JSON.parse(localStorage.getItem('github_users')))
        }
    }, [])

    //function for input
    const onChangeHandler = (e) => {
        setUserName(e.target.value)
    }

    //function for api call to github to fetch user detail
    const onSubmitHandler = (e) => {
        e.preventDefault()
        fetch(`https://api.github.com/users/${userName}`)
            .then((result) => {
                if (!result.ok) {
                    throw new Error('Invalid username')
                }
                return result.json()
            })
            .then((values) => {
                let users_list = []
                if (localStorage.getItem('github_users') != null) {
                    users_list = JSON.parse(localStorage.getItem('github_users'))
                }
                users_list.push(values)
                setUsers(users_list)
                console.log(users);
                localStorage.setItem('github_users', JSON.stringify(users_list))
            })
            .catch((Error) => {
                alert('Invalid UserName')
            })
    }

    return (
        <>
            {/* input form */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <h2 className="row justify-content-center">Github Profile Fetch</h2>
                    <form className="col-md-6 g-3 text-center" id="git-form" onSubmit={onSubmitHandler}>
                        <div className="col-12">
                            <label htmlFor="gitusername" className="visually-hidden">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="gitusername"
                                placeholder="Enter username"
                                value={userName}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="col-12 my-3">
                            <button type="submit" className="btn btn-primary">Get User</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Rendering list */}
            <div className="container">
                <div className="row">
                    {users.map((user, idx) => (
                        <div className="col-md-4 mb-3" key={idx}>
                            <Link to={`/user?user_id=${user.id}`} className="text-decoration-none">
                                <div className="card" style={{ width: '18rem' }}>
                                    <div className="card-body d-flex align-items-center">
                                        <img
                                            src={user.avatar_url}
                                            className="card-img-top rounded-circle mx-3"
                                            alt="User Avatar"
                                            style={{ width: '3rem', height: '3rem', objectFit: 'cover' }}
                                        />
                                        <h6 className="card-title text-center">
                                            <a href={user.html_url} className="card-link">{user.name}</a>
                                        </h6>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Company: {user.company}</li>
                                        <li className="list-group-item">Location: {user.location}</li>
                                        <li className="list-group-item">Email: {user.email}</li>
                                        <li className="list-group-item">Followers: {user.followers}</li>
                                        <li className="list-group-item">Following: {user.following}</li>
                                        <li className="list-group-item">Public Repos: {user.public_repos}</li>
                                        <li className="list-group-item">Public Gists: {user.public_gists}</li>
                                        <li className="list-group-item">Member Since: {user.created_at}</li>
                                    </ul>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div >
            </div >
        </>
    );
}

export default AddContacts