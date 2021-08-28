import * as axios from "axios";


const apiInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'ddc9d1db-d7b7-47d4-96d3-390841650b65'
    }
})

export const usersApi = {
    getUsers(currentPage = 1, usersAmount = 10) {
        return apiInstance.get(`users?count=${usersAmount}&page=${currentPage}`).then(response => {
            response.endOfUsers = !response.data.items.length//checking if it was the end of users on the server
            return response.data
        })
    },
    getUserInfo(id) {
        return apiInstance.get(`profile/${id}`).then(response => {
            return response.data
        })
    },
    unfollowUser(id) {
        return apiInstance.delete(`follow/${id}`).then(response => {
            return response.data
        })
    },
    followUser(id) {
        return apiInstance.post(`follow/${id}`).then(response => {
            return response.data
        })
    }
}

export const userStatusApi = {
    getUserStatus(id) {
        return apiInstance.get(`profile/status/${id}`).then(response => {
            return response.data
        })
    },
    setMyStatus(text) {
        return apiInstance.put(`profile/status`, {
            status: text
        }).then(response => {
            return response.data
        })
    }
}


export const authApi = {
    me() {
        return apiInstance.get(`auth/me`).then(response => {
            return response.data
        })
    },
    signIn(email, password, rememberMe) {
        return apiInstance.post(`auth/login`, {email, password, rememberMe}).then(response => {
            return response.data
        })
    },
    signOut() {
        return apiInstance.delete(`auth/login`).then(response => {
            return response.data
        })
    }
}
export const profileApi = {
    savePhoto(file) {
        const formData = new FormData()
        formData.append('image', file)
        return apiInstance.put('profile/photo', formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.data.resultCode === 0) {
                return response.data.data.photos
            }
        })
    },
    updateProfileInfo(info) {
        return apiInstance.put('profile', {
            ...info
        }).then(response => {
            return response
        })
    }
}
