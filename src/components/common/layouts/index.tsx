export { Header } from "@/components/common/layouts/Header";
export { Sidebar } from "@/components/common/layouts/Sidebar";
export { SidebarMenu } from "@/components/common/layouts/SidebarMenu";
export { DashboardLayout } from "@/components/common/layouts/DashboardLayout";

import {
  FiHome,
  FiUsers,
  FiGrid,
  FiFileText,
  FiPackage,
  FiShoppingCart,
  FiMapPin,
  FiGift,
  FiLayers,
  FiCreditCard,
  FiTruck,
  FiDatabase,
  FiClipboard,
  FiAward,
  FiBell,
  FiBook,
  FiCalendar,
  FiCheckCircle,
  FiDollarSign,
  FiEdit,
  FiHardDrive,
  FiHelpCircle,
  FiInbox,
  FiList,
  FiMonitor,
  FiPercent,
  FiRefreshCw,
  FiSettings,
  FiTag,
  FiTrendingUp,
  FiUser,
  FiUserCheck,
  FiUserPlus,
  FiZap,
  FiImage,
} from "react-icons/fi";
import { GiPayMoney, GiFarmer, GiCash } from "react-icons/gi";
import { ReactNode } from "react";

import {
  MdOutlinePeopleAlt,
  MdOutlinePayments,
  MdOutlineProductionQuantityLimits,
  MdOutlineSupportAgent,
  MdOutlineWarehouse,
  MdOutlineAgriculture,
  MdOutlineRequestQuote,
  MdOutlineSell,
  MdOutlineStore,
  MdOutlineFeedback,
  MdOutlineQuestionAnswer,
  MdOutlineReceiptLong,
  MdOutlineWork,
  MdOutlineAttachMoney,
} from "react-icons/md";
import {
  RiBankLine,
  RiUserSettingsLine,
  RiCustomerService2Line,
  RiCommunityLine,
  RiHandCoinLine,
  RiQuestionAnswerLine,
  RiSurveyLine,
  RiTeamLine,
} from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { TbBuildingBank, TbReportAnalytics, TbTractor } from "react-icons/tb";
import { BiCategory, BiQrScan, BiSpreadsheet } from "react-icons/bi";
import { BsGraphUp, BsPostcard, BsShieldCheck } from "react-icons/bs";
import { IoIosNotificationsOutline, IoMdPricetags } from "react-icons/io";
import { FaRegMoneyBillAlt, FaRegHandshake } from "react-icons/fa";

export type MenuChild = {
  name: string;
  link?: string;
  isPermitted: boolean;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
  external?: boolean;
  target?: "_blank" | "_self";
  children?: MenuChild[];
};

export type MenuItem = {
  name: string;
  link?: string;
  isPermitted: boolean;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
  external?: boolean;
  target?: "_blank" | "_self";
  children?: MenuChild[];
};

export type MenuSection = {
  title: string;
  isPermitted: boolean;
  items: MenuItem[];
  collapsible?: boolean;
  icon?: ReactNode;
};

export const menuItems: MenuSection[] = [
  {
    title: "DASHBOARD",
    isPermitted: true,
    items: [
      { name: "Home", link: "/", icon: <FiHome />, isPermitted: true },
      {
        name: "Field Finance",
        link: "/field-finance",
        icon: <GiPayMoney />,
        isPermitted: true,
      },
      {
        name: "Reports",
        link: "/reports",
        icon: <HiOutlineDocumentReport />,
        isPermitted: true,
      },
        {
        name: "Users",
        link: "/test-users",
        icon: <HiOutlineDocumentReport />,
        isPermitted: true,
      },
    ],
  },
  {
    title: "SOFOL",
    isPermitted: true,
    items: [
      {
        name: "Users",
        link: "#",
        icon: <MdOutlinePeopleAlt />,
        isPermitted: true,
        children: [
          {
            name: "Farmers",
            link: "/sofol/farmers",
            isPermitted: true,
            icon: <GiFarmer />,
          },
          {
            name: "Facilitators",
            link: "/sofol/facilitators",
            isPermitted: true,
            icon: <RiTeamLine />,
          },
          {
            name: "Field Coordinators",
            link: "/sofol/field-coordinators",
            isPermitted: true,
            icon: <FiUserCheck />,
          },
        ],
      },
      {
        name: "Financial Support",
        link: "#",
        icon: <FaRegMoneyBillAlt />,
        isPermitted: true,
        children: [
          {
            name: "Fund Applications",
            link: "/sofol/fund-applications",
            isPermitted: true,
            icon: <MdOutlineRequestQuote />,
          },
          {
            name: "Fund Disbursements",
            link: "/sofol/fund-disbursements",
            isPermitted: true,
            icon: <GiCash />,
          },
          {
            name: "Purchase Orders",
            link: "/sofol/purchase-orders",
            isPermitted: true,
            icon: <FiShoppingCart />,
          },
          {
            name: "Projects",
            link: "/sofol/projects",
            isPermitted: true,
            icon: <FiLayers />,
          },
          {
            name: "Financial Institutions",
            link: "/sofol/financial-institutions",
            isPermitted: true,
            icon: <TbBuildingBank />,
          },
          {
            name: "Master Schemes",
            link: "/sofol/master-schemes",
            isPermitted: true,
            icon: <FiGrid />,
          },
          {
            name: "CEX Follow Up",
            link: "/sofol/farmer-communications",
            isPermitted: true,
            icon: <RiCustomerService2Line />,
          },
          {
            name: "Farm Partnerships",
            link: "/sofol/farm-partnerships",
            isPermitted: true,
            icon: <FaRegHandshake />,
          },
          {
            name: "Bank Orders",
            link: "/sofol/bank-orders",
            isPermitted: true,
            icon: <RiBankLine />,
          },
        ],
      },
      {
        name: "Input Finance",
        icon: <FiCreditCard />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Banks",
            link: "/sofol/input-finance/banks",
            isPermitted: true,
            icon: <RiBankLine />,
          },
          {
            name: "Credit Collections",
            link: "/sofol/input-finance/credit-collections",
            isPermitted: true,
            icon: <MdOutlineReceiptLong />,
          },
          {
            name: "IFC Databases",
            link: "/sofol/input-finance/ifc-databases",
            isPermitted: true,
            icon: <FiDatabase />,
          },
          {
            name: "Payments",
            link: "/sofol/input-finance/payments",
            isPermitted: true,
            icon: <MdOutlinePayments />,
          },
          {
            name: "Requests",
            link: "/sofol/input-finance/requests",
            isPermitted: true,
            icon: <FiInbox />,
          },
        ],
      },
      {
        name: "Service Requests",
        icon: <MdOutlineSupportAgent />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Advisory Packages",
            link: "/sofol/service-requests/advisory-packages",
            isPermitted: true,
            icon: <FiPackage />,
          },
          {
            name: "Insurances",
            link: "/sofol/service-requests/insurances",
            isPermitted: true,
            icon: <BsShieldCheck />,
          },
          {
            name: "Soil Tests",
            link: "/sofol/service-requests/soil-tests",
            isPermitted: true,
            icon: <MdOutlineAgriculture />,
          },
        ],
      },
      {
        name: "Others",
        icon: <FiGrid />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Alerts",
            link: "/sofol/alerts",
            isPermitted: true,
            icon: <FiBell />,
          },
          {
            name: "iFarmer Centers",
            link: "/sofol/ifarmer-centers",
            isPermitted: true,
            icon: <RiCommunityLine />,
          },
          {
            name: "Soil Tests",
            link: "/sofol/soil-tests",
            isPermitted: true,
            icon: <MdOutlineAgriculture />,
          },
          {
            name: "Advisory Packages",
            link: "/sofol/advisory-packages",
            isPermitted: true,
            icon: <FiBook />,
          },
        ],
      },
    ],
  },
  {
    title: "FOLON",
    isPermitted: true,
    items: [
      {
        name: "Communities",
        icon: <RiCommunityLine />,
        link: "/folon/communities",
        isPermitted: true,
      },
      {
        name: "Users",
        icon: <MdOutlinePeopleAlt />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Farmers",
            link: "/folon/farmers",
            isPermitted: true,
            icon: <GiFarmer />,
          },
        ],
      },
      {
        name: "Service Requests",
        icon: <MdOutlineSupportAgent />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Advisory",
            link: "/folon/service-requests/advisory",
            isPermitted: true,
            icon: <FiBook />,
          },
          {
            name: "Fund",
            link: "/folon/service-requests/fund",
            isPermitted: true,
            icon: <RiHandCoinLine />,
          },
        ],
      },
      {
        name: "Others",
        icon: <FiGrid />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Advisory Contents",
            link: "/folon/advisory-contents",
            isPermitted: true,
            icon: <BsPostcard />,
          },
          {
            name: "Alerts",
            link: "/folon/alerts",
            isPermitted: true,
            icon: <FiBell />,
          },
        ],
      },
    ],
  },
  {
    title: "KRISHOP",
    isPermitted: true,
    items: [
      {
        name: "Product",
        icon: <MdOutlineProductionQuantityLimits />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Categories",
            link: "/retailers/categories",
            isPermitted: true,
            icon: <BiCategory />,
          },
          {
            name: "Products",
            link: "/retailers/products",
            isPermitted: true,
            icon: <MdOutlineProductionQuantityLimits />,
          },
          {
            name: "Pricing",
            link: "/retailers/pricing",
            isPermitted: true,
            icon: <IoMdPricetags />,
          },
          {
            name: "Discounts",
            link: "/retailers/discounts",
            isPermitted: true,
            icon: <FiPercent />,
          },
          {
            name: "Promo Codes",
            link: "/retailers/promo-codes",
            isPermitted: true,
            icon: <FiTag />,
          },
          {
            name: "Top Products",
            link: "/retailers/top-products",
            isPermitted: true,
            icon: <BsGraphUp />,
          },
          {
            name: "Discounted Products",
            link: "/retailers/discounted-products",
            isPermitted: true,
            icon: <MdOutlineSell />,
          },
          {
            name: "Discount Campaigns",
            link: "/retailers/discount-campaigns",
            isPermitted: true,
            icon: <FiTrendingUp />,
          },
          {
            name: "Companies",
            link: "/retailers/companies",
            isPermitted: true,
            icon: <MdOutlineStore />,
          },
        ],
      },
      {
        name: "Order Management",
        icon: <FiShoppingCart />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Retailer Orders",
            link: "/retailers/orders",
            isPermitted: true,
            icon: <FiShoppingCart />,
          },
          {
            name: "Return Replacements",
            link: "/retailers/return-replacements",
            isPermitted: true,
            icon: <FiRefreshCw />,
          },
          {
            name: "Requisition Requests",
            link: "/retailers/requisition-requests",
            isPermitted: true,
            icon: <FiClipboard />,
          },
          {
            name: "Purchase Orders",
            link: "/retailers/purchase-orders",
            isPermitted: true,
            icon: <FiShoppingCart />,
          },
          {
            name: "QC Failed Products",
            link: "/retailers/qc-failed-products",
            isPermitted: true,
            icon: <FiCheckCircle />,
          },
          {
            name: "Inventory Products",
            link: "/retailers/inventory-products",
            isPermitted: true,
            icon: <MdOutlineWarehouse />,
          },
          {
            name: "Transactions",
            link: "/retailers/transactions",
            isPermitted: true,
            icon: <MdOutlinePayments />,
          },
        ],
      },
      {
        name: "Users",
        icon: <MdOutlinePeopleAlt />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Suppliers",
            link: "/retailers/suppliers",
            isPermitted: true,
            icon: <FiTruck />,
          },
          {
            name: "Retailers",
            link: "/retailers/retailer-users",
            isPermitted: true,
            icon: <FiUser />,
          },
          {
            name: "Customers",
            link: "/retailers/customers",
            isPermitted: true,
            icon: <FiUserPlus />,
          },
          {
            name: "Push Notifications",
            link: "/retailers/push-notifications",
            isPermitted: true,
            icon: <IoIosNotificationsOutline />,
          },
        ],
      },
      {
        name: "Community Platform",
        icon: <RiCommunityLine />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Banners",
            link: "/retailers/banners",
            isPermitted: true,
            icon: <FiImage />,
          },
          {
            name: "Communities",
            link: "/retailers/communities",
            isPermitted: true,
            icon: <RiCommunityLine />,
          },
          {
            name: "Community Contents",
            link: "/retailers/community-contents",
            isPermitted: true,
            icon: <BsPostcard />,
          },
          {
            name: "Community Q/A",
            link: "/retailers/community-qas",
            isPermitted: true,
            icon: <RiQuestionAnswerLine />,
          },
        ],
      },
      {
        name: "Locations",
        icon: <MdOutlineWarehouse />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Warehouses",
            link: "/retailers/warehouses",
            isPermitted: true,
            icon: <MdOutlineWarehouse />,
          },
          {
            name: "Shelves",
            link: "/retailers/shelves",
            isPermitted: true,
            icon: <FiHardDrive />,
          },
          {
            name: "Operational Areas",
            link: "/retailers/operational-areas",
            isPermitted: true,
            icon: <FiMapPin />,
          },
        ],
      },
      {
        name: "Scratch Cards",
        icon: <FiGift />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Cards",
            link: "/retailers/cards",
            isPermitted: true,
            icon: <FiGift />,
          },
          {
            name: "Rewards",
            link: "/retailers/rewards",
            isPermitted: true,
            icon: <FiAward />,
          },
          {
            name: "Claim Requests",
            link: "/retailers/claim-requests",
            isPermitted: true,
            icon: <FiDollarSign />,
          },
        ],
      },
    ],
  },
  {
    title: "IFARMER",
    isPermitted: true,
    items: [
      {
        name: "Farm",
        icon: <MdOutlineAgriculture />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Farms",
            link: "/investors/farms",
            isPermitted: true,
            icon: <TbTractor />,
          },
          {
            name: "Insurances",
            link: "/investors/insurances",
            isPermitted: true,
            icon: <BsShieldCheck />,
          },
        ],
      },
      {
        name: "Investor",
        icon: <FiUser />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Users",
            link: "/investors/users",
            isPermitted: true,
            icon: <FiUser />,
          },
          {
            name: "Leads",
            link: "/investors/leads",
            isPermitted: true,
            icon: <FiUserPlus />,
          },
          {
            name: "Reported Problems",
            link: "/investors/reported-problems",
            isPermitted: true,
            icon: <FiHelpCircle />,
          },
          {
            name: "User Feedbacks",
            link: "/investors/user-feedbacks",
            isPermitted: true,
            icon: <MdOutlineFeedback />,
          },
        ],
      },
      {
        name: "Orders",
        icon: <FiShoppingCart />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Investor Orders",
            link: "/investors/orders",
            isPermitted: true,
            icon: <FiShoppingCart />,
          },
          {
            name: "Return Disbursements",
            link: "/investors/return-disbursements",
            isPermitted: true,
            icon: <MdOutlineAttachMoney />,
          },
          {
            name: "Tax Acknowledgements",
            link: "/investors/tax-acknowledgements",
            isPermitted: true,
            icon: <MdOutlineReceiptLong />,
          },
        ],
      },
    ],
  },
  {
    title: "SUPPLY CHAIN",
    isPermitted: true,
    items: [
      {
        name: "Buyers",
        icon: <FiUser />,
        link: "/supply-chain/buyers",
        isPermitted: true,
      },
      {
        name: "Purchase Agents",
        icon: <FiUserCheck />,
        link: "/supply-chain/suppliers",
        isPermitted: true,
      },
      {
        name: "Purchase Requisitions",
        icon: <FiClipboard />,
        link: "/supply-chain/purchase-requisitions",
        isPermitted: true,
      },
      {
        name: "Payment Reconciliations",
        icon: <BiSpreadsheet />,
        link: "/supply-chain/payment-reconciliations",
        isPermitted: true,
      },
    ],
  },
  {
    title: "P&C",
    isPermitted: true,
    items: [
      {
        name: "Departments",
        icon: <MdOutlineWork />,
        link: "/pc/departments",
        isPermitted: true,
      },
      {
        name: "Employees",
        icon: <FiUsers />,
        link: "/pc/employees",
        isPermitted: true,
      },
      {
        name: "Company Values",
        icon: <FiAward />,
        link: "/pc/company-values",
        isPermitted: true,
      },
      {
        name: "Dashboard",
        icon: <FiMonitor />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Appraisal",
            link: "/pc/dashboards/appraisal",
            isPermitted: true,
            icon: <TbReportAnalytics />,
          },
          {
            name: "Peer Review",
            link: "/pc/dashboards/peer-review",
            isPermitted: true,
            icon: <RiSurveyLine />,
          },
        ],
      },
      {
        name: "Peer Review",
        icon: <RiSurveyLine />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Questions",
            link: "/pc/survey-questions",
            isPermitted: true,
            icon: <RiQuestionAnswerLine />,
          },
          {
            name: "Surveys",
            link: "/pc/surveys",
            isPermitted: true,
            icon: <RiSurveyLine />,
          },
          {
            name: "Responses",
            link: "/pc/survey-responses",
            isPermitted: true,
            icon: <MdOutlineQuestionAnswer />,
          },
        ],
      },
      {
        name: "Employee appraisal",
        icon: <FiEdit />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Value Sessions",
            link: "/pc/appraisals/value-sessions",
            isPermitted: true,
            icon: <FiCalendar />,
          },
          {
            name: "Review Sessions",
            link: "/pc/appraisals/review-sessions",
            isPermitted: true,
            icon: <FiEdit />,
          },
        ],
      },
    ],
  },
  {
    title: "GENERAL",
    isPermitted: true,
    items: [
      {
        name: "Users",
        icon: <FiUsers />,
        link: "/users",
        isPermitted: true,
      },
      {
        name: "Roles",
        icon: <RiUserSettingsLine />,
        link: "/roles",
        isPermitted: true,
      },
      {
        name: "Community Posts",
        icon: <BsPostcard />,
        link: "/community-posts",
        isPermitted: true,
      },
      {
        name: "QR",
        icon: <BiQrScan />,
        link: "/qrs",
        isPermitted: true,
      },
      {
        name: "Info Hub",
        icon: <FiBook />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Contents",
            link: "/info-hub/contents",
            isPermitted: true,
            icon: <FiFileText />,
          },
          {
            name: "Management",
            link: "/info-hub/management",
            isPermitted: true,
            icon: <FiSettings />,
          },
        ],
      },
      {
        name: "Miscellaneous",
        icon: <FiZap />,
        link: "#",
        isPermitted: true,
        children: [
          {
            name: "Update Summaries",
            link: "/update-summaries",
            isPermitted: true,
            icon: <FiList />,
          },
        ],
      },
    ],
  },
];
