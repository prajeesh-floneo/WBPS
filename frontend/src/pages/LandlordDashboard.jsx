import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Plus,
  BarChart3,
  FileText,
  Wrench,
  Scale,
  MessageCircle,
} from "lucide-react";
import { DashboardStats } from "@/components/landlord/DashboardStats";
import { PropertyCard } from "@/components/landlord/PropertyCard";
import { AddPropertyDialog } from "@/components/landlord/AddPropertyDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const LandlordDashboard = ({ user }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);

  // Mock data
  const stats = {
    totalProperties: 8,
    occupancyRate: 87.5,
    monthlyIncome: 45000,
    pendingRequests: 3,
    propertiesTrend: 12.5,
    occupancyTrend: 5.2,
    incomeTrend: 8.7,
  };

  const properties = [
    {
      id: 1,
      name: "Luxury Apartment",
      buildingName: "Seaside Residence",
      address: "Beşiktaş, Istanbul",
      bedrooms: 3,
      bathrooms: 2,
      size: 150,
      floor: 5,
      rent: 8500,
      status: "Occupied",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
      ],
    },
    {
      id: 2,
      name: "Modern Studio",
      buildingName: "City Tower",
      address: "Kadıköy, Istanbul",
      bedrooms: 1,
      bathrooms: 1,
      size: 65,
      floor: 12,
      rent: 4200,
      status: "Vacant",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      ],
    },
    {
      id: 3,
      name: "Family Apartment",
      buildingName: "Green Park",
      address: "Üsküdar, Istanbul",
      bedrooms: 4,
      bathrooms: 3,
      size: 180,
      floor: 3,
      rent: 9800,
      status: "Occupied",
      images: [
        "https://images.unsplash.com/photo-1502672260066-6bc35f0a32a0?w=600",
      ],
    },
    {
      id: 4,
      name: "Penthouse Suite",
      buildingName: "Sky Towers",
      address: "Şişli, Istanbul",
      bedrooms: 3,
      bathrooms: 2,
      size: 200,
      floor: 18,
      rent: 12500,
      status: "Listed",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
      ],
    },
  ];

  const recentActivity = [
    {
      type: "payment",
      message: "Rent received from Beşiktaş apartment",
      amount: "₺8,500",
      time: "2 hours ago",
    },
    {
      type: "request",
      message: "New repair request for Kadıköy studio",
      time: "5 hours ago",
    },
    {
      type: "application",
      message: "New tenant application for Şişli penthouse",
      time: "1 day ago",
    },
    {
      type: "contract",
      message: "Contract renewal signed for Üsküdar apartment",
      time: "2 days ago",
    },
  ];

  const incomeData = [
    { month: "Jan", income: 38000 },
    { month: "Feb", income: 41000 },
    { month: "Mar", income: 39500 },
    { month: "Apr", income: 42000 },
    { month: "May", income: 43500 },
    { month: "Jun", income: 45000 },
  ];

  const occupancyData = [
    { month: "Jan", rate: 75 },
    { month: "Feb", rate: 80 },
    { month: "Mar", rate: 78 },
    { month: "Apr", rate: 85 },
    { month: "May", rate: 83 },
    { month: "Jun", rate: 87.5 },
  ];

  const services = [
    {
      title: t("services.requestSPKValuation"),
      description: t("services.professionalValuation"),
      icon: Scale,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: t("services.repairRenovation"),
      description: t("services.submitMaintenance"),
      icon: Wrench,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: t("services.askLawyer"),
      description: t("services.legalConsultation"),
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            {t("dashboard.welcomeBack", { name: user.name })}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("dashboard.happeningToday")}
          </p>
        </div>
        <Button
          className="bg-gradient-accent gap-2"
          onClick={() => setIsAddPropertyOpen(true)}
        >
          <Plus className="h-4 w-4" />
          {t("dashboard.addProperty")}
        </Button>
      </div>

      {/* Stats */}
      <DashboardStats stats={stats} />

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Income Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  Monthly Income
                </CardTitle>
                <CardDescription>
                  Rent collection over last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={incomeData}>
                    <defs>
                      <linearGradient
                        id="incomeGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="hsl(var(--accent))"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--accent))"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      fill="url(#incomeGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Occupancy Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  Occupancy Rate
                </CardTitle>
                <CardDescription>Property occupancy trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={occupancyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--chart-2))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates from your properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth"
                  >
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        activity.type === "payment"
                          ? "bg-success/10"
                          : activity.type === "request"
                          ? "bg-warning/10"
                          : activity.type === "application"
                          ? "bg-blue-50"
                          : "bg-purple-50"
                      }`}
                    >
                      <MessageCircle
                        className={`h-5 w-5 ${
                          activity.type === "payment"
                            ? "text-success"
                            : activity.type === "request"
                            ? "text-warning"
                            : activity.type === "application"
                            ? "text-blue-600"
                            : "text-purple-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                    {activity.amount && (
                      <Badge className="bg-success/10 text-success">
                        {activity.amount}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Properties Tab */}
        <TabsContent value="properties" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onEdit={(p) => console.log("Edit:", p)}
                onViewDetails={(p) => console.log("View:", p)}
              />
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Comprehensive income analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={incomeData}>
                    <defs>
                      <linearGradient
                        id="colorIncome"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="hsl(var(--chart-1))"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--chart-1))"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      fill="url(#colorIncome)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm text-muted-foreground">
                      Avg. Rent
                    </span>
                    <span className="text-lg font-display font-bold text-foreground">
                      ₺7,750
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm text-muted-foreground">
                      Collection Rate
                    </span>
                    <span className="text-lg font-display font-bold text-success">
                      96%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success"
                      style={{ width: "96%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm text-muted-foreground">
                      Maintenance
                    </span>
                    <span className="text-lg font-display font-bold text-warning">
                      ₺3,200
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-warning"
                      style={{ width: "22%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-card transition-shadow cursor-pointer group"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div
                      className={`${service.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`h-8 w-8 ${service.color}`} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {service.description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-smooth"
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Property Dialog */}
      <AddPropertyDialog
        open={isAddPropertyOpen}
        onOpenChange={setIsAddPropertyOpen}
      />
    </div>
  );
};
