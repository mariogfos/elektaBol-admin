import { CSSProperties, Fragment, memo } from "react";
import styles from "./table.module.css";
import useScreenSize from "@/mk/hooks/useScreenSize";

export type RenderColType = {
  value: any;
  key?: number;
  row?: Record<string, any>;
  i?: number;
  extraData?: any;
};

type PropsType = {
  header?: {
    key: string;
    responsive: string;
    label: string;
    width?: string;
    className?: string;
    onRender?: Function;
    style?: any;
  }[];
  data: any;
  footer?: any;
  renderBody?: null | ((item: any, row: any, i: number) => any);
  renderHead?: null | ((item: any, row: any) => any);
  onRowClick?: (e: any) => void;
  onTabletRow?: (
    item: Record<string, any>,
    i: number,
    onClick: Function
  ) => any;
  onButtonActions?: Function;
  actionsWidth?: string;
  style?: CSSProperties;
  className?: string;
};

const Table = ({
  header = [],
  data,
  footer,
  renderBody = null,
  renderHead = null,
  onRowClick = (e) => {},
  onTabletRow,
  onButtonActions,
  actionsWidth,
  style = {},
  className = "",
}: PropsType) => {
  return (
    <div
      className={styles.table + " " + styles[className] + " " + className}
      style={style}
    >
      <Head
        header={header}
        actionsWidth={actionsWidth}
        renderHead={renderHead}
        onButtonActions={onButtonActions}
      />
      <Body
        onTabletRow={onTabletRow}
        onRowClick={onRowClick}
        data={data}
        header={header}
        actionsWidth={actionsWidth}
        renderBody={renderBody}
        onButtonActions={onButtonActions}
      />
      {footer && <footer>{footer}</footer>}
    </div>
  );
};

const Head = memo(function Head({
  header,
  actionsWidth,
  renderHead,
  onButtonActions,
}: {
  header: any;
  actionsWidth: any;
  renderHead: any;
  onButtonActions: any;
}) {
  return (
    <header>
      {header.map((item: any, index: number) => (
        <div
          key={"th" + index}
          className={styles[item.responsive] + " " + item.className}
          style={{ ...item.style, width: item.width || "100%" }}
          title={renderHead ? renderHead(item, index) : item.label}
        >
          {renderHead ? renderHead(item, index) : item.label}
        </div>
      ))}

      {onButtonActions && (
        <div
          className={styles.onlyDesktop}
          style={{ width: actionsWidth || "auto" }}
        >
          Acciones
        </div>
      )}
    </header>
  );
});

const Body = memo(function Body({
  onTabletRow,
  onRowClick,
  data,
  header,
  actionsWidth,
  renderBody,
  onButtonActions,
}: {
  onTabletRow: any;
  onRowClick: any;
  data: any;
  header: any;
  actionsWidth: any;
  renderBody: any;
  onButtonActions: any;
}) {
  const { isTablet } = useScreenSize();
  return (
    <main>
      {data?.map((row: Record<string, any>, index: number) => (
        <Fragment key={"r_" + index}>
          {isTablet && onTabletRow ? (
            onTabletRow(row, index, onRowClick)
          ) : (
            <div key={"row" + index} onClick={(e) => onRowClick(row)}>
              {header.map((item: any, i: number) => (
                <span
                  key={item.key + i}
                  className={styles[item.responsive] + " " + item.className}
                  style={{ ...item.style, width: item.width || "100%" }}
                >
                  {item.onRender &&
                    item.onRender?.({
                      value: row[item.key],
                      key: item.key,
                      item: row,
                      i: index + 1,
                    })}
                  {!item.onRender && renderBody?.(item, row, index + 1)}
                  {!item.onRender && !renderBody && row[item.key]}
                </span>
              ))}
              {onButtonActions && (
                <span
                  className={styles.onlyDesktop}
                  style={{ width: actionsWidth || "auto" }}
                >
                  {onButtonActions(row)}
                </span>
              )}
            </div>
          )}
        </Fragment>
      ))}
    </main>
  );
});
export default Table;
