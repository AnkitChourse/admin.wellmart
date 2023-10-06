import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { skCompany } from "redux/festures/isCompany";
import { getAllNotification } from "redux/festures/notificationSlice";
const SkHelmet = () => {
  const isAdmin = localStorage.getItem("admin_id");
  const isDispatch = useDispatch();
  const { pathname } = useLocation();
  const route = useLocation().pathname?.split("/")?.slice(1)?.at(0)?.replace("-", " ");
  // const isRoute = route?.charAt(0)?.toUpperCase() + route?.slice(1);
  const isTitleName = (string) => {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  };
  useEffect(() => {
    isDispatch(skCompany({ url: "company/getCompany" }));
  }, []);
  const { isSetLoading, notification, isCount } = useSelector((data) => ({
    ...data?.isNotification,
  }));
  const { Loading, companyData } = useSelector((data) => ({ ...data?.isCompany }));
  // const isDispatch = useDispatch();
  useEffect(() => {
    isDispatch(getAllNotification(`getByUserId/${isAdmin}`));
  }, [isCount, pathname]);

  const location = useLocation();
  return (
    <div className="application">
      <Helmet>
        {/* {console.log("lkadhngkjvakjfg")} */}
        <meta charSet="utf-8" />
        <meta name="keywords" content={companyData?.seo_keyword}></meta>
        <meta name="description" content={companyData?.seo_description}></meta>
        <link
          rel="icon"
          type="image/png"
          href={`${process.env.REACT_APP_URI}/${companyData?.fav_icon}`}
          sizes="16x16"
        />
        {isCount && isCount > 0 ? (
          <title>{`(${isCount})${`${isTitleName(route) || "admin"} - ${
            isTitleName(companyData?.site_name) || "adminEasySolutions"
          }`}`}</title>
        ) : (
          <title>{`${isTitleName(route) || "admin"} - ${
            isTitleName(companyData?.site_name) ||  "adminEasySolutions"
          }`}</title>
        )}
      </Helmet>
    </div>
  );
};

export default SkHelmet;
