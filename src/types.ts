export interface AccountItemProps {
  accountId: number;
  title: string;
  creationDate: string;
  email: string;
  onOpen: () => {};
  authToken: string;
}

export interface FetchedData {
  accountId: number;
  title: string;
  creationDate: string;
  authToken: string;
  email: string;
}

export type DataType = {
  data: FetchedData[]
}

export interface PopupActivePayload {
  accountId: number;
  title: string;
  creationDate: string;
  email: string;
}

export interface Iprofile {
  id: number;
  photo: string;
  country: string;
  marketPlace: string;
  belongAccountId: number;
  date: string
}

export interface ICampaign {
  clicks: number;
  cost: number;
  date: string;
  id: number;
}