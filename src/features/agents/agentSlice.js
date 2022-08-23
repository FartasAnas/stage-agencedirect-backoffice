import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import AgentServices from "../../services/AgentServices";

export const getAllClients= createAsyncThunk(
    "admin/getAllAgents",
    async () => {
        const response = await AgentServices.getAllClients();
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