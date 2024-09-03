import {
  IProductRatingModel,
  productRatingModelFromJson,
} from "./product_rating.model";

export interface IProductDataModel {
  id?: number;
  category?: string;
  description?: string;
  image?: string;
  price?: number;
  rating?: IProductRatingModel;
  title?: string;
}

export const productDataModelFromJson = (json: any): IProductDataModel => {
  return {
    id: json?.id ?? null,
    category: json?.category ?? "",
    description: json?.description ?? "",
    image: json?.image ?? "",
    price: json?.price ?? 0,
    rating: json?.rating ? productRatingModelFromJson(json.rating) : {},
    title: json?.title ?? "",
  };
};
