import axios from 'axios'

export const addGames = async (userData) => {
    return await axios
        .post('games', userData)
        .then((response) => {
            // showSuccessMessage('Congratulations,Your Accouond SuccessFully Created')

            return response
        })

        .catch((err) => {
            console.error(err)
            return err
            // showToast('Something is wrong with the API')
        })
}

export const updateGames = async (id, data) => {
    return await axios
        .put(`games/${id}`, data)
        .then((res) => {
            return res
        })
        .catch((error) => {
            console.log('Error updating data:', error)
        })
}

export const getAllGames = async () => {
    return await axios
        .get('games')
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.error(err)
        })
}
export const getGamesById = async () => {}
export const deleteGames = async () => {}
