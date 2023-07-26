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

export const addUser = async () => {}

export const updateUser = async () => {}

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
