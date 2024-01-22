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