import axios from "axios";

export const fetchOverviewData = async () => {
  const response = await axios.get("http://18.60.211.200:8000/api/overview");
  return response.data[0];
};

export const fetchScamTypes = async () =>{
  const response = axios.get("http://18.60.211.200:8000/api/scam-types");
  return (await response).data;
} 

export const fetchScamGrowthData = async () => {
    const response = axios.get("http://18.60.211.200:8000/api/scam-trends");
    return (await response).data;
}

export const fetchMessageAnalysis = async () => {
    const response = axios.get("http://18.60.211.200:8000/api/message-analysis");
    return (await response).data;
}

export const fetchScammersData = async () => {
    const response = axios.get("http://18.60.211.200:8000/api/scammers");
    return (await response).data;
}

export const fetchChannelsData = async () => {
    const response = axios.get("http://18.60.211.200:8000/api/scam-channels");
    return (await response).data;
}
