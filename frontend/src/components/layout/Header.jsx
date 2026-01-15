import { useState, useEffect } from "react";
import { Globe, Menu, X, Building2, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const languages = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

export const Header = ({ currentUser, onLogout }) => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get current language from i18n
  const currentLang = i18n.language;

  // Handle language change
  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  // Set document direction for RTL languages
  useEffect(() => {
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  }, [currentLang]);

  const navItems =
    currentUser?.role === "landlord"
      ? [
          { label: t("header.dashboard"), path: "/dashboard" },
          { label: t("header.properties"), path: "/properties" },
          { label: t("header.tenants"), path: "/tenants" },
          { label: t("header.services"), path: "/services" },
        ]
      : currentUser?.role === "tenant"
      ? [
          { label: t("header.applications"), path: "/applications" },
          { label: t("header.documents"), path: "/documents" },
          { label: t("header.contracts"), path: "/contracts" },
        ]
      : currentUser?.role === "admin"
      ? [
          { label: t("header.overview"), path: "/admin" },
          { label: t("header.properties"), path: "/admin/properties" },
          { label: t("header.applications"), path: "/admin/applications" },
          { label: t("header.requests"), path: "/admin/requests" },
        ]
      : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-accent" />
            <div className="flex flex-col">
              <span className="text-lg font-display font-semibold text-foreground">
                WBPS
              </span>
              <span className="text-[10px] text-muted-foreground">
                {t("header.wealthBuilders")}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          {currentUser && (
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="text-sm font-medium text-muted-foreground hover:text-accent transition-smooth"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {languages.find((l) => l.code === currentLang)?.flag}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="gap-2"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            {currentUser && (
              <>
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
                  <div className="h-8 w-8 rounded-full bg-gradient-accent flex items-center justify-center text-sm font-semibold text-accent-foreground">
                    {currentUser.name?.charAt(0) || "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {currentUser.name}
                    </span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {currentUser.role}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            {currentUser && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    {mobileMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <nav className="flex flex-col gap-4 mt-8">
                    {navItems.map((item) => (
                      <a
                        key={item.path}
                        href={item.path}
                        className="text-base font-medium text-foreground hover:text-accent transition-smooth"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>

      {/* Compliance Bar */}
      <div className="border-t border-border bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 py-1.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-success"></span>
              {t("header.kvkkCompliant")}
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-success"></span>
              {t("header.findeksMember")}
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-success"></span>
              {t("header.eDevletVerified")}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
