import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserCard from './UserCard'

const AddUsers = () => {

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

            {/* Rendering users card */}
            <div className="container">
                <div className="row">
                    {users.map((user, idx) => (
                        <UserCard user={user} key={idx} />
                    ))}
                </div >
            </div >
        </>
    );
}

export default AddUsers