import axios from "axios";
import { DataType, ICampaign, Iprofile } from "../../types";

const useDataService = () => {

  const fetchData = async (path: string) => {
    try {
      const {data , status} = await axios.get<DataType | ICampaign | Iprofile[]>(path);
      if (status === 200) {
        return data;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      throw error;
    }
  }

  const fetchDataId = async (path: string, id:string) => {
    try {
      const {data , status} = await axios.get<Iprofile>(`${path}/${id}`);
      if (status === 200) {
        return data;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      throw error;
    }
  }

  return {
    fetchData,
    fetchDataId
  }
}

export default useDataService;