"use client";

import { useEffect, useRef, useState, FC } from "react";
import { motion } from "motion/react";
import { LiaBarsSolid } from "react-icons/lia";
import { NotificationMenu } from "@/components/common/layouts/NotificationMenu";
import { ProfileMenu } from "./ProfileMenu";
// import { SessionProvider } from "next-auth/react";
interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const Header: FC<Props> = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow border-b border-gray-200">
      <nav className="py-4 px-8 mx-auto flex justify-between items-center">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="text-green-700 hover:text-green-900 transition"
        >
          <LiaBarsSolid
            size={24}
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </motion.button>
        <div className="flex items-center space-x-4 relative">
          <NotificationMenu
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            setShowProfile={setShowProfile}
            notificationsRef={notificationRef}
          />

          <ProfileMenu
            showProfile={showProfile}
            setShowNotifications={setShowNotifications}
            setShowProfile={setShowProfile}
            profileRef={profileRef}
          />
        </div>
      </nav>
    </header>
  );
};
