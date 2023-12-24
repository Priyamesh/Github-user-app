import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { isEmpty } from 'lodash';

const UserCard = ({ user, idx }) => {
    return (
        <>
            <div className="col-md-4 mb-3" key={idx}>

                <div className="card user-card" style={{ width: '18rem' }}>
                    <div className="card-body d-flex align-items-center">
                        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                            <img
                                src={user.avatar_url}
                                className="card-img-top rounded-circle mx-3"
                                alt="User Avatar"
                                style={{ width: '3rem', height: '3rem', objectFit: 'cover' }}
                            />
                        </a>
                        <h6 className="card-title text-center">
                            <a href={user.html_url} className="card-link" target='_blank'>
                                {user.login}
                            </a>
                        </h6>
                    </div>
                    <Link to={`/user?user_id=${user.id}`} className="text-decoration-none">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Company: {user.company}</li>
                            <li className="list-group-item">Location: {user.location}</li>
                            <li className="list-group-item">Email: {user.email}</li>
                            <li className="list-group-item">Followers: {user.followers}</li>
                            <li className="list-group-item">Following: {user.following}</li>
                            <li className="list-group-item">Public Repos: {user.public_repos}</li>
                            <li className="list-group-item">Public Gists: {user.public_gists}</li>
                            <li className="list-group-item">Member Since: {user && user.created_at && moment(user.created_at).format('ll')}</li>
                        </ul>
                    </Link>
                </div>

            </div>
        </>
    )
}

export default UserCard