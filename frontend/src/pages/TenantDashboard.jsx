import { useState } from "react";
import {
  FileText,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";

export const TenantDashboard = ({ user }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("applications");

  const applications = [
    {
      id: 1,
      property: "Luxury Apartment - Beşiktaş",
      address: "Seaside Residence, Floor 5",
      rent: 8500,
      status: "Under Review",
      appliedDate: "2024-01-15",
      score: 85,
      bedrooms: 3,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
    },
    {
      id: 2,
      property: "Modern Studio - Kadıköy",
      address: "City Tower, Floor 12",
      rent: 4200,
      status: "Approved",
      appliedDate: "2024-01-10",
      score: 92,
      bedrooms: 1,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
    },
    {
      id: 3,
      property: "Penthouse Suite - Şişli",
      address: "Sky Towers, Floor 18",
      rent: 12500,
      status: "Rejected",
      appliedDate: "2024-01-05",
      score: 65,
      bedrooms: 3,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
    },
  ];

  const documents = [
    { name: "ID Card", status: "verified", uploadedDate: "2024-01-08" },
    {
      name: "SGK Service Record",
      status: "verified",
      uploadedDate: "2024-01-08",
    },
    { name: "Income Statement", status: "pending", uploadedDate: "2024-01-14" },
    {
      name: "Work Certificate",
      status: "verified",
      uploadedDate: "2024-01-09",
    },
  ];

  const contracts = [
    {
      id: 1,
      property: "Modern Studio - Kadıköy",
      startDate: "2024-02-01",
      endDate: "2025-01-31",
      rent: 4200,
      status: "Active",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
      case "verified":
      case "Active":
        return "bg-success/10 text-success border-success/20";
      case "Under Review":
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "Rejected":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
      case "verified":
      case "Active":
        return <CheckCircle className="h-4 w-4" />;
      case "Under Review":
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "Rejected":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Approved":
        return t("tenant.approved");
      case "Under Review":
        return t("tenant.underReview");
      case "Rejected":
        return t("tenant.rejected");
      case "verified":
        return t("tenant.verified");
      case "pending":
        return t("tenant.pending");
      case "Active":
        return t("tenant.active");
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          {t("dashboard.welcome", { name: user.name })}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t("dashboard.trackApplications")}
        </p>
      </div>

      {/* Application Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("tenant.totalApplications")}
                </p>
                <p className="text-2xl font-display font-bold text-foreground mt-1">
                  {applications.length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("tenant.approved")}
                </p>
                <p className="text-2xl font-display font-bold text-success mt-1">
                  {applications.filter((a) => a.status === "Approved").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("tenant.underReview")}
                </p>
                <p className="text-2xl font-display font-bold text-warning mt-1">
                  {
                    applications.filter((a) => a.status === "Under Review")
                      .length
                  }
                </p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="applications">
            {t("header.applications")}
          </TabsTrigger>
          <TabsTrigger value="documents">{t("header.documents")}</TabsTrigger>
          <TabsTrigger value="contracts">{t("header.contracts")}</TabsTrigger>
          <TabsTrigger value="apply">{t("tenant.newApplication")}</TabsTrigger>
        </TabsList>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-4">
          {applications.map((app) => (
            <Card
              key={app.id}
              className="overflow-hidden hover:shadow-card transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 h-48 md:h-auto">
                  <img
                    src={app.image}
                    alt={app.property}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {app.property}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {app.address}
                      </p>
                    </div>
                    <Badge className={getStatusColor(app.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(app.status)}
                        {getStatusText(app.status)}
                      </span>
                    </Badge>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {t("tenant.monthlyRent")}
                      </p>
                      <p className="text-lg font-display font-bold text-accent">
                        ₺{app.rent.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {t("tenant.appliedDate")}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {t("tenant.yourScore")}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-display font-bold text-foreground">
                          {app.score}/100
                        </p>
                        <Progress value={app.score} className="w-16" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      {t("tenant.viewDetails")}
                    </Button>
                    {app.status === "Approved" && (
                      <Button size="sm" className="bg-gradient-accent">
                        {t("tenant.reviewContract")}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("tenant.uploadedDocuments")}</CardTitle>
              <CardDescription>{t("tenant.manageDocuments")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        doc.status === "verified"
                          ? "bg-success/10"
                          : "bg-warning/10"
                      }`}
                    >
                      <FileText
                        className={`h-5 w-5 ${
                          doc.status === "verified"
                            ? "text-success"
                            : "text-warning"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("tenant.uploaded")}:{" "}
                        {new Date(doc.uploadedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(doc.status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(doc.status)}
                      {getStatusText(doc.status)}
                    </span>
                  </Badge>
                </div>
              ))}

              <Button variant="outline" className="w-full mt-4 gap-2">
                <Upload className="h-4 w-4" />
                {t("tenant.uploadNewDocument")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-4">
          {contracts.map((contract) => (
            <Card key={contract.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{contract.property}</CardTitle>
                    <CardDescription>
                      {t("tenant.contractPeriod")}:{" "}
                      {new Date(contract.startDate).toLocaleDateString()} -{" "}
                      {new Date(contract.endDate).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(contract.status)}>
                    {getStatusText(contract.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("tenant.monthlyRent")}
                    </p>
                    <p className="text-xl font-display font-bold text-accent">
                      ₺{contract.rent.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("tenant.contractStatus")}
                    </p>
                    <p className="text-xl font-display font-bold text-success">
                      {getStatusText(contract.status)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    {t("tenant.downloadContract")}
                  </Button>
                  <Button variant="outline" size="sm">
                    {t("tenant.paymentHistory")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* New Application Tab */}
        <TabsContent value="apply" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("tenant.submitNewApplication")}</CardTitle>
              <CardDescription>
                {t("tenant.applyForProperties")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="income">{t("tenant.monthlyIncome")}</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder={t("tenant.enterMonthlyIncome")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workplace">{t("tenant.workplace")}</Label>
                <Input
                  id="workplace"
                  placeholder={t("tenant.workplacePlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="family">{t("tenant.familyInfo")}</Label>
                <Textarea
                  id="family"
                  placeholder={t("tenant.familyInfoPlaceholder")}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional">{t("tenant.additionalInfo")}</Label>
                <Textarea
                  id="additional"
                  placeholder={t("tenant.additionalInfoPlaceholder")}
                  rows={3}
                />
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-smooth cursor-pointer">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm font-medium text-foreground">
                  {t("tenant.uploadSupportingDocs")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("tenant.uploadDocsHint")}
                </p>
              </div>

              <Button className="w-full bg-gradient-accent">
                {t("tenant.submitApplication")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
