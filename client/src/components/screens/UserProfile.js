import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from "../../App";
import {useParams} from "react-router-dom";
import "./logs.css";

const UserProfile = () => {

    const [userProfile, setProfile] = useState(null)
    const [showFollow, setShowFollow] = useState(true)
    const {state, dispatch} = useContext(UserContext)
    const {userid} = useParams()
    console.log(userid)

    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization" :"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=> res.json())
        .then(result => {
            console.log(result)
            setProfile(result)
        })
    }, [])


    const followUser = () => {
        
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type: "UPDATE", payload:{following:data.following, followers:data.followers}})

            localStorage.setItem("user", JSON.stringify(data)
            )
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers, data._id]
                    }
                }
            })
            setShowFollow(true)
        })
    }


    const unfollowUser = () => {
        
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type: "UPDATE", payload:{following:data.following, followers:data.followers}})

            localStorage.setItem("user", JSON.stringify(data)
            )
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item => item !== data._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
        })
    }

    return (
        <>
            {userProfile ?
             <div style={{maxWidth:"950px", margin:"0px auto"}}>
             <div style={{
                 display:"flex",
                 justifyContent:"space-around",
                 margin:"18px 0px",
                 borderBottom: "1px solid grey"
             }}>
                 <div>
                     <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSaaWvbsI6O4tJcUqPNfMwiVt-jTUg6BBcPLg&usqp=CAU"
                     />
                 </div>
                 <div>
         <h4>{userProfile.user.name}</h4>
         <h5>{userProfile.user.email}</h5>
                     <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                         <h6>{userProfile.posts.length} posts</h6>
                         <h6>{userProfile.user.followers.length} followers</h6>
                         <h6>{userProfile.user.following.length} following</h6>
                     </div>
                     
                     {showFollow 
                     ?
                     <button  className="btn waves-effect waves-light #1e88e5 blue darken-1 button-margin
                        " onClick={() => followUser()}>
                            Follow
                     </button>
                     :
                     <button className="btn waves-effect waves-light #1e88e5 blue darken-1 button-margin
                        " onClick={() => unfollowUser()}>
                            UnFollow
                     </button>
                     }
                 </div>
             </div>
             <div className="gallery">
 
                 {
                     userProfile.posts.map(item => {
                         return(
                             <img key={item._id
                             } className="item" src={item.photo} alt={item.title} />
                         )
                     })
                 }
             </div>
         </div>
             : "loading...."}
        </>
    )
}

export default UserProfile;