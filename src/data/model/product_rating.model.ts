export interface IProductRatingModel {
  rate?: number;
  count?: number;
}

export const productRatingModelFromJson = (json: any): IProductRatingModel => {
  return {
    rate: json?.rate ?? 0,
    count: json?.count ?? 0,
  };
};
