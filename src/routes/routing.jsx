var ThemeRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-desktop",
  },
  {
    path: "/enquiries",
    name: "Enquiry Page",
    icon: "fas fa-street-view",
  },
  {
    path: "/client",
    name: "Clients",
    icon: "fas fa-fire",
  },

  {
    path: "/franchisor",
    name: "Franchiser Details",
    icon: "fas fa-archive",
  },
  {
    path: "/franchise",
    name: "Franchise Details",
    icon: "fas fa-rupee-sign",
  },

  {
    path: "/offer",
    name: "Offer Details",
    icon: "fas fa-book",
  },
  {
    path: "/customer",
    name: "User Master",
    icon: "fas fa-user",
  },
  {
    path: "/slide",
    name: "Slide Show",
    icon: "fas fa-sliders-h",
  },
  {
    path: "/contact",
    name: "Contact Page",
    icon: "fas fa-user",
  },

  // {
  //   path: "/lead",
  //   name: "Lead Management",
  //   icon: "fas fa-address-card",
  // },
  // {
  //   path: "/user",
  //   name: "Users",
  //   icon: "fas fa-users",
  // },

  { path: "/", pathTo: "/dashboard", name: "Dashboard", redirect: true },
];
export default ThemeRoutes;
