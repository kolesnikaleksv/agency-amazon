import axios from "axios";

const useDataService = () => {

  interface FetcedData {
    accountId: number;
    title: string;
    creationDate: string;
    authToken: string;
    email: string;
  }

   type GetResponce = {
    response: FetcedData[]
  }

  const fetchData = async (path: string) => {
    try {
      const {data , status} = await axios.get<GetResponce>(path);
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