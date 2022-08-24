import http from "../app/http-common";
const addAgent = (data) => {
    console.log(data)
    return http.post("/agent/add", data);
};
const addAgence = (data) => {
    console.log(data)
    return http.post("/agence/add", data);
};
const countAgents = () => {
    return http.get("/agent/count");
};

const deleteAgent = (id) => {
    return http.delete(`/agent/delete/${id}`);
}
const getAllAgents =()=>{
    return http.get("/agent/all")
}
const getAllAgence =()=>{
    return http.get("/agence/all")
}
const deleteAgence=(id)=>{
    return http.delete(`/agence/delete/${id}`)
}
const countAgence = () => {
    return http.get("/agence/count");
};
const getAllRoles = () => {
    return http.get("/role/all");
};




const AdminServices = {
    addAgent,
    countAgents,
    deleteAgent,
    getAllAgents,
    getAllAgence,
    deleteAgence,
    countAgence,
    getAllRoles,
    addAgence
};
export default AdminServices;