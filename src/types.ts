export interface AccountItemProps {
  accountId: string;
  title: string;
  creationDate: string;
  email: string;
  onOpen: () => {};
  authToken: string;
  name: 'account'
}

export type IAccount = {
  accountId: string;
  title: string;
  creationDate: string;
  authToken: string;
  email: string;
  name: "account";
}

export type IProfile = {
  id: number;
  photo: string;
  country: string;
  marketPlace: string;
  belongAccountId: string;
  date: string;
  name: "profile";
}

export type ICampaign = {
  id: number;
  clicks: number;
  cost: number;
  date: string;
  belongProfileId: string;
  name: "campaign"
}

export type ProductTypes = ICampaign[] | IAccount[] | IProfile[];