import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh className="text-amber-500" />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd className="text-amber-500" />,
    path: "/addProduct",
  },
  {
    title: "Account",
    icon: <FaRegChartBar className="text-amber-500" />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/editProfile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt className="text-amber-500" />,
    path: "/contactUs",
  },
];

export default menu;
