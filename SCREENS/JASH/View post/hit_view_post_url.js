import { Vibration } from "react-native"

async function upvotepost(id, index) {
    Vibration.vibrate(50)
    var toset = !allpost[index].isliked
    var status = toset ? "like" : "unlike"

    var increment = toset == true ? 1 : -1

    // setallpost(allpost.map((e, i) => {
    //     if (i == index) {
    //         var object = { ...e, isliked: !e.isliked, itemlikedcount: e.itemlikedcount + increment }
    //         return object
    //     }
    //     else return e
    // }))

    setallpost(prevPosts =>
        prevPosts.map((e, i) => {
            if (i === index) {
                return { ...e, isliked: toset, itemlikedcount: e.itemlikedcount + increment };
            }
            return e;
        })
    );

    try {

        const response = await fetch(`${url}posts/upvotePost/${id}/${status}`, {
            method: 'POST',
            body: "",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log(data);
        console.log(response.status);

    }
    catch (err) {
        console.log(err);

    }
}