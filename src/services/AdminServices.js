import axios from "axios";
import http from "../app/http-common";
const addAgent = (data) => {
    return http.post("/agent/add", data);
};
const countAgents = () => {
    return http.get("/agent/count");
};
const countClients = () => {
    return http.get("/client/count");
}
const countDemandes = () => {
    return http.get("/client/demande");
}
const deleteAgent = (id) => {
    return http.delete(`/agent/delete/${id}`);
}
const getAllAgents =()=>{
    return http.get("/agent/all")
}

const AdminServices = {
    addAgent,
    countAgents,
    countClients,
    countDemandes,
    deleteAgent,
    getAllAgents,
};
export default AdminServices;