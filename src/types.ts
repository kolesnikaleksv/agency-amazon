export interface AccountItemProps {
  accountId: number;
  title: string;
  creationDate: string;
  email: string;
  onOpen: () => {};
  authToken: string;
}

export type DataType = {
  data: IAccount[]
}

export type IAccount = {
  accountId: number;
  title: string;
  creationDate: string;
  authToken: string;
  email: string;
}

export type Iprofile = {
  id: number;
  photo: string;
  country: string;
  marketPlace: string;
  belongAccountId: number;
  date: string
}

export type ICampaign = {
  id: number;
  clicks: number;
  cost: number;
  date: string;
  belongProfileId: string;
}