export interface IProduct {
  id: string;
  name: string;
  sku: string;
  description: string;
  imageUrl: string;
  unitInStock: number;
  unitPrice: number;
  active: boolean;
  dateCreated: Date;
  lastUpdated: Date;

  page: {
    size: number,
    totalPages: number,
    totalElements: number,
    number: number,
  }

}
