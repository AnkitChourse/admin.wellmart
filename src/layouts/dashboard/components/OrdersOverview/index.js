import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import { useEffect, useState } from "react";
import { getAllOrders } from "redux/festures/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import MDBadge from "components/MDBadge";
function OrdersOverview({ OrdersOverview, isLoading, isDashboard }) {
  const dispatch = useDispatch();
  // console.log(OrdersOverview, "OrdersOverview");
  // console.log(isLoading, "isLoading");
  // console.log(isDashboard, "isDashboard");
  const { AllOrders } = useSelector((state) => ({ ...state.isOrders }));
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    dispatch(getAllOrders(`/getAllOrder`));
  }, []);
  useEffect(() => {
    const currentMonthOrders =
      AllOrders &&
      AllOrders?.length > 0 &&
      AllOrders.filter((order) => {
        const orderDate = new Date(order?.updatedAt);
        const currentMonth = new Date().getMonth();
        return orderDate.getMonth() === currentMonth;
      });

    const currentMonthOrderCount = currentMonthOrders?.length;
    const totalOrderCount = AllOrders?.length;
    const calculatedPercentage = (currentMonthOrderCount / totalOrderCount) * 100;
    setPercentage(calculatedPercentage);
  }, [AllOrders]);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Orders overview
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              {`${percentage && percentage}% ` || "N/A"}
            </MDTypography>{" "}
            this month
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        {OrdersOverview &&
          OrdersOverview.length > 0 &&
          OrdersOverview.map((value, index) => (
            <TimelineItem
              key={value?._id}
              color={
                (index === 0 && "info") ||
                (index === 1 && "error") ||
                (index === 2 && "warning") ||
                (index === 3 && "primary") ||
                (index === 4 && "success")
              }
              icon={
                (index === 0 && "shopping_cart") ||
                (index === 1 && "payment") ||
                (index === 2 && "inventory_2") ||
                (index === 3 && "notifications") ||
                (index === 4 && "vpn_key")
              }
              title={
                <>
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      "-webkit-line-clamp": 2,
                      "-webkit-box-orient": "vertical",
                      maxWidth: "200px",
                      lineHeight: "20px",
                    }}
                  >
                    {value?.items?.at(0)?.productId?.name}
                  </span>
                  <MDBadge
                    badgeContent={value?.items?.at(0)?.status}
                    color={
                      (value?.items?.at(0)?.status === "DELIVERED" && "success") ||
                      (value?.items?.at(0)?.status === "CANCELLED" && "error") ||
                      (value?.items?.at(0)?.status === "RETURN" && "error") ||
                      (value?.items?.at(0)?.status === "RETURN REQUESTED" && "primary") ||
                      (value?.items?.at(0)?.status === " RETURN IN PROGRESS" && "primary") ||
                      (value?.items?.at(0)?.status === "RETURNED" && "error") ||
                      (value?.items?.at(0)?.status === "PENDING" && "warning") ||
                      (value?.items?.at(0)?.status === "ORDERED" && "secondary") ||
                      (value?.items?.at(0)?.status === "CONFIRMED" && "success") ||
                      (value?.items?.at(0)?.status === "SHIPPED,OUT FOR DELIVERY" && "info")
                    }
                    variant="gradient"
                    size="md"
                  />
                </>
              }
              dateTime={new Date(value?.updatedAt).toLocaleDateString("en-GB", {
                hour: "numeric",
                hour12: true,
                minute: "numeric",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
          ))}
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
OrdersOverview.propTypes = {
  OrdersOverview: PropTypes.any,
  isLoading: PropTypes.any,
  isDashboard: PropTypes.any,
};
