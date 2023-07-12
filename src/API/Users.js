import axios from "axios";

export const addUser = async (userData) => {
  let newUser;
  await axios
    .post("users", userData)
    .then((resp) => {
      newUser = resp.data;
      return newUser[0];
    })
    .catch((err) => {
      console.error(err);
    });
  return newUser;
};

export const updateUser = async () => {};

export const deleteUser = async () => {};

export const getAllUser = async () => {};

export const getUserById = async () => {};

export const login = async (loginData) => {
  const { email, password } = loginData;
  let data;
  await axios
    .get(`users?email=${email}&password=${password}&isVerified=true&isDeleted=false`)
    .then((res) => {
      data = res.data;
      return data[0];
    })
    .catch((err) => {
      console.error(err);
      // toaster
    });
  return data;
};
