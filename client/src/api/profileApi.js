import axios from "axios";

export const updateEmail = (email) => {
    return axios.put("/api/user/update-profile-email",
        { email },
        { withCredentials: true });
}

export const updateUserName = (username) => {
    return axios.put("/api/user/update-profile-username",
        { username },
        { withCredentials: true });
}