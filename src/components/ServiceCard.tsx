import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface SubLink {
  title: string;
  href: string;
}

interface ServiceCardProps {
  title: string;
  titleAr: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
  sublinks?: SubLink[];
}

const ServiceCard = ({
  title,
  titleAr,
  description,
  icon: Icon,
  href,
  gradient,
  sublinks,
}: ServiceCardProps) => {
  if (sublinks && sublinks.length > 0) {
    return (
      <div className="group relative overflow-hidden rounded-lg md:rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-elevated h-full">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          style={{ background: gradient }}
        />

        <div className="relative p-2.5 sm:p-3 md:p-4">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-md md:rounded-lg flex items-center justify-center mb-2 sm:mb-2.5 md:mb-3 group-hover:scale-110 transition-transform duration-300"
            style={{ background: gradient }}
          >
            <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
          </div>

          <h3 className="text-sm sm:text-base font-bold mb-0.5 sm:mb-1 group-hover:text-primary transition-colors">
            {titleAr}
          </h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">{title}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-2.5 md:mb-3">{description}</p>

          <div className="space-y-2">
            {sublinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="block text-xs text-primary hover:underline"
              >
                • {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={href}>
      <div className="group relative overflow-hidden rounded-lg md:rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-elevated cursor-pointer h-full">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          style={{ background: gradient }}
        />

        <div className="relative p-2.5 sm:p-3 md:p-4">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-md md:rounded-lg flex items-center justify-center mb-2 sm:mb-2.5 md:mb-3 group-hover:scale-110 transition-transform duration-300"
            style={{ background: gradient }}
          >
            <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
          </div>

          <h3 className="text-sm sm:text-base font-bold mb-0.5 sm:mb-1 group-hover:text-primary transition-colors">
            {titleAr}
          </h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">{title}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
