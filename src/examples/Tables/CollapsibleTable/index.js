import { TableRow } from "@mui/material";
import SkAccordions from "components/ShubhamAccordion";
import ProfilesList from "examples/Lists/ProfilesList";
import profilesListData from "layouts/profile/data/profilesListData";
import authorsTableData from "layouts/tables/data/authorsTableData";
import React from "react";
import DataTable from "../DataTable";
import DataTableBodyCell from "../DataTable/DataTableBodyCell";
import DataTableHeadCell from "../DataTable/DataTableHeadCell";
const CollapsibleTable = () => {
  const { columns, rows } = authorsTableData();
  // console.log(typeof (<></>));
  return (
    <SkAccordions
      name={["shjuoi", "adljkghjk", "akdjsghkujh", "afhgahfahf"].map((column, idx) => (
        <TableRow key={idx} style={{ width: "100%" }}>
          <DataTableHeadCell
            width={column.width ? column.width : "auto"}
            align={column.align ? column.align : "left"}
          >
            {column}
          </DataTableHeadCell>
        </TableRow>
      ))}
      details={["shjuo4545i", "adljkg434hjk", "ak3443djsghkujh", "aagfg", "4343"].map(
        (column, idx) => (
          <TableRow key={idx}>
            <DataTableBodyCell key={idx} noBorder={true} align={"left"}>
              {column}
            </DataTableBodyCell>
          </TableRow>
        )
      )}
    />
  );
};

export default CollapsibleTable;
