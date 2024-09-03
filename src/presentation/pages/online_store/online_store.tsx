import { useState } from "react";
import {
  fetchProductData,
  fetchProductDetailById,
} from "../../../data/fetch_data";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, useMediaQuery } from "@mui/material";
import MasterView from "../master_view/master_view";
import DetailsView from "../detail_view/detail_view";
import styles from "./online_store.module.scss";

function OnlineStore() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const isDesktopView = useMediaQuery((theme: any) =>
    theme.breakpoints.up("md")
  );

  // Api calls
  const getAllProducts = async () => await fetchProductData();
  const getSelectedProductDetails = async () => {
    if (selectedProductId === null) return;
    return await fetchProductDetailById({ id: selectedProductId });
  };

  const { data: getAllProductData, isFetching: isFetchingAllProductStatus } =
    useQuery({
      queryKey: ["fetchProductDataInOnlineStore"],
      queryFn: getAllProducts,
    });
  const {
    data: getSelectedProductDetailsData,
    isFetching: isFetchingSelectedProductDetails,
  } = useQuery({
    queryKey: ["fetchProductDetailByIdInOnlineStore", selectedProductId],
    enabled: Boolean(selectedProductId),
    queryFn: getSelectedProductDetails,
  });

  const getMasterView = () => {
    return (
      <div className={styles.masterViewContainer}>
        {/* Loading state */}
        {isFetchingAllProductStatus ? (
          <div className={styles.loaderContainer}>
            <CircularProgress />
            <p>Fetching data...</p>
          </div>
        ) : (
          <MasterView
            data={getAllProductData}
            id={selectedProductId}
            updateId={(id) => setSelectedProductId(id)}
          />
        )}
      </div>
    );
  };

  const getDetailView = () => {
    return (
      <div className={styles.detailViewContainer}>
        {/* Loader state */}
        {isFetchingSelectedProductDetails ? (
          <div className={styles.loaderContainer}>
            <CircularProgress />
            <p>Fetching data...</p>
          </div>
        ) : (
          <DetailsView
            data={getSelectedProductDetailsData}
            isDesktopView={isDesktopView}
            onBackClick={() => setSelectedProductId(null)}
          />
        )}
      </div>
    );
  };

  return (
    <div className={styles.onlineStoreContainer}>
      {isDesktopView ? (
        <>
          {getMasterView()}
          {getDetailView()}
        </>
      ) : selectedProductId ? (
        getDetailView()
      ) : (
        getMasterView()
      )}
    </div>
  );
}

export default OnlineStore;
