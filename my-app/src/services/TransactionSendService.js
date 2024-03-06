
import { api } from "../lib/axios";


export const findAll = async () => {
    return api.get('/TransactionSend');
}

export const save = async (TransactionSend) => {
    return api.post('/TransactionSend', TransactionSend);
}

export const update = async (TransactionSend) => {
    return api.post(`/TransactionSend/${TransactionSend.id}`, TransactionSend);
}

export const findById = async (id) => {
    return api.get(`/TransactionSend/${id}`);
}

export const remove = async (id) => { 
    return api.delete(`/TransactionSend/${id}`);
}
