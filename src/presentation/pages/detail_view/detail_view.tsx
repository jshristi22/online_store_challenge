import { IconButton } from "@mui/material";
import { IProductDataModel } from "../../../data/model/product_data.model";
import styles from "./details_view.module.scss";
import CustomCard from "../../components/custom_card/custom_card";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function DetailsView({
  data,
  isDesktopView,
  onBackClick,
}: {
  data?: IProductDataModel;
  isDesktopView: boolean;
  onBackClick: () => void;
}) {
  return (
    <div className={styles.detailView}>
      {data ? (
        <>
          {/* Detail view */}
          {!isDesktopView && (
            <div className={styles.backButton}>
              <IconButton onClick={onBackClick}>
                <ArrowBackRoundedIcon />
              </IconButton>
            </div>
          )}
          <CustomCard data={data} isDetailView />
        </>
      ) : (
          <div className={styles.emptyState}>
            {/* Empty State */}
          <h6>Nothing to display...</h6>
          <h1>Select an item to display</h1>
          <h4>
            Select an item from the master view to display details in the detail
            view.
          </h4>
        </div>
      )}
    </div>
  );
}

export default DetailsView;
