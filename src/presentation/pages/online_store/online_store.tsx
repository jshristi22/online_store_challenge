import { useState } from "react";
import {
  fetchProductData,
  fetchProductDetailById,
} from "../../../data/fetch_data";
import CustomCard from "../../components/custom_card/custom_card";
import { useQuery } from "@tanstack/react-query";
import styles from "./online_store.module.scss";
import { CircularProgress, IconButton } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { IProductDataModel } from "../../../data/model/product_data.model";

function OnlineStore() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [isDetailsViewVisible, setIsDetailsViewVisible] = useState<boolean | null>(
    null
  );

  const updateView = () => {
    const width = window.innerWidth;
    if (width <= 1440) {
      // check if any product is selected or not
      if (selectedProductId) {
        // if selected, then show detail card in mobile view
        setIsDetailsViewVisible(true);
      } else {
        // if not, show Master view(sidebar)
        setIsDetailsViewVisible(false);
      }
    } else {
      setIsDetailsViewVisible(null);
    }
  };

  //   Event listner for window resizing
  window.addEventListener("resize", () => {
    updateView();
  });

  // Api calls
  const getAllProducts = async () => await fetchProductData();
  const getSelectedProductDetails = async () => {
    if (selectedProductId === null) return;
    return await fetchProductDetailById({ id: selectedProductId });
  };

  const {
    data: getAllProductData,
    error: getAllProductsError,
    isFetching: isFetchingAllProductStatus,
  } = useQuery({
    queryKey: ["fetchProductDataInOnlineStore"],
    queryFn: getAllProducts,
  });
  const {
    data: getSelectedProductDetailsData,
    error: getSelectedProductDetailsError,
    isFetching: isFetchingSelectedProductDetails,
  } = useQuery({
    queryKey: ["fetchProductDetailByIdInOnlineStore", selectedProductId],
    queryFn: getSelectedProductDetails,
  });

  const getMasterView = () => {
    return (
      <div className={styles.masterView}>
        {/* Loading state */}
        {isFetchingAllProductStatus ? (
          <div className={styles.loaderContainer}>
            <CircularProgress />
            <p>Fetching data...</p>
          </div>
        ) : (
          // Master view
          getAllProductData?.map((pd: IProductDataModel) => {
            return (
              <div
                className={styles.productCard}
                onClick={() => {
                  setSelectedProductId(pd.id!);
                  updateView();
                }}
              >
                <CustomCard data={pd} />
              </div>
            );
          })
        )}
      </div>
    );
  };

  const getDetailView = () => {
    return (
      <div className={styles.detailView}>
        {/* Loader state */}
        {isFetchingSelectedProductDetails ? (
          <div className={styles.loaderContainer}>
            <CircularProgress />
            <p>Fetching data...</p>
          </div>
        ) : getSelectedProductDetailsData ? (
          <>
          {/* Detail view */}
            {isDetailsViewVisible && (
              <div className={styles.backButton}>
                <IconButton
                  onClick={() => {
                    setSelectedProductId(null);
                    setIsDetailsViewVisible(false);
                  }}
                >
                  <ArrowBackIos />
                </IconButton>
              </div>
            )}
            <CustomCard data={getSelectedProductDetailsData} isDetailView />
          </>
        ) : (
          // Empty State
          <div className={styles.emptyState}>
            <h6>Nothing to display...</h6>
            <h1>Select an item to display</h1>
            <h4>
              Select an item from the master view to display details in the
              detail view.
            </h4>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.onlineStoreContainer}>
      {isDetailsViewVisible === null ? (
        <>
          {getMasterView()}
          {getDetailView()}
        </>
      ) : isDetailsViewVisible ? (
        getDetailView()
      ) : (
        getMasterView()
      )}
    </div>
  );
}

export default OnlineStore;
