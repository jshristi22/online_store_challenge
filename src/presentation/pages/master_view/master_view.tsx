import styles from "./master_view.module.scss";
import { IProductDataModel } from "../../../data/model/product_data.model";
import CustomCard from "../../components/custom_card/custom_card";

function MasterView({
  data,
  id,
  updateId,
}: {
  data: IProductDataModel[];
  id: number | null;
  updateId: (id: number) => void;
}) {
  return (
    <div className={styles.masterView}>
      {data?.map((pd: IProductDataModel) => {
        return (
          <div
            key={pd?.id}
            className={styles.productCard}
            onClick={() => {
              updateId(pd.id!);
            }}
          >
            <CustomCard data={pd} selected={id === pd.id} />
          </div>
        );
      })}
    </div>
  );
}

export default MasterView;
