import axios from "axios";
import { DataType } from "../../types";

export interface FetchedData {
  accountId: number;
  title: string;
  creationDate: string;
  authToken: string;
  email: string;
}

export type ProfileType = {
  data: FetchedData[]
}

export interface ICampaign {
  clicks: number;
  cost: number;
  date: string;
  id: number;
}

const useDataService = () => {

  const fetchData = async (path: string) => {
    try {
      const {data , status} = await axios.get<DataType | FetchedData[] | ICampaign>(path);
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
    fetchData
  }
}

export default useDataService;