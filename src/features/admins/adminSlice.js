import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import AdminServices from "../../services/AdminServices";

export const addAgent = createAsyncThunk(
    "admin/addAgent",
    async ({nom,prenom,username,password}) => {
        const response = await AdminServices.addAgent({nom,prenom,username,password});
        return response.data;
    }
);
export const countAgents = createAsyncThunk(
    "admin/countAgents",
    async () => {
        const response = await AdminServices.countAgents();
        return response.data;
    }
);
export const countClients= createAsyncThunk(
    "admin/countClients",
    async () => {
        const response = await AdminServices.countClients();
        return response.data;
    }
);
export const countDemandes = createAsyncThunk(
    "admin/demande",
    async () => {
        const response = await AdminServices.countDemandes();
        return response.data;
    }
);
export const deleteAgent = createAsyncThunk(
    "admin/deleteAgent",
    async (id) => {
        const response = await AdminServices.deleteAgent(id);
        return response.data;
    }
);
export const getAllAgents = createAsyncThunk(
    "admin/getAllAgents",
    async () => {
        const response = await AdminServices.getAllAgents();
        return response.data;
    }
);

export const adminSlice = createSlice({
    name:'admin',
    initialState:{ nom : null , prenom : null , username : null , password : null },
    extraReducers:{
        [addAgent.fulfilled]:(state,action)=>{
            state.push=action.payload;
        },
    }
});
export default adminSlice.reducer;