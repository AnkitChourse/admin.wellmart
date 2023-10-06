import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import SkLoading from "components/SkLoading";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Company = ({ image, name }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={name} size="sm" />
    <MDTypography
      variant="button"
      fontWeight="medium"
      ml={1}
      lineHeight={1}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        maxWidth: 110,
      }}
    >
      {name}
    </MDTypography>
  </MDBox>
);
const avatars = (members) => (
  <Tooltip title={""} placeholder="bottom">
    <MDAvatar
      src={members}
      alt="name"
      size="xs"
      sx={{
        border: ({ borders: { borderWidth }, palette: { white } }) =>
          `${borderWidth[2]} solid ${white.main}`,
        cursor: "pointer",
        position: "relative",

        "&:not(:first-of-type)": {
          ml: -1.25,
        },

        "&:hover, &:focus": {
          zIndex: "10",
        },
      }}
    />
  </Tooltip>
);
function Projects({ Projects, isLoading }) {
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  const navigate = useNavigate();
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem
        onClick={() => {
          closeMenu();
          navigate("/products");
        }}
      >
        more Products
      </MenuItem>
    </Menu>
  );

  const [rowsData, setRowsData] = useState([]);

  const isColumns = {
    allProducts: [
      { Header: "companies", accessor: "companies", maxWidth: "30%", align: "left" },
      { Header: "images", accessor: "images", width: "10%", align: "left" },
      { Header: "cod", accessor: "cod", align: "center" },
      { Header: "price ", accessor: "price ", align: "center" },
      { Header: "Stock / Qty", accessor: "Stock / Qty", align: "center" },
    ],
  };
  useEffect(() => {
    if (Projects && Projects?.at(0)) {
      const temprows =
        Projects &&
        Projects?.at(0) &&
        Projects?.map((value, index) => ({
          "price ": (
            <MDTypography
              display="block"
              variant="button"
              fontWeight="medium"
              ml={1}
              lineHeight={1}
            >
              {value?.ofPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </MDTypography>
          ),
          images: (
            <MDBox display="flex" py={1}>
              {value?.images &&
                value?.images.length > 0 &&
                value?.images.map((value) =>
                  avatars(`${process.env.REACT_APP_URI}/${value}`, value)
                )}
            </MDBox>
          ),
          cod: (
            <MDBox ml={-1}>
              {value?.cod ? (
                <MDBadge badgeContent="Yes" color="success" variant="gradient" size="md" />
              ) : (
                <MDBadge badgeContent="No" color="error" variant="gradient" size="md" />
              )}
            </MDBox>
          ),
          "Stock / Qty": (
            <MDBox
              sx={{
                display: "flex",
                // flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: 0.5,
              }}
            >
              <MDBox ml={-1}>
                {value?.showStock ? (
                  <MDBadge badgeContent="Yes" color="success" variant="gradient" size="lg" />
                ) : (
                  <MDBadge badgeContent="No" color="error" variant="gradient" size="lg" />
                )}
              </MDBox>
              <MDBadge badgeContent={value?.quantity} color="info" variant="gradient" size="lg" />
            </MDBox>
          ),
          companies: (
            <Company
              image={`${process.env.REACT_APP_URI}/${value?.thumbnail}`}
              name={value?.name || "N/A"}
            />
          ),
        }));
      setRowsData(temprows);
    } else {
      setRowsData([" ", " "]);
    }
  }, [Projects]);
  // console.log(rowsData, "rowsData");
  // console.log(Projects, "Projects");
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Projects
          </MDTypography>
          {Projects && Projects?.at(0) && (
            <MDBox display="flex" alignItems="center" lineHeight={0}>
              <Icon
                sx={{
                  fontWeight: "bold",
                  color: ({ palette: { info } }) => info.main,
                  mt: -0.5,
                }}
              >
                done
              </Icon>
              <MDTypography variant="button" fontWeight="regular" color="text">
                &nbsp;<strong>{Projects.length}</strong> Latest Product
              </MDTypography>
            </MDBox>
          )}
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        {isLoading ? (
          <SkLoading />
        ) : (
          Projects &&
          Projects?.at(0) && (
            <DataTable
              table={{ columns: isColumns?.allProducts, rows: rowsData }}
              isSorted={false}
              entriesPerPage={false}
              isPages={Projects && Projects.length}
              noEndBorder
              canSearch={false}
              showTotalEntries={false}
              pagination={false}
              isPagination={false}
            />
          )
        )}
      </MDBox>
    </Card>
  );
}

export default Projects;
Company.propTypes = {
  image: PropTypes.any,
  name: PropTypes.any,
};
avatars.propTypes = {
  members: PropTypes.any,
};
Projects.propTypes = {
  Projects: PropTypes.any,
  isLoading: PropTypes.bool,
};
