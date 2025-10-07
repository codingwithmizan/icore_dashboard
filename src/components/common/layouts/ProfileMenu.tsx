"use client";

import { FC, RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiKey, FiUser, FiSettings } from "react-icons/fi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { signOut } from "next-auth/react";

const avatarUrl = "https://i.pravatar.cc/100?img=4";

interface Props {
  showProfile: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  profileRef: RefObject<HTMLDivElement | null>;
}

const menuItems = [
  { href: "/profile", label: "View Profile", icon: <FiUser /> },
  { href: "/change-password", label: "Change Password", icon: <FiKey /> },
  { href: "/settings", label: "Settings", icon: <FiSettings /> },
  {
    href: "/user-management",
    label: "User Management",
    icon: <MdOutlineManageAccounts />,
  },
];

export const ProfileMenu: FC<Props> = ({
  showProfile,
  setShowNotifications,
  setShowProfile,
  profileRef,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="relative" ref={profileRef as RefObject<HTMLDivElement>}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setShowProfile((prev) => !prev);
          setShowNotifications(false);
        }}
        className={`h-11 w-11 rounded-full overflow-hidden border-2 transition-all cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-emerald-300
          ${
            showProfile
              ? "border-emerald-500 ring-4 ring-emerald-300"
              : "border-emerald-500 hover:border-emerald-600"
          }`}
        aria-label="Toggle profile menu"
      >
        <Image
          src={avatarUrl}
          alt="Profile"
          width={44}
          height={44}
          className="object-cover"
          priority
        />
      </motion.button>

      <AnimatePresence>
        {showProfile && (
          <>
            {/* Pointer triangle */}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute right-2.5 top-[54px] w-4 h-4 rotate-45 bg-white border-t border-l border-gray-200 z-50"
            />

            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 mt-3 w-72 bg-white rounded-md border border-gray-200 shadow-xl z-40 overflow-hidden backdrop-blur-sm"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="profile-menu"
            >
              {/* Header */}
              <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-emerald-50/30">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="h-14 w-14 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm"
                >
                  <Image
                    src={avatarUrl}
                    alt="Profile"
                    width={56}
                    height={56}
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <div className="overflow-hidden">
                  <p className="font-semibold text-base text-gray-800 truncate">
                    John Doe
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    john@example.com
                  </p>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="flex flex-col" role="none">
                {menuItems.map(({ href, label, icon }) => {
                  const isActive = pathname.startsWith(href);
                  const itemClasses = isActive
                    ? "bg-emerald-50 text-emerald-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100 hover:text-emerald-600";

                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`relative flex items-center gap-3 px-5 py-3 text-sm transition-colors duration-150 ${itemClasses}`}
                      role="menuitem"
                      onClick={() => setShowProfile(false)}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-indicator"
                          className="absolute left-0 top-0 h-full w-1 bg-emerald-500 rounded-r"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                      <span
                        className={`text-lg ${
                          isActive ? "text-emerald-600" : "text-gray-500"
                        }`}
                      >
                        {icon}
                      </span>
                      <span>{label}</span>

                      <motion.span
                        className="ml-auto text-gray-400 text-md"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <div className="border-t border-gray-100 bg-gray-50/50">
                <button
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors duration-150"
                  onClick={handleLogout}
                  role="menuitem"
                >
                  <FiLogOut className="text-lg" />
                  <span>Logout</span>
                  <span className="ml-auto text-red-300 text-md">⎋</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
