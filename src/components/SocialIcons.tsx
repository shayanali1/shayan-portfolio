import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import "./styles/SocialIcons.css";
import { useEffect } from "react";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    const cleanups: (() => void)[] = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      let mouseX = 25;
      let mouseY = 25;
      let currentX = 0;
      let currentY = 0;
      let rafId: number | null = null;
      let rect = elem.getBoundingClientRect();

      const updateRect = () => {
        rect = elem.getBoundingClientRect();
      };
      window.addEventListener("resize", updateRect, { passive: true });
      window.addEventListener("scroll", updateRect, { passive: true });

      const updatePosition = () => {
        const dx = (mouseX - currentX) * 0.15;
        const dy = (mouseY - currentY) * 0.15;
        currentX += dx;
        currentY += dy;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        if (Math.abs(mouseX - currentX) > 0.05 || Math.abs(mouseY - currentY) > 0.05) {
          rafId = requestAnimationFrame(updatePosition);
        } else {
          rafId = null;
        }
      };

      const startAnimation = () => {
        if (!rafId) {
          rafId = requestAnimationFrame(updatePosition);
        }
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
        startAnimation();
      };

      document.addEventListener("mousemove", onMouseMove, { passive: true });

      cleanups.push(() => {
        document.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", updateRect);
        window.removeEventListener("scroll", updateRect);
        if (rafId) cancelAnimationFrame(rafId);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/shayanali1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/syedmuhammadshayanali"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="mailto:syedshayanali194@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send Email"
          >
            <MdEmail />
          </a>
        </span>
      </div>
    </div>
  );
};

export default SocialIcons;
