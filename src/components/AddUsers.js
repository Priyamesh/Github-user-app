import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserCard from './UserCard'
import { callApi } from '../utils/callApi'

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

    const getUser = async () => {
        let data = null
        try {
            data = await callApi(`https://api.github.com/users/${userName}`)
        } catch (error) {
            alert("Invalid Username")
        }
        let users_list = []
        if (localStorage.getItem('github_users') != null) {
            users_list = JSON.parse(localStorage.getItem('github_users'))
        }
        users_list.push(data)
        setUsers(users_list)
        console.log(users);
        localStorage.setItem('github_users', JSON.stringify(users_list))

    }

    //function for api call to github to fetch user detail
    const onSubmitHandler = (e) => {
        e.preventDefault()
        getUser()
    }

    return (
        <>
            {/* input form */}
            <div className="container my-3">
                <div className="row justify-content-center">
                    <h2 className="row justify-content-center">Github Profile Fetch</h2>
                    <form className="col-md-6 g-3 text-center d-flex" id="git-form" onSubmit={onSubmitHandler}>
                        <div className="flex-grow-1 me-2">
                            <label htmlFor="gitusername" className="visually-hidden">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="gitusername"
                                placeholder="Enter GitHub username"
                                value={userName}
                                onChange={onChangeHandler}
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Get User
                            </button>
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