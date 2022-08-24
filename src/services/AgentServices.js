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

const AgentServices={
    getAllClients,
    countClients,
    countDemandes,
    getAllDemandes,
}
export default AgentServices