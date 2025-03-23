export interface PrimitiveProduct{
  name: string;
  price: number;
  createdAt: string;
  imageUrl: string;
  mainDesc: string;
}
export interface Product extends Omit<PrimitiveProduct,"imageUrl">{
  uid: string;
  activated: boolean;
  descHTML: string;
  imageUrls: string[];
  parameters: string;
  categoryDTO: {
    name: string;
    shortId: string;
  }
}
export interface GetProductsResponse{
  products: PrimitiveProduct[];
  totalCount: number;
}
