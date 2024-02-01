import { Iprofile } from "../../types";

const limitItemsService = {
  getData: (from: number, to: number, profiles: Iprofile[]): Promise<{ data: Iprofile[], count: number }> => {
    return new Promise((resolve) => {
      const data = profiles.slice(from, to);
      resolve({
        data,
        count: profiles.length
      })
    })
  }
}
export default limitItemsService;