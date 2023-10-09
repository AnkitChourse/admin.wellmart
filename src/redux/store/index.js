import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "redux/festures/adminSlice";
import alertSlice from "redux/festures/alertSlice";
import AttributeSlice from "redux/festures/AttributeSlice";
import blogSlice from "redux/festures/blogSlice";
import brandSlice from "redux/festures/brandSlice";
import categorySlice from "redux/festures/categorySlice";
// import companySlice from "redux/festures/companySlice";
import couponsSlice from "redux/festures/couponsSlice";
import homeSlice from "redux/festures/homeSlice";
import isCompany from "redux/festures/isCompany";
import isExtraSectionSlice from "redux/festures/isExtraSectionSlice";
import isHomeVideos from "redux/festures/isHomeVideos";
import isLinkableBanners from "redux/festures/isLinkableBanners";
import isTutorialSlice from "redux/festures/isTutorialSlice";
import notificationSlice from "redux/festures/notificationSlice";
import orderSlice from "redux/festures/orderSlice";
import productSlice from "redux/festures/productSlice";
import QuerySlice from "redux/festures/QuerySlice";
import reviewSlice from "redux/festures/reviewSlice";
import userSlice from "redux/festures/userSlice";
import citySlice from "redux/festures/citySlice";
import membershipSlice from "redux/festures/membershipSlice";
import taxSlice from "redux/festures/taxSlice";
import homeBannerSlice from "redux/festures/homeBannerSlice";
import appBannerSlice from "redux/festures/appBannerSlice";
import homeCategoryCartSlice from "redux/festures/homeCategoryCart";
import eHomeCategoryCartSlice from "redux/festures/eHomeCategoryCart";
import eHomeBannerSlice from "redux/festures/eHomeBannerSlice";
import eHomeProduct from "redux/festures/eHomeProduct";
import homeProduct from "redux/festures/homeProduct";
import PermissionsSlice from "redux/festures/PermissionsSlice";

export default configureStore(
  {
    reducer: {
      admin: adminSlice,
      isAlert: alertSlice,
      isPermition: PermissionsSlice,
      isCategory: categorySlice,
      isProducts: productSlice,
      isBrand: brandSlice,
      isAttribute: AttributeSlice,
      isOrders: orderSlice,
      isUsers: userSlice,
      isBlogs: blogSlice,
      isTutorials: isTutorialSlice,
      isQuery: QuerySlice,
      isHomes: homeSlice,
      isExtraSections: isExtraSectionSlice,
      isLinkableBanners: isLinkableBanners,
      isHomeVideos: isHomeVideos,
      isCoupons: couponsSlice,
      // isCompany: companySlice,
      isCompany: isCompany,
      isNotification: notificationSlice,
      isReview: reviewSlice,
      isCity: citySlice,
      isMembership: membershipSlice,
      isTax: taxSlice,
      isHomeBanner: homeBannerSlice,
      isEHomeBanner: eHomeBannerSlice,
      isAppBanner: appBannerSlice,
      isHomeCategoryCart: homeCategoryCartSlice,
      isEHomeCategoryCart: eHomeCategoryCartSlice,
      isEHomeProduct: eHomeProduct,
      isHomeProduct: homeProduct,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
