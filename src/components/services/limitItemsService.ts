import { IAccount, ICampaign, IProfile } from "../../types";

const limitItemsService = {
  getData: (from: number, to: number, profiles: IProfile[] | IAccount[] | ICampaign[]): Promise<{ data: IProfile[] | IAccount[] | ICampaign[], count: number }> => {

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