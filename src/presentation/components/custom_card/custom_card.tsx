import { IProductDataModel } from "../../../data/model/product_data.model";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import styles from "./custom_card.module.scss";
import { Card, CardContent } from "@mui/material";

function CustomCard({
  data,
  isDetailView = false,
}: {
  data: IProductDataModel;
  isDetailView?: boolean;
}) {
  return (
    <Card>
      <CardContent>
        <div className={styles.customCardContainer}>
          <div className={`${styles.productImage} ${isDetailView ? "" : ""}`}>
            {data?.image ? (
              <img src={data?.image} alt="product image" />
            ) : (
              <ImageNotSupportedIcon />
            )}
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.info}>
              <h1>{data?.category}</h1>
              <h2>{data?.title}</h2>
              <div className={styles.description}>
                <h3>{data?.description}</h3>
              </div>
            </div>
            <h4>{data?.price}</h4>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CustomCard;
