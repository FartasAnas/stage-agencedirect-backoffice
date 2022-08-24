import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import AgentServices from "../../services/AgentServices";

export const getAllClients= createAsyncThunk(
    "agent/getAllAgents",
    async () => {
        const response = await AgentServices.getAllClients();
        return response.data;
    }
);
export const countClients= createAsyncThunk(
    "agent/countClients",
    async () => {
        const response = await AgentServices.countClients();
        return response.data;
    }
);
export const countDemandes = createAsyncThunk(
    "agent/demande",
    async () => {
        const response = await AgentServices.countDemandes();
        return response.data;
    }
);
export const getAllDemandes= createAsyncThunk(
    "agent/getAllDemandes",
    async () => {
        const response = await AgentServices.getAllDemandes();
        return response.data;
    }
);

export const adminSlice = createSlice({
    name:'agent',
    initialState:{ nom : null , prenom : null , username : null , password : null },
    extraReducers:{
        [getAllClients.fulfilled]:(state,action)=>{
            state.push=action.payload;
        },
    }
});
export default adminSlice.reducer;