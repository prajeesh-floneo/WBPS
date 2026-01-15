import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Upload, MapPin, Home, DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const AddPropertyDialog = ({ open, onOpenChange }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    buildingName: "",
    address: "",
    city: "",
    district: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    floor: "",
    totalFloors: "",
    rent: "",
    deposit: "",
    propertyType: "",
    furnishing: "",
    description: "",
    amenities: [],
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.address || !formData.rent) {
      toast.error(t("property.form.fillRequired"));
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Property data:", formData);
    toast.success(t("property.form.propertyAdded"));

    // Reset form and close dialog
    setFormData({
      name: "",
      buildingName: "",
      address: "",
      city: "",
      district: "",
      bedrooms: "",
      bathrooms: "",
      size: "",
      floor: "",
      totalFloors: "",
      rent: "",
      deposit: "",
      propertyType: "",
      furnishing: "",
      description: "",
      amenities: [],
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">
            {t("property.form.addNewProperty")}
          </DialogTitle>
          <DialogDescription>
            {t("property.form.fillDetails")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Home className="h-5 w-5" />
              {t("property.form.basicInfo")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  {t("property.form.propertyName")} *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder={t("property.form.propertyNamePlaceholder")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buildingName">
                  {t("property.form.buildingName")}
                </Label>
                <Input
                  id="buildingName"
                  value={formData.buildingName}
                  onChange={(e) =>
                    handleInputChange("buildingName", e.target.value)
                  }
                  placeholder={t("property.form.buildingNamePlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyType">
                  {t("property.form.propertyType")} *
                </Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) =>
                    handleInputChange("propertyType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("property.form.selectType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">
                      {t("property.types.apartment")}
                    </SelectItem>
                    <SelectItem value="villa">
                      {t("property.types.villa")}
                    </SelectItem>
                    <SelectItem value="studio">
                      {t("property.types.studio")}
                    </SelectItem>
                    <SelectItem value="penthouse">
                      {t("property.types.penthouse")}
                    </SelectItem>
                    <SelectItem value="duplex">
                      {t("property.types.duplex")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="furnishing">
                  {t("property.form.furnishing")}
                </Label>
                <Select
                  value={formData.furnishing}
                  onValueChange={(value) =>
                    handleInputChange("furnishing", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("property.form.selectFurnishing")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="furnished">
                      {t("property.furnishing.furnished")}
                    </SelectItem>
                    <SelectItem value="semi-furnished">
                      {t("property.furnishing.semiFurnished")}
                    </SelectItem>
                    <SelectItem value="unfurnished">
                      {t("property.furnishing.unfurnished")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {t("property.form.location")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">{t("property.form.address")} *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder={t("property.form.addressPlaceholder")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">{t("property.form.city")} *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder={t("property.form.cityPlaceholder")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">{t("property.form.district")}</Label>
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) =>
                    handleInputChange("district", e.target.value)
                  }
                  placeholder={t("property.form.districtPlaceholder")}
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {t("property.form.propertyDetails")}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">
                  {t("property.form.bedrooms")} *
                </Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    handleInputChange("bedrooms", e.target.value)
                  }
                  placeholder="2"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">
                  {t("property.form.bathrooms")} *
                </Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="0"
                  value={formData.bathrooms}
                  onChange={(e) =>
                    handleInputChange("bathrooms", e.target.value)
                  }
                  placeholder="1"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">{t("property.form.size")} (m²) *</Label>
                <Input
                  id="size"
                  type="number"
                  min="0"
                  value={formData.size}
                  onChange={(e) => handleInputChange("size", e.target.value)}
                  placeholder="100"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="floor">{t("property.form.floor")}</Label>
                <Input
                  id="floor"
                  type="number"
                  min="0"
                  value={formData.floor}
                  onChange={(e) => handleInputChange("floor", e.target.value)}
                  placeholder="5"
                />
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {t("property.form.financialInfo")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rent">
                  {t("property.form.monthlyRent")} (₺) *
                </Label>
                <Input
                  id="rent"
                  type="number"
                  min="0"
                  value={formData.rent}
                  onChange={(e) => handleInputChange("rent", e.target.value)}
                  placeholder="5000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deposit">
                  {t("property.form.deposit")} (₺)
                </Label>
                <Input
                  id="deposit"
                  type="number"
                  min="0"
                  value={formData.deposit}
                  onChange={(e) => handleInputChange("deposit", e.target.value)}
                  placeholder="10000"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              {t("property.form.description")}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder={t("property.form.descriptionPlaceholder")}
              rows={4}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t("common.cancel")}
            </Button>
            <Button type="submit" className="bg-gradient-accent">
              {t("property.form.addProperty")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
