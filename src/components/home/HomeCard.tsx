"use client";

// import { Metadata } from "next";
import Link from "next/link";
import {
  FiUser,
  FiActivity,
  FiSettings,
  FiBell,
  FiMessageCircle,
  FiBook,
} from "react-icons/fi";
import { motion } from "motion/react";
import { Tooltip } from "antd";

// export const metadata: Metadata = {
//   title: "Home",
//   description: "This is the home page of the application.",
// };

const cards = [
  {
    title: "User Management",
    description: "Manage users, roles, and permissions.",
    icon: <FiUser className="text-3xl text-blue-500" />,
    href: "/users",
    tooltip: "Admins only",
    badge: "Admin",
  },
  {
    title: "Activity Logs",
    description: "View recent activity and system logs.",
    icon: <FiActivity className="text-3xl text-green-500" />,
    href: "/logs",
  },
  {
    title: "Settings",
    description: "Configure system preferences and integrations.",
    icon: <FiSettings className="text-3xl text-indigo-500" />,
    href: "/settings",
    tooltip: "Advanced configurations",
  },
  {
    title: "Notifications",
    description: "Manage alerts and user messages.",
    icon: <FiBell className="text-3xl text-yellow-500" />,
    href: "/notifications",
  },
  {
    title: "Messages",
    description: "Communicate with team and users.",
    icon: <FiMessageCircle className="text-3xl text-pink-500" />,
    href: "/messages",
    badge: "New",
  },
  {
    title: "Documentation",
    description: "Read guides and usage instructions.",
    icon: <FiBook className="text-3xl text-purple-500" />,
    href: "/docs",
  },
];

export const HomeCard = () => {
  return (
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={card.href}>
                <div
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 group cursor-pointer transition-all duration-300 
                  hover:bg-green-50 hover:border-green-400 hover:shadow-[0_4px_20px_rgba(34,197,94,0.2)] transform hover:scale-[1.03]"
                  data-tooltip-id={`card-tooltip-${index}`}
                  data-tooltip-content={card.tooltip}
                >
                  <div className="mb-4">{card.icon}</div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700 transition">
                      {card.title}
                    </h3>
                    {card.badge && (
                      <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </Link>
              {card.tooltip && (
                <Tooltip id={`card-tooltip-${index}`} className="z-50" />
              )}
            </motion.div>
          ))}
        </div>
  )
}
