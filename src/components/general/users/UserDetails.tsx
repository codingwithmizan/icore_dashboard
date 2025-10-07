import { FC } from "react";
// import Image from "next/image";
import {
  // UserOutlined,
  // MailOutlined,
  // PhoneOutlined,
  WomanOutlined,
  ManOutlined,
  // BankOutlined,
  // FileTextOutlined,
  // GlobalOutlined,
} from "@ant-design/icons";
import { Card, Tag } from "antd";
import { User } from "@/lib/models";

interface Props {
   user: User;
}

export const UserDetails: FC<Props> = () => {
  const user = {
    avatar_url: "https://randomuser.me/api/portraits/women/44.jpg",
    firstName: "Jane",
    lastName: "Doe",
    designation: "Owner at Her Company Inc.",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus.",
    email: "jane@example.com",
    contact_number: "+1 99001001",
    gender: "Female",
    dob: "1998-02-06",
    age: 27,
    current_address: "Beech Creek, PA, Pennsylvania",
    permanent_address: "Arlington Heights, IL, Illinois",
    status: "Active",
    member_since: "2016-11-07",
    experiences: [
      { title: "Owner at Her Company Inc.", period: "March 2020 - Now" },
      { title: "Owner at Her Company Inc.", period: "March 2018 - Now" },
      { title: "Owner at Her Company Inc.", period: "March 2016 - Now" },
    ],
    education: [
      { degree: "Masters Degree in Oxford", period: "March 2020 - Now" },
      { degree: "Bachelors Degree in LPU", period: "March 2010 - March 2016" },
    ],
  };

  const renderGenderIcon = () =>
    user.gender.toLowerCase() === "female" ? (
      <WomanOutlined className="text-pink-500" />
    ) : (
      <ManOutlined className="text-blue-500" />
    );

  return (
    <div className="space-y-6 p-6">
      {/* Profile Card */}
      <Card className="flex flex-col md:flex-row items-center gap-6 rounded-xl shadow-md">
        <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-[4px] border-emerald-400 shadow-lg">
          {/* <Image
            src={user.avatar_url}
            alt={`${user.firstName} ${user.lastName}`}
            width={128}
            height={128}
            className="h-full w-full object-cover"
          /> */}
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-emerald-600 text-lg">{user.designation}</p>
          <p className="mt-3 text-gray-600">{user.summary}</p>

          <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
            <Tag color="green">{user.status}</Tag>
            <Tag color="blue">Member since: {user.member_since}</Tag>
          </div>
        </div>
      </Card>

      {/* About Section */}
      <Card className="rounded-xl shadow-sm mt-4 border-red-400">
        <h3 className="text-lg font-semibold mb-4">About</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
          <p>
            <b>First Name:</b> {user.firstName}
          </p>
          <p>
            <b>Last Name:</b> {user.lastName}
          </p>
          <p>
            <b>Gender:</b> {renderGenderIcon()} {user.gender}
          </p>
          <p>
            <b>Contact No.:</b> {user.contact_number}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>Birthday:</b>{" "}
            {new Date(user.dob).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>
            <b>Current Address:</b> {user.current_address}
          </p>
          <p>
            <b>Permanent Address:</b> {user.permanent_address}
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Experience */}
        <Card className="rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Experience</h3>
          <ul className="space-y-2 text-gray-700">
            {user.experiences.map((exp, idx) => (
              <li key={idx}>
                <b>{exp.title}</b> <br />
                <span className="text-sm text-gray-500">{exp.period}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Education */}
        <Card className="rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Education</h3>
          <ul className="space-y-2 text-gray-700">
            {user.education.map((edu, idx) => (
              <li key={idx}>
                <b>{edu.degree}</b> <br />
                <span className="text-sm text-gray-500">{edu.period}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};
