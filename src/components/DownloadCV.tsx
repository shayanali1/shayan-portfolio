import { LuDownload } from "react-icons/lu";
import "./styles/DownloadCV.css";

interface DownloadCVProps {
  variant?: "navbar" | "hero" | "contact";
  className?: string;
}

const DownloadCV = ({ variant = "navbar", className = "" }: DownloadCVProps) => {
  return (
    <a
      href="/Shayan_Ali_CV.pdf"
      download="Shayan_Ali_CV.pdf"
      target="_blank"
      rel="noopener"
      aria-label="Download CV (PDF)"
      className={`cv-btn cv-btn-${variant} ${className}`.trim()}
      data-cursor="disable"
    >
      <span>Download CV</span>
      <LuDownload className="cv-btn-icon" aria-hidden="true" />
    </a>
  );
};

export default DownloadCV;
