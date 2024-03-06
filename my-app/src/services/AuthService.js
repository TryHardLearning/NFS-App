import { api } from "../lib/axios";

export async function login(user) {
    return api.post('/login', user);
}

export function isAuthenticated() {
    const token = localStorage.getItem('token');
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
    }
    console.log("Token:",token);
    return token ? true : false;
}

function logout() { 
    localStorage.removeItem('token');
}

async function signup(user) { 
    return api.post('/users', user);
}

const AuthService = {
    login,
    isAuthenticated,
    logout,
    signup
}

export default AuthService;
