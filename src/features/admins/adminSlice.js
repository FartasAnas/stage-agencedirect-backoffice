import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import AdminServices from "../../services/AdminServices";

export const addAgent = createAsyncThunk(
    "admin/addAgent",
    async ({nom,prenom,username,password,roles,agence}) => {
        const response = await AdminServices.addAgent({nom,prenom,username,password,roles,agence});
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
export const getAllAgence = createAsyncThunk(
    "admin/getAllAgence",
    async () => {
        const response = await AdminServices.getAllAgence();
        return response.data;
    }
);
export const deleteAgence=createAsyncThunk(
    "admin/deleteAgence",
    async (id) => {
        const response = await AdminServices.deleteAgence(id);
        return response.data;
    }
);
export const countAgence = createAsyncThunk(
    "admin/countAgence",
    async () => {
        const response = await AdminServices.countAgence();
        return response.data;
    }
);
export const getAllRoles = createAsyncThunk(
    "admin/getAllRoles",
    async () => {
        const response = await AdminServices.getAllRoles();
        return response.data;
    }
);
export const addAgence = createAsyncThunk(
    "admin/addAgent",
    async ({nom,ville,adresse}) => {
        const response = await AdminServices.addAgence({nom,ville,adresse});
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