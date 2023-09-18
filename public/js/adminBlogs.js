
const deleteBlog = async (id) => {
    const willDelete = confirm("Do you want to delete this blog")
    if (willDelete) {
        const r = await fetch(`/blog/${id}`, {
            method: "DELETE",
        })
        const response = await r.json()
        if (response.success) {
            location.reload()
        } else {
            console.log(response)
            console.log("we can't delete this")
            window.alert("we can't delete this")
        }
    }
}


const makeStar = async (id) => {
    const willStar = confirm('Do you want to make it feature blog');
    if (willStar) {
        const r = await fetch(`/makeStar/${id}`, {
            method: "PUT"
        })
        const response = await r.json()

        if (response.success) {
            location.reload()
        } else {
            console.log("we can't make it featured")

        }
    }
}