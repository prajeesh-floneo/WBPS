import {
  TrendingUp,
  TrendingDown,
  Home,
  Users,
  DollarSign,
  Wrench,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DashboardStats = ({ stats }) => {
  const { t } = useTranslation();

  const statCards = [
    {
      title: t("dashboard.totalProperties"),
      value: stats?.totalProperties || 0,
      icon: Home,
      trend: stats?.propertiesTrend || 0,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: t("dashboard.occupancyRate"),
      value: `${stats?.occupancyRate || 0}%`,
      icon: Users,
      trend: stats?.occupancyTrend || 0,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: t("dashboard.monthlyIncome"),
      value: `₺${(stats?.monthlyIncome || 0).toLocaleString()}`,
      icon: DollarSign,
      trend: stats?.incomeTrend || 0,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: t("dashboard.pendingRequests"),
      value: stats?.pendingRequests || 0,
      icon: Wrench,
      trend: null,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.trend > 0;
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;

        return (
          <Card key={index} className="hover:shadow-card transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-display font-bold text-foreground">
                    {stat.value}
                  </div>
                  {stat.trend !== null && (
                    <div
                      className={`flex items-center gap-1 mt-1 text-xs ${
                        isPositive ? "text-success" : "text-destructive"
                      }`}
                    >
                      <TrendIcon className="h-3 w-3" />
                      <span>
                        {Math.abs(stat.trend)}% {t("dashboard.fromLastMonth")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
