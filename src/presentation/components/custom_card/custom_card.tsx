import { IProductDataModel } from "../../../data/model/product_data.model";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import styles from "./custom_card.module.scss";
import { Card, CardContent, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
function CustomCard({
  data,
  isDetailView = false,
}: {
  data: IProductDataModel;
  isDetailView?: boolean;
}) {
  return (
    <Card
      sx={{
        width: "100%",
      }}
    >
      <CardContent>
        <div
          className={`${
            isDetailView
              ? styles.customCardDetailsContainer
              : styles.customCardContainer
          }`}
        >
          <div className={styles.productImage}>
            {data?.image ? (
              <img src={data?.image} alt="product image" />
            ) : (
              <ImageNotSupportedIcon />
            )}
            {!isDetailView && (
              <div className={styles.rating}>
                <StarIcon
                  fontSize="small"
                  sx={{
                    color: "#faaf00",
                  }}
                />
                <h6>{data?.rating?.rate}</h6>
                <h6>({data?.rating?.count})</h6>
              </div>
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
            {isDetailView && (
              <div className={styles.rating}>
                <Rating name="read-only" value={data?.rating?.rate} readOnly />
                <h6>{data?.rating?.rate}</h6>
                <p> {data?.rating?.count} reviews </p>
              </div>
            )}
            <h4>$ {data?.price}</h4>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CustomCard;
