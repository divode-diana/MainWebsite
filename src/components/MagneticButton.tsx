import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HashLink } from "react-router-hash-link";

interface MagneticButtonProps {
    children: React.ReactNode;
    href?: string;
    to?: string;
    smooth?: boolean;
    className?: string;
}

export function MagneticButton({ children, href, to, smooth, className }: MagneticButtonProps) {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const defaultClassName = "inline-block px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer";

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)",
            });
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    if (to) {
        return (
            <HashLink
                ref={buttonRef}
                to={to}
                smooth={smooth}
                className={className ?? defaultClassName}
            >
                {children}
            </HashLink>
        );
    }

    return (
        <a
            ref={buttonRef}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className ?? defaultClassName}
        >
            {children}
        </a>
    );
}
