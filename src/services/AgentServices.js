import axios from "axios";
import http from "../app/http-common";
const getAllClients = ()=>{
    return http.get("/client/all")
}

const AgentServices={
    getAllClients,
}
export default AgentServices