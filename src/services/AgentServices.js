import http from "../app/http-common";
const getAllClients = ()=>{
    return http.get("/client/all")
}
const countClients = () => {
    return http.get("/client/count");
}
const countDemandes = () => {
    return http.get("/client/demande");
}
const getAllDemandes = () => {
    return http.get("/client/inactive/all");
}
const activateStudent = (id) => {
    return http.put(`/etudiant/update/${id}`,{"active":true});
}
const activateNormalUser = (id) => {
    return http.put(`/marocainresident/update/${id}`,{"active":true});
}
const deleteClient = (id) => {
    return http.delete(`/client/delete/${id}`);
}


const AgentServices={
    getAllClients,
    countClients,
    countDemandes,
    getAllDemandes,
    activateStudent,
    activateNormalUser,
    deleteClient,
}
export default AgentServices