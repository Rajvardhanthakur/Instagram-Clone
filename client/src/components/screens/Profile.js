import React from 'react'

const Profile = () => {
    return (
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
                    <h4>Steve Jobs</h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h6>86 posts</h6>
                        <h6>32.6M followers</h6>
                        <h6>42 following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <img className="item" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
                <img className="item" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
                <img className="item" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
                <img className="item" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
                <img className="item" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
                <img className="item" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
                <img className="item" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
            </div>
        </div>
    )
}

export default Profile;