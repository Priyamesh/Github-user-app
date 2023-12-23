import React from "react";

const UserCard = (props) => {
    // console.log(props);

    return (
        <>
            <div>
                <div className="card" style={{ width: '18rem' }}>
                    {/* <img src="..." class="card-img-top" alt="..."> */}
                    <div className="card-body">
                        <h6 className="card-title">name</h6>
                        <a href="{data.html_url}" className="card-link">name</a>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">An item</li>
                        <li className="list-group-item">A second item</li>
                        <li className="list-group-item">A third item</li>
                    </ul>
                    <div className="card-body">
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCard