export const fetchProductData = async () => {
  try {
    const apiResponse = await fetch(`https://fakestoreapi.com/products/`);
    const productData = await apiResponse.json();
    return productData;
  } catch (error) {
    return error;
  }
};

export const fetchProductDetailById = async ({ id }: { id: number }) => {
  try {
    const apiResponse = await fetch(`https://fakestoreapi.com/products/${id}`);
    const productDetails = await apiResponse.json();
    return productDetails;
  } catch (error) {
    return error;
  }
};
