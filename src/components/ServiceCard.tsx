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
      <div className="group relative overflow-hidden rounded-2xl bg-card border-2 border-border hover:border-primary transition-all duration-500 hover:shadow-2xl h-full">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: gradient }}
        />

        <div className="relative p-5">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg"
            style={{ background: gradient }}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>

          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
            {titleAr}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>

          <div className="space-y-2">
            {sublinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="flex items-center gap-2 text-sm text-primary hover:underline hover:translate-x-1 transition-transform"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={href} className="block h-full">
      <div className="group relative overflow-hidden rounded-2xl bg-card border-2 border-border hover:border-primary transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer h-full">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: gradient }}
        />

        <div className="relative p-5">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg"
            style={{ background: gradient }}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>

          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
            {titleAr}
          </h3>
          <p className="text-sm text-muted-foreground mb-1">{description}</p>
        </div>
        
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
