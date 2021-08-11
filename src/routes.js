import React from "react";
import Loadable from "react-loadable";
import Loader from "./components/loader/Loader";

import Fulllayout from "./layouts/fulllayout.jsx";
function Loading() {
  return (
    <div className="container">
      <div className="row">
        <div
          className="col"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Loader />
        </div>
      </div>
    </div>
  );
}
const Dashboard = Loadable({
  loader: () => import("./views/starter/starter.jsx"),
  loading: Loading,
});

const Enquiries = Loadable({
  loader: () => import("./components/main Components/Enquiries/Enquiries"),
  loading: Loading,
});

const Customer = Loadable({
  loader: () => import("./components/main Components/Customer/Customer"),
  loading: Loading,
});

const Lead = Loadable({
  loader: () => import("./components/main Components/Lead/Lead"),
  loading: Loading,
});
const Offer = Loadable({
  loader: () => import("./components/main Components/Offer/Offer"),
  loading: Loading,
});
const Franchisor = Loadable({
  loader: () => import("./components/main Components/Franchisor/Franchisor"),
  loading: Loading,
});

const Franchise = Loadable({
  loader: () => import("./components/main Components/Franchise/Franchise"),
  loading: Loading,
});

const SlideShow = Loadable({
  loader: () => import("./components/main Components/SlideShow/SlideShow"),
  loading: Loading,
});

const Client = Loadable({
  loader: () => import("./components/main Components/Client/Client"),
  loading: Loading,
});

const Contact = Loadable({
  loader: () => import("./components/main Components/Contact/Contact"),
  loading: Loading,
});
const routes = [
  { path: "/", exact: true, name: "Home", component: Fulllayout },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/enquiries", name: "Enquiries", component: Enquiries },
  { path: "/customer", name: "Customer", component: Customer },
  { path: "/lead", name: "Lead", component: Lead },
  { path: "/franchisor", name: "Lead", component: Franchisor },
  { path: "/franchise", name: "Lead", component: Franchise },
  { path: "/offer", name: "Lead", component: Offer },
  { path: "/slide", name: "Slide", component: SlideShow },
  { path: "/client", name: "Client", component: Client },
  { path: "/contact", name: "Contact", component: Contact },
];

export default routes;
