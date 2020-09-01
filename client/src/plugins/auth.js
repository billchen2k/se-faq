import axios from "axios";
import config from "../../config";
import VueJwtDecode from "vue-jwt-decode";

const authLogin = async (password) => {
    try {
        let response = await axios.post(`${config.api}/login`, {
            password
        })
        // If pass the authorization, a token will be in the response
        let token = response.data.token;
        // Store it
        localStorage.setItem("jwt", token);
        if (token) {
            return true;
        }
    } catch (err) {
        console.log(err.response);
    }
    return false;
}

const getUserDetails = () => {
    // If there is a token, we can get a user object, then we know it is an admin
    // Generally, we can decode the token to get user_id, user_name, email, avatar and other basic information
    // But in this case, all we need is "whether it is an admin". so ignore the object itself
    let token = localStorage.getItem("jwt");
    if (token) {
        return VueJwtDecode.decode(token);
    } else {
        // Remember to clear the user
        return null;
    }
}
export { authLogin, getUserDetails }
