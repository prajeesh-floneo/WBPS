import {
  MapPin,
  Bed,
  Bath,
  Square,
  ExternalLink,
  MoreVertical,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const PropertyCard = ({ property, onEdit, onViewDetails }) => {
  const { t } = useTranslation();

  const getStatusColor = (status) => {
    switch (status) {
      case "Occupied":
        return "bg-success/10 text-success border-success/20";
      case "Vacant":
        return "bg-warning/10 text-warning border-warning/20";
      case "Listed":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusTranslation = (status) => {
    switch (status) {
      case "Occupied":
        return t("property.status.occupied");
      case "Vacant":
        return t("property.status.vacant");
      case "Listed":
        return t("property.status.listed");
      default:
        return status;
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-elegant transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            property.images?.[0] ||
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600"
          }
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>

        {/* Status Badge */}
        <Badge
          className={`absolute top-3 right-3 ${getStatusColor(
            property.status
          )}`}
        >
          {getStatusTranslation(property.status)}
        </Badge>

        {/* Actions Menu */}
        <div className="absolute top-3 left-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => onEdit(property)}>
                Edit Property
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewDetails(property)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>Request Valuation</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title & Location */}
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1">
            {property.name || property.buildingName}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{property.address}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">
              {property.bedrooms}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">
              {property.bathrooms}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">
              {property.size}m²
            </span>
          </div>
        </div>

        {/* Rent */}
        {property.rent && (
          <div className="pt-2 border-t border-border">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-display font-semibold text-accent">
                ₺{property.rent?.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">
                {t("property.perMonth")}
              </span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onViewDetails(property)}
        >
          {t("property.details")}
        </Button>
        {property.listingUrl && (
          <Button variant="default" size="sm" className="flex-1 gap-1" asChild>
            <a
              href={property.listingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("property.viewListing")}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
