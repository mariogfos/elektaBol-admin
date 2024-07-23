import { CSSProperties, Fragment, memo, use, useEffect, useState } from "react";
import styles from "./table.module.css";
import useScreenSize from "@/mk/hooks/useScreenSize";
import { formatNumber } from "@/mk/utils/numbers";

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
    sumarize?: number | boolean;
    sumDec?: number;
  }[];
  data: any;
  footer?: any;
  sumarize?: boolean;
  renderBody?: null | ((item: any, row: any, i: number) => any);
  renderHead?: null | ((item: any, row: any) => any);
  renderFoot?: null | ((item: any, row: any) => any);
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
  sumarize = false,
  renderBody = null,
  renderHead = null,
  renderFoot = null,
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
      {sumarize && (
        <Sumarize
          header={header}
          data={data}
          actionsWidth={actionsWidth}
          renderFoot={renderFoot}
          onButtonActions={onButtonActions}
        />
      )}
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

const Sumarize = memo(function Sumarize({
  header,
  data,
  actionsWidth = "100%",
  renderFoot = false,
  onButtonActions = false,
}: {
  header: any;
  data: any;
  actionsWidth?: any;
  renderFoot?: any;
  onButtonActions?: any;
}) {
  const [sumas, setSumas]: any = useState({});
  const onSumarize = (item: any, row: any, i: number) => {
    if (item.sumarize) {
      setSumas((prev: any) => ({
        ...prev,
        [item.key]: (prev[item.key] || 0) + row[item.key] * 1,
      }));
    }
    return true;
  };
  useEffect(() => {
    if (!data || !header) return;
    data.map((item: any, i: number) => {
      header.map((h: any) => onSumarize(h, item, i));
    });
  }, [data]);

  return (
    <summary>
      {header.map((item: any, index: number) => (
        <div
          key={"foot" + index}
          className={styles[item.responsive] + " " + item.className}
          style={{ ...item.style, width: item.width || "100%" }}
        >
          {renderFoot ? (
            <span>{renderFoot(item, index)}</span>
          ) : item.sumarize ? (
            <div>{formatNumber(sumas[item.key], item.sumDec || 0)}</div>
          ) : (
            ""
          )}
        </div>
      ))}

      {onButtonActions && (
        <div
          className={styles.onlyDesktop}
          style={{ width: actionsWidth || "auto" }}
        >
          {" "}
        </div>
      )}
    </summary>
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
