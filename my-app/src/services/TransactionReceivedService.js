
import { api } from "../lib/axios";

const findAll = async () => {
    return api.get('/TransactionReceived');
}

const saveDTO = async (TransactionReceived) => {
    return api.post('/TransactionReceived', TransactionReceived);
}

const update = async (TransactionReceived) => {
    return api.post(`/TransactionReceived/${TransactionReceived.id}`, TransactionReceived);
}

const findById = async (id) => {
    return api.get(`/TransactionReceived/${id}`);
}

const remove = async (id) => { 
    return api.delete(`/TransactionReceived/${id}`);
}

const TransactionReceivedService = {
    findAll,
    saveDTO,
    findById,
    remove,
    update
}

export default TransactionReceivedService;