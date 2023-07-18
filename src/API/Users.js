import axios from 'axios'
import { showToast, showSuccessMessage } from '../Pages/ToastMessage/ToastMessage'
/**
 * Description - This API is used to add new user into Json-server
 * @param {Object} userData
 * @param {String} firstName<userData>
 * @param {String} email<userData>
 * @param {String} password<userData>
 * @param {String} confirmPassword<userData>
 * @returns {Promise<object|error>} - Returns Promise which return response or throws error
 * @throws {Error}
 */

export const addUser = async (userData) => {
    let newUser
    await axios
        .post('users', userData)
        .then((response) => {
            // showSuccessMessage('Congratulations,Your Accouond SuccessFully Created')

            newUser = response.data
        })

        .catch((err) => {
            console.error(err)
            // showToast('Something is wrong with the API')
        })
    return newUser
}

// export const updateUser = async (isChecked,row) => {
//     const updateData = { ...row.row.original, isDeleted: isChecked, updatedAt: date }
//     await axios.put(`users/${row.row.original.id}`, updateData)
//     setUsersData((prevData) => {
//         const newData = [...prevData]
//         const index = newData.findIndex((user) => user.id === row.row.original.id)
//         if (index !== -1) {
//             newData[index] = updateData
//         }
//         return newData
//     })
// }

export const deleteUser = async () => {}

/**
 *  Description - This API is used to get data from  Json-server.
 * @param {*}
 * @returns {Promise<object|error>} - Returns Promise which return response or throws error
 * @throws {Error}
 */

export const getAllUser = async () => {
    return await axios
        .get('users')
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.error(err)
            // showToast('Something is wrong with the API')
        })
}

export const getUserById = async () => {}

/**
 *  Description - This API is used to check users authanticity.
 * @param {*} loginData
 * @returns {Promise<object|error>} - Returns Promise which return response or throws error
 * @throws {Error}
 */

export const login = async (loginData) => {
    const { email, password } = loginData
    return await axios
        .get(`users?email=${email}&password=${password}&isVerified=true&isDeleted=false`)
        .then((res) => {
            // showSuccessMessage('Congratulations,Your Are SuccessFully LogIn')

            return res.data[0]
        })
        .catch((err) => {
            console.error(err)
            // showToast('Something is wrong with the API')
            // toaster
        })
}

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        console.log('Request')
        return config
    },
    function (error) {
        showToast('Something is wrong with the API')
        return Promise.reject(error)
    }
)

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        console.log('Response')
        // showSuccessMessage('Succesefull')

        return response
    },
    function (error) {
        showToast('Something is wrong with the API')

        return Promise.reject(error)
    }
)
