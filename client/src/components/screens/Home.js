import React, {useState, useEffect} from 'react'
import "./logs.css";

const Home = () => {

    const [post , setPost] = useState([])

    useEffect(()=>{
        fetch('/allpost', {
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("jwt") 
            }
        }).then(res => res.json())
        .then(result => {
            setPost(result.posts)
        })
    }, [])

    return (
        <div className="home">
            {
                post.map(item => {
                    return(
                        <div className="card home-card" key={item._id}>
                            <h5>{item.postBy.name}</h5>
                            <div className="card-image">
                                <img src={item.photo}/>
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{color:"red"}}>favorite</i>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <input type="text" placeholder="add a comment" />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home;