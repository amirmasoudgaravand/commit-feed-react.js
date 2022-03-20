import React, { useState } from 'react';
import axios from 'axios';

function FetchData() {
    const [username, setUsername] = useState("");
    const [repos, seRepos] = useState("");
    const [loading, setLoading] = useState(false);
    const [commit, setCommit] = useState([]);
    const [notfound, setNotFound] = useState(false);
    const [empty, setEmpty] = useState("");
    const [visible, setVisible] = useState(4);


    function handleSubmit(e) {
        e.preventDefault();
        if (repos !== "" && username !== "") {
            searchRepos();
        }
    }

    // fetch data
    function searchRepos() {
        setLoading(true);
        axios({
            method: "get",
            url: `https://api.github.com/repos/${username}/${repos}/commits`,
            headers: {
                Authorization: `Bearer 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`
            }
        }).then(res => {
            if (res.status === 200) {
                setLoading(false);

                setCommit(res.data);

                setEmpty("");
            }
            if (res.status === 404) {
                setNotFound(true);
                setEmpty("no");
            }
            else {
                setNotFound(true);

            }

        }).catch(() => {
            setNotFound(true);
            setLoading(false);
            setEmpty("no");
        })
    }
    function renderRepo(repo) {
        return (
            <div className="card"
                style={{ width: "18rem", textAlign: "center", marginBottom: "3em" }}
                key={repo.node_id}
            >

                <div className="card-body">
                    <h4 className="card-title">{repo.author.login} </h4>
                    <hr />
                    <h5>
                        {repo.commit.message}
                    </h5>
                    <hr />
                    <p className="card-text">
                        { }
                        {new Date(repo.commit.author.date).toLocaleString('en-US', {
                            timeZone: 'America/New_York', hour: 'numeric',
                            minute: 'numeric',
                            month: "short",
                            day: '2-digit', year: "numeric"
                        })}
                    </p>
                    <a href={repo.html_url} className="btn btn-primary"> Go to Commit </a>
                </div>

            </div>
        )
    }

    // function button Load More
    const showMoreItems = () => {

        setVisible((prevValue) => prevValue + 4);
    }

    return (
        <div className='header'>
            <form className='form' >

                <input className='input' required
                    value={username}
                    onChange={e => setUsername(e.target.value.trim())}
                    placeholder='Username' />

                <input className='input' required
                    value={repos}
                    onChange={e => seRepos(e.target.value.trim())}
                    placeholder='Repository' />

                <button className='btn btn-success' onClick={handleSubmit} >
                    {loading ? "Searching..." : "Search"}
                </button>

            </form>


            {
                repos === "" || username === "" && (
                    <div className='results-container' style={{ fontSize: "32pt" }} >
                        <h3>
                            Please fill in all inputs
                        </h3>
                    </div>)
            }



            {
                empty === "no" ? (
                    <div className='results-container' style={{ fontSize: "32pt" }} >
                        <h3>
                            Not Found
                        </h3>
                    </div>
                ) : (

                    <div className='results-container' >
                        {commit.slice(0, visible).map((repo) => renderRepo(repo))}

                    </div>


                )
            }

            <div className='text-center mb-4'>
                {
                    commit.length !== 0 && (<button
                        className={visible > commit.length ? 'display' : "btn btn-info"}
                        onClick={showMoreItems} >Load More</button>)
                }

            </div>
        </div>
    )
}

export default FetchData