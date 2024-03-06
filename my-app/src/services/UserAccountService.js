import { api } from "../lib/axios";

export async function findAll() {
    return api.get('/UserAccount');
}

export async function createUser(UserAccount) {
    return api.post('/UserAccount', UserAccount);
}

export async function update(UserAccount) {
    return api.post(`/UserAccount/${UserAccount.id}`, UserAccount);
}

export async function findById(id) {
    return api.get(`/UserAccount/${id}`);
}

export async function remove(id) {
    return api.delete(`/UserAccount/${id}`);
}

const UserAccountService = {
    findAll,
    createUser,
    findById,
    remove,
    update
};

export default UserAccountService;
