"use client";

import { useState, RefObject, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBell,
  FiCheck,
  FiClock,
  FiAlertTriangle,
  FiInfo,
} from "react-icons/fi";

interface Notification {
  id: string;
  type: "info" | "warning" | "success";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationMenuProps {
  showNotifications: boolean;
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  notificationsRef: RefObject<HTMLDivElement | null>;
}

export const NotificationMenu: FC<NotificationMenuProps> = ({
  showNotifications,
  setShowNotifications,
  setShowProfile,
  notificationsRef,
}) => {
  const [activeTab, setActiveTab] = useState<"current" | "history">("current");

  // Dummy notifications data
  const currentNotifications: Notification[] = [
    {
      id: "1",
      type: "success",
      title: "Payment Received",
      message: "Your payment of $29.99 has been processed",
      time: "2 min ago",
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Security Alert",
      message: "New login from Chrome on Windows",
      time: "15 min ago",
      read: false,
    },
    {
      id: "3",
      type: "info",
      title: "System Update",
      message: "New update available for your dashboard",
      time: "1 hour ago",
      read: true,
    },
  ];

  const historyNotifications: Notification[] = [
    {
      id: "4",
      type: "info",
      title: "New Feature",
      message: "Check out our new reporting tools",
      time: "2 days ago",
      read: true,
    },
    {
      id: "5",
      type: "success",
      title: "Account Verified",
      message: "Your account verification is complete",
      time: "1 week ago",
      read: true,
    },
  ];

  const unreadCount = currentNotifications.filter((n) => !n.read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <FiCheck className="text-green-500 text-base" />;
      case "warning":
        return <FiAlertTriangle className="text-yellow-500 text-base" />;
      case "info":
        return <FiInfo className="text-blue-500 text-base" />;
      default:
        return <FiInfo className="text-gray-500 text-base" />;
    }
  };

  const handleToggle = () => {
    setShowNotifications((prev) => !prev);
    setShowProfile(false);
  };

  return (
    <div className="relative" ref={notificationsRef}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        aria-label="Toggle notifications"
        className="
          relative 
          h-12 w-12 
          rounded-full 
          bg-green-50 
          hover:bg-green-100 
          transition-colors 
          flex items-center justify-center 
          text-green-700 
          ring-2 ring-transparent
          focus:outline-none focus:ring-green-300
          cursor-pointer
        "
      >
        <FiBell size={20} />

        {unreadCount > 0 && (
          <>
            {/* Pulsing red dot */}
            <span className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white animate-ping"></span>
            <span className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white"></span>
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {showNotifications && (
          <>
            {/* Arrow indicator */}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute right-3 top-11 w-3 h-3 rotate-45 bg-white border-t border-l border-gray-200 z-50"
            />

            {/* Notifications dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-72 bg-white rounded-lg border border-gray-200 shadow-xl z-40 overflow-hidden backdrop-blur-sm"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="notifications-menu"
            >
              {/* Header */}
              <div className="px-4 py-2 border-b border-gray-100 bg-gradient-to-r from-green-50 to-green-50/30">
                <h3 className="font-medium text-sm text-gray-800">
                  Notifications
                </h3>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100">
                <button
                  className={`flex-1 py-2 text-xs font-medium transition-all ${
                    activeTab === "current"
                      ? "text-green-600 border-b-2 border-green-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("current")}
                >
                  Current
                </button>
                <button
                  className={`flex-1 py-2 text-xs font-medium transition-all ${
                    activeTab === "history"
                      ? "text-green-600 border-b-2 border-green-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("history")}
                >
                  History
                </button>
              </div>

              {/* Notifications list */}
              <div className="max-h-80 overflow-y-auto">
                {(activeTab === "current"
                  ? currentNotifications
                  : historyNotifications
                ).map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-2 px-3 py-2 border-b border-gray-100 last:border-b-0 transition-all ${
                      !notification.read ? "bg-blue-50/50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="mt-0.5">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-xs text-gray-800 truncate">
                        {notification.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {notification.message}
                      </p>
                      <div className="flex items-center mt-0.5 text-[0.65rem] text-gray-400">
                        <FiClock className="mr-1" size={10} />
                        {notification.time}
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full self-center"></div>
                    )}
                  </motion.div>
                ))}

                {activeTab === "current" &&
                  currentNotifications.length === 0 && (
                    <div className="px-4 py-4 text-center text-xs text-gray-500">
                      No current notifications
                    </div>
                  )}

                {activeTab === "history" &&
                  historyNotifications.length === 0 && (
                    <div className="px-4 py-4 text-center text-xs text-gray-500">
                      No history notifications
                    </div>
                  )}
              </div>

              {/* Footer */}
              <div className="px-4 py-1.5 border-t border-gray-100 bg-gray-50/50 text-center">
                <button
                  className="text-xs text-green-600 hover:text-green-700 font-medium"
                  onClick={() => alert("Marking all as read...")}
                >
                  Mark all as read
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
