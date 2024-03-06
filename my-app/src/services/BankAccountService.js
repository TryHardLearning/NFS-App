
import { api } from "../lib/axios";

export const findAll = async () => {
    return api.get('/AccountBank');
}

export const save = async (AccountBank) => {
    return api.post('/AccountBank', AccountBank);
}

export const update = async (AccountBank) => {
    return api.post(`/AccountBank/${AccountBank.id}`, AccountBank);
}

export const findById = async (id) => {
    return api.get(`/AccountBank/${id}`);
}

export const remove = async (id) => { 
    return api.delete(`/AccountBank/${id}`);
}
