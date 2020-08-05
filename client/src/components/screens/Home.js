import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom';
import "./logs.css";
import {UserContext} from "../../App";


const Home = () => {

    const [post , setPost] = useState([])
    const {state, dispatch} = useContext(UserContext)

    useEffect(()=>{
        fetch('/allpost', {
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("jwt") 
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            setPost(result.posts)
        })
    }, [])

    const likePost = (id) => {
        fetch('/like', {
            method: "put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res => res.json())
        .then(result => {
            const newData = post.map(item => {
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setPost(newData)
        }).catch(err => {
            console.log(err)
        })
    }

    const unlikePost = (id) => {
        fetch('/unlike',{
            method: "put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res => res.json())
        .then(result => {
            //console.log(result)
            const newData = post.map(item => {
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setPost(newData)
        }).catch(err => {
            console.log(err)
        })
    }

     const makeComment = (text, postId) => {
         fetch('/comment', {
             method:"put",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 postId,
                 text
             })
         }).then(res=>res.json())
         .then(result=>{
             console.log(result)
             const newData = post.map(item => {
                 if(item._id == result._id){
                     return result
                 }else{
                     return item
                 }
             })
             setPost(newData)
         }).catch(err => {
             console.log(err)
         })
     }


     const deletePost = (postId) => {
         fetch(`/deletepost/${postId}`, {
             method:"delete",
             headers:{
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             }
         }).then(res => res.json())
         .then(result=>{
             console.log(result)
             const newData = post.filter(item=>{
                 return item._id !== result.id
             })
             setPost(newData)
         })
     }


    return (
        <div className="home">
            {
                post.map(item => {
                    return(
                        <div className="card home-card" key={item._id}>
                            <h5><Link to={item.postBy._id !==state._id? "/profile/"+item.postBy._id : "/profile"}>{item.postBy.name}</Link> {item.postBy._id == state._id && <i className="material-icons" style={{float:"right"}} onClick={()=>deletePost(item._id)}>delete</i>} </h5>
                            <div className="card-image">
                                <img src={item.photo}/>
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{color:"red"}}>favorite</i>
                                {
                                    item.likes.includes(state._id)
                                    ?
                                    <i className="material-icons" onClick={() => unlikePost(item._id)}>thumb_down</i>
                                    :
                                    <i className="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>
                                }
                                
                                
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>

                                {
                                    item.comments.map(record=>{
                                        return(
                                        <h6><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type="text" placeholder="add a comment" />
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home;