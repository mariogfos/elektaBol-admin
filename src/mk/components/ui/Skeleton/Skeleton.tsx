import styles from "./styles.module.css";
const CardSkeleton = () => {
  return (
    <div className={styles.cardSkeleton}>
      <div>
        <div />
        <div />
      </div>
      <div>
        <div />
      </div>
    </div>
  );
};
export default CardSkeleton;






export function RevenueChartSkeleton() {
  return (
    <div
      className={styles.revenueChartSkeleton}
    >
      <div />
      <div >
        <div/>
        <div>
          <div/>
          <div/>
        </div>
      </div>
    </div>
  );
}

export function InvoiceSkeleton() {
  return (
    <div className={styles.invoiceSkeleton}>
      <div >
        <div  />
        <div>
          <div  />
          <div/>
        </div>
      </div>
      <div/>
    </div>
  );
}









export function LatestInvoicesSkeleton() {
  return (
    <>
      <div className={styles.latestInvoicesSkeleton}>
        <div>
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
        </div>
      </div>
    </>
  );
}

export function CircleLoading(){
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  )
}