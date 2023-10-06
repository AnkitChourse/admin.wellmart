import PropTypes from "prop-types";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import DataTable from "examples/Tables/DataTable";

export default function SkAccordions({
  noBorder,
  index,
  pColumns,
  pRows,
  dRows,
  onClick,
  onChange,
  expanded,
}) {
  // const [expanded, setExpanded] = React.useState(false);

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  return (
    <Accordion
      expanded
      defaultExpanded={false}
      onChange={onchange}
      py={1.5}
      px={3}
      sx={{
        "&.MuiPaper-root": {
          backgroundColor: "transparent.main",
        },
      }}
      style={{
        "&.MuiPaper-root": {
          backgroundColor: "transparent",
          width: "100% !important",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: darkMode && "#fff" }} />}
        aria-controls={`panel${index}bh-content`}
        id={`panel${index}bh-header`}
        py={1.5}
        px={3}
        sx={{
          backgroundColor: "transparent",
          width: "100% !important",
        }}
      >
        {expanded} {pRows}
      </AccordionSummary>

      <AccordionDetails
        py={1.5}
        px={3}
        sx={{
          backgroundColor: "transparent",
          width: "100% !important",
        }}
      >
        <DataTable
          table={{ columns: pColumns, rows: dRows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </AccordionDetails>
    </Accordion>
  );
}
SkAccordions.defaultProps = {
  noBorder: false,
  index: 0,
  pColumns: [],
  pRows: null,
  dRows: [],
};

SkAccordions.propTypes = {
  noBorder: PropTypes.bool,
  index: PropTypes.string,
  pColumns: PropTypes.array.isRequired,
  pRows: PropTypes.node.isRequired,
  dRows: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  expanded: PropTypes.bool.isRequired,

  //   sorted: PropTypes.oneOf([false, "none", "asce", "desc"]),
};
