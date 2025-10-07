"use client";

import Link from "next/link";
import {
  FiActivity,
  FiBell,
  FiTrendingUp,
  FiDollarSign,
  FiUsers,
  FiCalendar,
  FiPieChart,
  FiShoppingBag,
  FiLayers,
  FiAward,
  FiTarget,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Tooltip, Badge } from "antd";
import { Card, Statistic, Row, Col, Progress, Tag } from "antd";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";

// Modern color palette
const colorPalette = {
  primary: "#3b82f6", // blue
  accent: "#10b981", // subtle green
  dark: "#1e293b",
  light: "#f8fafc",
  muted: "#94a3b8",
  success: "#10b981",
  info: "#3b82f6",
  warning: "#f59e0b",
  danger: "#ef4444",
};

const data = [
  {
    name: "Jan",
    revenue: 4200,
    users: 2600,
    sessions: 2800,
    conversions: 1200,
  },
  { name: "Feb", revenue: 3800, users: 1898, sessions: 2510, conversions: 980 },
  {
    name: "Mar",
    revenue: 2900,
    users: 10200,
    sessions: 2790,
    conversions: 1450,
  },
  {
    name: "Apr",
    revenue: 3180,
    users: 4208,
    sessions: 2300,
    conversions: 1100,
  },
  {
    name: "May",
    revenue: 2190,
    users: 5300,
    sessions: 2581,
    conversions: 1350,
  },
  {
    name: "Jun",
    revenue: 2890,
    users: 4300,
    sessions: 2900,
    conversions: 1600,
  },
  {
    name: "Jul",
    revenue: 3890,
    users: 4800,
    sessions: 2400,
    conversions: 1250,
  },
];

const pieData = [
  { name: "Direct", value: 400 },
  { name: "Organic", value: 300 },
  { name: "Referral", value: 200 },
  { name: "Social", value: 100 },
];

const COLORS = [
  colorPalette.primary,
  colorPalette.accent,
  "#6366f1",
  "#8b5cf6",
];

const cards = [
  {
    title: "User Analytics",
    description: "Detailed user statistics and behavior",
    icon: (
      <FiUsers className="text-3xl" style={{ color: colorPalette.primary }} />
    ),
    href: "/users",
    badge: "Updated",
  },
  {
    title: "Revenue Dashboard",
    description: "Track sales and revenue streams",
    icon: (
      <FiDollarSign
        className="text-3xl"
        style={{ color: colorPalette.accent }}
      />
    ),
    href: "/revenue",
    tooltip: "Real-time data",
  },
  {
    title: "Product Management",
    description: "Manage inventory and products",
    icon: <FiShoppingBag className="text-3xl" style={{ color: "#6366f1" }} />,
    href: "/products",
  },
  {
    title: "Marketing Campaigns",
    description: "Launch and track campaigns",
    icon: <FiTarget className="text-3xl" style={{ color: "#8b5cf6" }} />,
    href: "/marketing",
    badge: "New",
  },
  {
    title: "Content Library",
    description: "Manage all digital assets",
    icon: (
      <FiLayers className="text-3xl" style={{ color: colorPalette.primary }} />
    ),
    href: "/content",
  },
  {
    title: "Achievements",
    description: "View milestones and badges",
    icon: <FiAward className="text-3xl" style={{ color: "#6366f1" }} />,
    href: "/achievements",
  },
];

const conversionRate = 4.8;
const avgOrderValue = 89.5;
const customerSatisfaction = 92;

export const HomeDashboard = () => {
  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <div className="mx-auto">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8"
        >
          <div className="mb-4 md:mb-0">
            <motion.h1
              className="text-2xl md:text-3xl font-bold text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Dashboard Overview
            </motion.h1>
            <motion.p
              className="text-gray-600 text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {` Welcome back! Here's your performance summary`}
            </motion.p>
          </div>
          <motion.div
            className="flex items-center space-x-3 md:space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Tag
              icon={<FiCalendar className="text-gray-600" />}
              color="default"
              className="text-xs md:text-sm"
            >
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </Tag>
            <Badge count={5} size="small" color={colorPalette.accent}>
              <FiBell className="text-lg md:text-xl text-gray-600" />
            </Badge>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} className="mb-6 md:mb-8">
          {[
            {
              title: "Total Revenue",
              value: 112893,
              prefix: <FiDollarSign />,
              suffix: "USD",
              trend: "12.5% increase",
              color: colorPalette.primary,
            },
            {
              title: "Active Users",
              value: 8846,
              prefix: <FiUsers />,
              progress: 70,
              trend: "1,240 new",
              color: colorPalette.accent,
            },
            {
              title: "Conversion Rate",
              value: conversionRate,
              suffix: "%",
              trend: "2.1% increase",
              comparison: "Industry avg: 3.2%",
              color: "#8b5cf6",
            },
            {
              title: "Avg. Order Value",
              value: avgOrderValue,
              prefix: <FiDollarSign />,
              trend: "8.1% increase",
              comparison: "$72.30 last month",
              color: "#6366f1",
            },
          ].map((stat, index) => (
            <Col key={index} xs={24} sm={12} md={6}>
              <motion.div
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
              >
                <Card
                  className="shadow-sm hover:shadow-md transition-all border-0 rounded-lg h-full min-h-[140px]"
                  styles={{
                    body: {
                      padding: "16px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    },
                  }}
                >
                  <Statistic
                    title={
                      <span className="text-gray-600 text-sm">
                        {stat.title}
                      </span>
                    }
                    value={stat.value}
                    precision={stat.title.includes("Rate") ? 1 : 2}
                    prefix={
                      stat.prefix && (
                        <stat.prefix.type
                          className="mr-1"
                          style={{ color: stat.color }}
                        />
                      )
                    }
                    suffix={stat.suffix}
                    style={{
                      color: stat.color,
                      fontSize: "20px",
                      fontWeight: 600,
                    }}
                    className="mb-2"
                  />
                  {stat.progress ? (
                    <>
                      <Progress
                        percent={stat.progress}
                        strokeColor={stat.color}
                        status="active"
                        showInfo={false}
                        className="mt-2 mb-1"
                        size={6}
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          {stat.progress}% of target
                        </span>
                        <span
                          className="text-xs font-medium"
                          style={{ color: stat.color }}
                        >
                          {stat.trend}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <FiTrendingUp
                          className="mr-1"
                          style={{ color: stat.color }}
                        />
                        <span
                          className="text-xs font-medium"
                          style={{ color: stat.color }}
                        >
                          {stat.trend}
                        </span>
                      </div>
                      {stat.comparison && (
                        <span className="text-xs text-gray-500">
                          {stat.comparison}
                        </span>
                      )}
                    </div>
                  )}
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Charts Section */}
        <Row gutter={[16, 16]} className="mb-6 md:mb-8">
          <Col xs={24} lg={16}>
            <motion.div
              whileHover={{ scale: 1.005 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              <Card
                title={
                  <span className="text-gray-800 font-medium">
                    Performance Metrics
                  </span>
                }
                className="shadow-sm border-0 rounded-lg"
                extra={
                  <Tag
                    icon={<FiActivity className="text-gray-600" />}
                    color="default"
                    className="text-xs"
                  >
                    Last 7 Months
                  </Tag>
                }
                styles={{
                  body: {
                    paddingTop: "12px",
                    paddingBottom: "12px",
                  },
                }}
              >
                <div className="flex mb-3 space-x-2">
                  <Tag color="blue" className="text-xs">
                    Revenue
                  </Tag>
                  <Tag color="green" className="text-xs">
                    Users
                  </Tag>
                  <Tag color="purple" className="text-xs">
                    Sessions
                  </Tag>
                </div>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorRevenue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorUsers"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorSessions"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8b5cf6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        axisLine={{ stroke: "#e2e8f0" }}
                      />
                      <YAxis
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        axisLine={{ stroke: "#e2e8f0" }}
                      />
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <ChartTooltip
                        contentStyle={{
                          borderRadius: "6px",
                          border: "none",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          fontSize: "12px",
                        }}
                      />
                      <Legend
                        wrapperStyle={{
                          fontSize: "12px",
                          paddingTop: "10px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        name="Revenue (USD)"
                      />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#10b981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorUsers)"
                        name="Active Users"
                      />
                      <Area
                        type="monotone"
                        dataKey="sessions"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorSessions)"
                        name="Sessions"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} lg={8}>
            <motion.div
              whileHover={{ scale: 1.005 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.3 }}
            >
              <Card
                title={
                  <span className="text-gray-800 font-medium">
                    Traffic Sources
                  </span>
                }
                className="shadow-sm border-0 rounded-lg"
                extra={
                  <Tag
                    icon={<FiPieChart className="text-gray-600" />}
                    color="default"
                    className="text-xs"
                  >
                    This Month
                  </Tag>
                }
                styles={{
                  body: {
                    paddingTop: "12px",
                    paddingBottom: "12px",
                  },
                }}
              >
                <div className="mb-3">
                  <span className="text-xs text-gray-500">
                    Total visits: <strong>12,489</strong>
                  </span>
                </div>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(Number(percent ?? 0) * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke="#fff"
                            strokeWidth={1}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip
                        formatter={(value, name) => [value, `${name} traffic`]}
                        contentStyle={{
                          borderRadius: "6px",
                          fontSize: "12px",
                        }}
                      />
                      <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        wrapperStyle={{
                          fontSize: "12px",
                          paddingLeft: "10px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Secondary Metrics */}
        <Row gutter={[16, 16]} className="mb-6 md:mb-8">
          <Col xs={24} md={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.3 }}
            >
              <Card
                title={
                  <span className="text-gray-800 font-medium">
                    Conversion Funnel
                  </span>
                }
                className="shadow-sm border-0 rounded-lg"
                styles={{
                  body: {
                    padding: "16px",
                  },
                }}
              >
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Visits", value: 12489 },
                        { name: "Add to Cart", value: 4231 },
                        { name: "Initiate Checkout", value: 2983 },
                        { name: "Purchases", value: 1892 },
                      ]}
                      layout="vertical"
                      margin={{ left: 30, right: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        type="number"
                        tick={{ fill: "#64748b", fontSize: 12 }}
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        width={80}
                      />
                      <ChartTooltip
                        contentStyle={{
                          borderRadius: "6px",
                          fontSize: "12px",
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill={colorPalette.primary}
                        radius={[0, 4, 4, 0]}
                        name="Users"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Visits to Cart</div>
                    <div className="text-sm font-bold text-blue-500">33.9%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500">
                      Cart to Checkout
                    </div>
                    <div className="text-sm font-bold text-green-500">
                      70.5%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500">
                      Checkout to Purchase
                    </div>
                    <div className="text-sm font-bold text-purple-500">
                      63.4%
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} md={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.3 }}
            >
              <Card
                title={
                  <span className="text-gray-800 font-medium">
                    Customer Satisfaction
                  </span>
                }
                className="shadow-sm border-0 rounded-lg"
                styles={{
                  body: {
                    padding: "16px",
                  },
                }}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="relative w-32 h-32 mb-4">
                    <Progress
                      type="circle"
                      percent={customerSatisfaction}
                      strokeColor={colorPalette.accent}
                      strokeWidth={8}
                      size={128}
                      format={() => (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">
                            {customerSatisfaction}
                          </div>
                          <div className="text-xs text-gray-500">
                            out of 100
                          </div>
                        </div>
                      )}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-base font-medium mb-1 text-gray-800">
                      Excellent Satisfaction Score
                    </div>
                    <p className="text-xs text-gray-600 max-w-xs">
                      Your customer satisfaction score is 8% higher than the
                      industry average. Keep up the great work!
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Quick Actions and Recent Activity */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.3 }}
            >
              <Card
                title={
                  <span className="text-gray-800 font-medium">
                    Quick Actions
                  </span>
                }
                className="shadow-sm border-0 rounded-lg"
                styles={{
                  body: {
                    padding: "12px",
                  },
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {cards.map((card, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 1.3, duration: 0.3 }}
                    >
                      <Tooltip title={card.tooltip} placement="top">
                        <Link href={card.href}>
                          <Card
                            hoverable
                            className="h-full border border-gray-100 hover:border-blue-200 transition-all rounded-lg"
                            styles={{
                              body: {
                                padding: "12px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                              },
                            }}
                          >
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg mb-2 bg-gray-50">
                              {card.icon}
                            </div>
                            <h3 className="text-sm font-medium mb-1 text-gray-800">
                              {card.title}
                              {card.badge && (
                                <Tag
                                  color="green"
                                  className="ml-1"
                                  style={{
                                    fontSize: "10px",
                                    lineHeight: "14px",
                                    padding: "0 4px",
                                  }}
                                >
                                  {card.badge}
                                </Tag>
                              )}
                            </h3>
                            <p className="text-xs text-gray-600">
                              {card.description}
                            </p>
                          </Card>
                        </Link>
                      </Tooltip>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
