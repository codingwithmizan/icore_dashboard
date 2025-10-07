import { Metadata } from "next";
import { HomeDashboard } from "@/components/home/HomeDashboard";

export const metadata: Metadata = {
  title: "iCORE Dashboard",
  description:
    "Comprehensive overview of your application with analytics and quick actions.",
};

const Home = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return <HomeDashboard />;
};

export default Home;


