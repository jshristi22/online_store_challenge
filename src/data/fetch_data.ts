import { productDataModelFromJson } from "./model/product_data.model";

export const fetchProductData = async () => {
  const apiResponse = await fetch(`https://fakestoreapi.com/products/`);
  if (apiResponse.ok) {
    const productData = await apiResponse.json();
    return productData?.map((pd: any) => {
      return productDataModelFromJson(pd);
    });
  } else {
    throw new Error("Something went wrong");
  }
};

export const fetchProductDetailById = async ({ id }: { id: number }) => {
  const apiResponse = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (apiResponse.ok) {
    const productDetails = await apiResponse.json();
    return productDataModelFromJson(productDetails);
  } else {
    throw new Error("Something went wrong");
  }
};
