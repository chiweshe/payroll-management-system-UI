export interface Tax {
  id: number;
  lowerBound: number;
  upperBound: number;
  rate: number;
  status: string;
  dateCreated: string;
  dateLastModified: string;
}
