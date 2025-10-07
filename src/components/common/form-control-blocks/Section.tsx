"use client";

import { FC, ReactNode, useState, useEffect } from "react";
import { Avatar } from "antd";

interface Props {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export const Section: FC<Props> = ({ icon, title, children }) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  if (!isRendered) {
    return null;
  }

  return (
    <section>
      <div className="mb-4 flex items-center space-x-3">
        <Avatar
          style={{ backgroundColor: "oklch(93.2% 0.032 255.585)", color: "#555" }}
          icon={icon}
        />
        <h2 className="ml-3 text-xl font-medium text-gray-600">{title}</h2>
      </div>
      {children}
    </section>
  );
};
