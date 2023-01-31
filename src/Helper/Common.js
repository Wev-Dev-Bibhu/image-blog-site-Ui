// export const BASE_URL = "https://image-blog.onrender.com"
export const BASE_URL = "http://localhost:5000"
export const handleDescription = (description) => {
    if (description) {
        if (description.length > 42) {
            return description.charAt(0).toUpperCase() + description.slice(1).substring(0, 41).concat("...")
        } else {
            return description.charAt(0).toUpperCase() + description.slice(1).substring(0, 41)
        }
    } else {
        return "No Description"
    }
}