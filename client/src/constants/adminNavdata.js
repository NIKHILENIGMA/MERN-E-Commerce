import {
  TbLayoutDashboard,
  SiProducthunt,
  FaListAlt,
  FaUser,
  MdOutlineKeyboardArrowRight,
  GiCircle,
} from "../utils/Icons/icons";

export const data = [
  {
    to: "dashboard",
    title: "Dashboard",
    leftIcon: TbLayoutDashboard,
  },
  {
    title: "Product",
    leftIcon: SiProducthunt,
    rightIcon: MdOutlineKeyboardArrowRight,
    childrens: [
      {
        to: "products/list",
        title: "List",
        leftIcon: GiCircle,
      },
      {
        to: "products/add",
        title: "Add",
        leftIcon: GiCircle,
      },
      {
        to: "products/categories",
        title: "Category",
        leftIcon: GiCircle,
      },
    ],
  },
  {
    title: "Order",
    leftIcon: FaListAlt,
    rightIcon: MdOutlineKeyboardArrowRight,
    childrens: [
      {
        to: "orders/list",
        title: "List",
        leftIcon: GiCircle,
      },
      {
        to: "orders/details",
        title: "Details",
        leftIcon: GiCircle,
      },
    ],
  },
  {
    title: "Customer",
    leftIcon: FaUser,
    rightIcon: MdOutlineKeyboardArrowRight,
    childrens: [
      {
        to: "customers/list",
        title: "List",
        leftIcon: GiCircle,
      },
      {
        to: "customers/details",
        title: "Details",
        leftIcon: GiCircle,
      },
    ],
  },
];

