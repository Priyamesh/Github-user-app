import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { callApi } from '../utils/callApi'
import LoaderComp from "./LoaderComp";

const AddUsers = () => {

    const [userName, setUserName] = useState("")
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    //to load all the user from localstorage
    useEffect(() => {
        if (localStorage.getItem('github_users') != null) {
            const github_users = JSON.parse(localStorage.getItem('github_users'))
            const users_list = Object.values(github_users);
            setUsers(users_list)
        }
    }, [])

    //function for setting username from input box
    const onChangeHandler = (e) => {
        setUserName(e.target.value)
    }

    //getiing user from github Api
    const getUser = async () => {
        let data = null
        let github_users = {}
        let users_list = []
        setIsLoading(true);
        try {
            data = await callApi(`https://api.github.com/users/${userName}`)
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (localStorage.getItem('github_users') != null) {
                github_users = JSON.parse(localStorage.getItem('github_users'))
                users_list = Object.values(github_users);
            }
            if (!(userName in github_users) && data != null) {
                users_list.push(data)
            }
            setUsers(users_list)
            github_users[userName] = data
            localStorage.setItem('github_users', JSON.stringify(github_users))

            console.log("user_list", users_list);
        } catch (error) {
            alert("Invalid Username")
        }
        setIsLoading(false);
    }

    //function to handle gform submit
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

            {isLoading ? (
                <div style={{ width: "100px", margin: "auto", }}>
                    <LoaderComp />
                </div>
            ) : (
                //if isloading is false: render cards
                <div className="container">
                    <div className="row">
                        {users.map((user, idx) => (
                            <UserCard user={user} key={idx} />
                        ))}
                    </div >
                </div >
            )}
        </>
    );
}

export default AddUsers