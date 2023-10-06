/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDashboardDetails } from "redux/festures/adminSlice";
import axios from "axios";
import { ShoppingCart, AutoMode } from "@mui/icons-material";
import { SkPrice } from "Utils/dateFunc";
import MDTypography from "components/MDTypography";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const isDispatch = useDispatch();
  const admin = localStorage.getItem("admin_id");
  const [isLoading, setIsLoading] = useState(false);
  const [isDashboard, setIsDashboard] = useState(null);
  const [serviceOrderStats, setServiceOrderStats] = useState(null)
  const [ecommOrderStats, setEcommOrderStats] = useState(null)
  const [isMonth, setIsMonth] = useState({});
  const [isDay, setIsDay] = useState({});
  const [isUsers, setIsUsers] = useState({});
  // const [latestProductd, setLatestProductd] = useState([]);
  // const [latestOrders, setLatestOrders] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_APII}/dashBoard/${admin}`,
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              // Accept: "application/json",
              authorization: localStorage.getItem("token"),
            },
          }
        );
        const response2 = await axios.get(
          `${process.env.REACT_APP_APII}/eCommerce/filterOrderByDate/${admin}?page=1`,
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              // Accept: "application/json",
              authorization: localStorage.getItem("token"),
            },
          }
        );
        const response3 = await axios.get(
          `${process.env.REACT_APP_APII}/filterOrderByDate/${admin}?page=1`,
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              // Accept: "application/json",
              authorization: localStorage.getItem("token"),
            },
          }
        );
        // console.log(isDashboard)
        setIsLoading(false);
        setIsDashboard(response.data?.data);
        setEcommOrderStats(response2?.data?.stats);
        setServiceOrderStats(response3?.data?.stats);
        // setLatestProductd(response?.data?.latestProduct);
        // setLatestOrders(response?.data?.latestOrders);
        return response?.data;
      } catch (error) {
        setIsLoading(false);
        return error?.response?.data;
      }
    })();
  }, []);

  useEffect(() => {
    if (isDashboard) {
      setIsMonth({
        labels: Object.keys(isDashboard?.orderCountsByMonth),
        datasets: {
          label: "Order's",
          data: Object.values(isDashboard?.orderCountsByMonth),
        },
      });
      setIsDay({
        labels: Object.keys(isDashboard?.orderCountByWeekday),
        datasets: {
          label: "Order's",
          data: Object.values(isDashboard?.orderCountByWeekday),
        },
      });
      setIsUsers({
        labels: Object.keys(isDashboard?.userData),
        datasets: {
          label: "User's",
          data: Object.values(isDashboard?.userData),
        },
      });
    }
  }, [isDashboard]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="group_add"
                title="Total User's"
                count={isDashboard?.count?.USER}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<ShoppingCart />}
                title="Total Orders"
                count={isDashboard?.count?.ORDER}
              // percentage={{
              //   color: "success",
              //   amount: "+3%",
              //   label: "than last month",
              // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon={<AutoMode />}
                title="Turnover"
                count={SkPrice(isDashboard?.count?.TURNOVER)}
              />
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="leaderboard"
                title="Total Order's"
                count={isDashboard?.totalOrders}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="last Seven Month's Order"
                  // description="Last Campaign Performance"
                  date="Recently Updated"
                  chart={isMonth}
                />
              </MDBox>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid> */}
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="last Seven Day's Order"
                  // description="Last Campaign Performance"
                  date="Recently Updated"
                  // date="just updated"
                  chart={isDay}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox sx={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <MDTypography>Service Orders Stats</MDTypography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="warning"
                  icon="dialpad"
                  title="Pending Order's"
                  count={serviceOrderStats?.pendingCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="dialpad"
                  title="Ordered Order's"
                  count={serviceOrderStats?.orderedCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="dialpad"
                  title="Accepted Order's"
                  count={serviceOrderStats?.acceptedCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="info"
                  icon="dialpad"
                  title="On The Way Order's"
                  count={serviceOrderStats?.onthewayCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="secondary"
                  icon="dialpad"
                  title="Working Order's"
                  count={serviceOrderStats?.workingCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="dialpad"
                  title="Completed Order's"
                  count={serviceOrderStats?.completedCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="error"
                  icon="dialpad"
                  title="Cancelled Order's"
                  count={serviceOrderStats?.cancelCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon={<AutoMode />}
                  title="Turnover"
                  count={SkPrice(serviceOrderStats?.turnOver || 0)}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <ReportsBarChart
            color="info"
            title="User's Distribution"
            // description="Last Campaign Performance"
            date="Recently Updated"
            // date="campaign sent just updated"
            chart={isUsers}
          />
        </MDBox>
        <MDBox sx={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <MDTypography>Ecommerce Orders Stats</MDTypography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="warning"
                  icon="dialpad"
                  title="Pending Order's"
                  count={ecommOrderStats?.pendingCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="dialpad"
                  title="Ordered Order's"
                  count={ecommOrderStats?.orderedCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="info"
                  icon="dialpad"
                  title="Out For Delivery Order's"
                  count={ecommOrderStats?.outOfDeliveryCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="dialpad"
                  title="Delivered Order's"
                  count={ecommOrderStats?.deliveredCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="warning"
                  icon="dialpad"
                  title="Return Request Order's"
                  count={ecommOrderStats?.returnRequestCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="info"
                  icon="dialpad"
                  title="Return Request Approved Order's"
                  count={ecommOrderStats?.returnRequestApprovedCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="error"
                  icon="dialpad"
                  title="Returned Order's"
                  count={ecommOrderStats?.returnedCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="secondary"
                  icon="dialpad"
                  title="Shipped Order's"
                  count={ecommOrderStats?.shippedCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="warning"
                  icon="dialpad"
                  title="Multi Status Order's"
                  count={ecommOrderStats?.multiStatusCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="error"
                  icon="dialpad"
                  title="Cancelled Order's"
                  count={ecommOrderStats?.cancelCount || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon={<AutoMode />}
                  title="Turnover"
                  count={SkPrice(ecommOrderStats?.turnOver || 0)}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects Projects={latestProductd} isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview
                OrdersOverview={latestOrders}
                isLoading={isLoading}
                isDashboard={isDashboard}
              />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
