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

export const updatePassword = (email, oldPassword, newPassword) => {
    return axios.put("/api/user/reset-password",
        {
            email,
            oldPassword,
            newPassword
        },
        { withCredentials: true }
    )
}

export const deleteUserAccount = (email, password) => {
    return axios.delete("/api/user/delete-user", {
        data: { email, password },
        withCredentials: true,
    });
};
