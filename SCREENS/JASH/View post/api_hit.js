const getpost = async () => {
        
    try {
        // setSkeletonLoading(true)
        const response = await fetch(`${url}posts/getPosts`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        const data = await response.json();
       

        var decode = jwtDecode(token)
        var loggedinUserID = decode._id


        var data1 = data.data.map(e => {

            var object = { ...e, isliked: e.likedBy.includes(loggedinUserID), Applied: e.communityPost ? e.communityPost.communityMembers.includes(loggedinUserID) : false, Jobapplied: e.jobPosts ? e.jobPosts.jobApplicants.includes(loggedinUserID) : false, itemlikedcount: e.likedBy.length }
            return object
        })


        if (data.data.length > 0) {

            setAllPost(data1);

            

            setSkeletonLoading(false);
            
            updateField("allpost", data1.reverse())
        
        }

    }
    catch (err) {
        console.log(err);
    }
    finally {
        setTimeout(() => {
            setSkeletonLoading(false)
        }, 0);
    }
};




const getSinglePost = async()=>{
    setSkeletonLoading(true)
    try {
        const response = await fetch(`${url}test/getOnePost/${route.params.id}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        const {data} = await response.json();
        setSentPost(data[0]);
        // console.log(data[0]);
        // setAllPost(data.data)
        // setSkeletonLoading(false)
    }
    catch (err) {
        console.log(err);
        // setSkeletonLoading(false)
    }
};




export {getSinglePost,getpost}