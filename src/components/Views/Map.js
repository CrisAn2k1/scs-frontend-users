// import { memo, Suspense, useContext, useEffect, useState } from "react";
// import * as L from "leaflet/dist/leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet.icon.glyph";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";
// import axios from "axios";
// import { apiURL } from "../api";
// import { useDispatch, useSelector } from "react-redux";
// import { showToast } from "../redux/actions";
// import { toast$ } from "../redux/selectors";
// import Loading from "../components/layouts/Loading";
// import Tooltip from "../components/layouts/Tooltip";
// import { useTranslation } from "react-i18next";
// import { OrderDeliveryMethodEnum } from "../constants";

// const Map = () => {
//     const {
//         authState: { isAuthenticated, authLoading },
//     } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const toast = useSelector(toast$);
//     const { t } = useTranslation();
//     // eslint-disable-next-line no-unused-vars
//     const [orderDetail, setOrderDetail] = useState(null);

//     useEffect(() => {
//         if (!authLoading && !isAuthenticated) {
//             navigate(`/login?RedirectTo=${location.pathname}${location.search}`);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [authLoading, isAuthenticated]);

//     useEffect(() => {
//         const getOrderDetail = async () => {
//             try {
//                 const response = await axios.get(`${apiURL}/orders/user-order/${id}`);
//                 if (response?.data?.order) {
//                     if (
//                         response?.data?.order?.deliveryMethod !==
//                         OrderDeliveryMethodEnum.YUM_YUM_EXPRESS
//                     ) {
//                         navigate(`/products`);
//                     }
//                     setOrderDetail(response?.data?.order);
//                 } else {
//                     console.log("line 50");
//                     dispatch(
//                         showToast({
//                             message: t("map.orderNotFound"),
//                             type: "error",
//                         }),
//                     );
//                 }
//             } catch (error) {
//                 console.log("line 58");
//                 dispatch(
//                     showToast({
//                         message: t("map.orderNotFound"),
//                         type: "error",
//                     }),
//                 );
//             }
//         };
//         getOrderDetail();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     useEffect(() => {
//         // set 2 marker
//         let map;
//         const mySuperMap = async () => {
//             try {
//                 const res = await axios.get(`${apiURL}/orders/route/${id}`);
//                 if (res?.data?.route) {
//                     let latlngs = res.data?.route.path;
//                     latlngs = latlngs.map((item) => item.reverse());

//                     const startCoordinate = latlngs[0];
//                     const destinationCoordinate = latlngs[latlngs?.length - 1];
//                     // const driverCoordinate = [10.848094, 106.775276];

//                     // set map
//                     map = L.map("map").setView([startCoordinate[0], startCoordinate[1]], 16);
//                     L.tileLayer(
//                         "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
//                         {
//                             attribution:
//                                 'Map data &copy; <a href="https://fb.com/huynhjs">Phu Nhut Huynh</a>',
//                             id: "mapbox/streets-v12",
//                             tileSize: 512,
//                             zoomOffset: -1,
//                             accessToken: process.env.REACT_APP_MAP_KEY,
//                         },
//                     ).addTo(map);

//                     // icon + popup
//                     // start
//                     var markerStart = L.marker([startCoordinate[0], startCoordinate[1]]).addTo(map);
//                     markerStart.setIcon(
//                         L.icon.glyph({
//                             prefix: "",
//                             glyph: String.fromCharCode(65 + 0),
//                         }),
//                     );
//                     markerStart.bindPopup("<b>Hello!</b><br>We are YumYum.").openPopup();
//                     // dest
//                     var markerDes = L.marker([
//                         destinationCoordinate[0],
//                         destinationCoordinate[1],
//                     ]).addTo(map);
//                     markerDes.setIcon(
//                         L.icon.glyph({
//                             prefix: "",
//                             glyph: String.fromCharCode(65 + 1),
//                         }),
//                     );
//                     // driver
//                     // var markerDriver = L.marker([
//                     //   driverCoordinate[0],
//                     //   driverCoordinate[1],
//                     // ]).addTo(map);
//                     // markerDriver.setIcon(
//                     //   L.icon.glyph({
//                     //     prefix: 'mdi',
//                     //     glyph: 'motorbike',
//                     //   })
//                     // );

//                     // zoom fit to coordinates
//                     // var group = new L.featureGroup([markerStart, markerDes]);
//                     // map.fitBounds(group.getBounds());
//                     var polyline = L.polyline(latlngs, { color: "red", weight: 6 }).addTo(map);
//                     map.fitBounds(polyline.getBounds());
//                 } else {
//                     console.log("line 145");
//                     dispatch(
//                         showToast({
//                             message: t("map.orderNotFound"),
//                             type: "error",
//                         }),
//                     );
//                 }
//             } catch (error) {
//                 console.log("line 153>>>", error?.message);
//                 if (!error?.message.startsWith("Map")) {
//                     dispatch(
//                         showToast({
//                             message: t("map.orderNotFound"),
//                             type: "error",
//                         }),
//                     );
//                 }
//             }
//         };
//         mySuperMap();

//         return () => {
//             map?.remove();
//         };
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     return (
//         <>
//             <div id="map" style={{ height: "750px", zIndex: 1 }}></div>
//             <Suspense fallback={<Loading />}>
//                 <Tooltip toast={toast} />
//             </Suspense>
//         </>
//     );
// };

// export default memo(Map);
