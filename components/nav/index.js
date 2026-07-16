"use client";

import AboutOverlay from "@/components/about";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const NAV_COLOR_CLOSE_DELAY = 480;

const categories = [
    {
        href: "/brand-campaign-system",
        label: "brand & campaign system",
        value: "brand-campaign-system",
    },
    {
        href: "/print-editorial-design",
        label: "print & editorial design",
        value: "print-editorial-design",
    },
    {
        href: "/digital-design",
        label: "digital design",
        value: "digital-design",
    },
];

const Nav = ({ about }) => {
    const pathname = usePathname();
    const [aboutOpen, setAboutOpen] = useState(false);
    const [aboutVisible, setAboutVisible] = useState(false);
    const [aboutNavActive, setAboutNavActive] = useState(false);
    const [aboutColor, setAboutColor] = useState(false);
    const [plusHidden, setPlusHidden] = useState(false);
    const navRef = useRef(null);
    const navColorTimerRef = useRef(null);

    const clearNavColorTimer = useCallback(() => {
        if (!navColorTimerRef.current) {
            return;
        }

        window.clearTimeout(navColorTimerRef.current);
        navColorTimerRef.current = null;
    }, []);

    const handleOpenAbout = useCallback(() => {
        clearNavColorTimer();
        setPlusHidden(true);
        setAboutNavActive(true);
        setAboutColor(pathname === "/");
        setAboutVisible(true);
        setAboutOpen(true);
    }, [clearNavColorTimer, pathname]);

    const handleCloseAbout = useCallback(() => {
        if (!aboutVisible && !aboutOpen && !aboutNavActive && !aboutColor && !plusHidden) {
            return;
        }

        clearNavColorTimer();
        setPlusHidden(false);
        setAboutNavActive(false);
        setAboutOpen(false);

        if (aboutColor) {
            navColorTimerRef.current = window.setTimeout(() => {
                setAboutColor(false);
                navColorTimerRef.current = null;
            }, NAV_COLOR_CLOSE_DELAY);
            return;
        }

        setAboutColor(false);
    }, [aboutColor, aboutNavActive, aboutOpen, aboutVisible, clearNavColorTimer, plusHidden]);

    const handleAboutExited = useCallback(() => {
        clearNavColorTimer();
        setAboutVisible(false);
        setAboutNavActive(false);
        setAboutColor(false);
        setPlusHidden(false);
    }, [clearNavColorTimer]);

    useEffect(() => {
        return clearNavColorTimer;
    }, [clearNavColorTimer]);

    useEffect(() => {
        const nav = navRef.current;

        if (!nav) {
            return undefined;
        }

        const updateNavHeight = () => {
            document.documentElement.style.setProperty(
                "--site-nav-height",
                `${nav.getBoundingClientRect().height}px`,
            );
        };

        updateNavHeight();
        window.addEventListener("resize", updateNavHeight);

        if (typeof ResizeObserver === "undefined") {
            return () => {
                window.removeEventListener("resize", updateNavHeight);
            };
        }

        const observer = new ResizeObserver(updateNavHeight);
        observer.observe(nav);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateNavHeight);
        };
    }, [pathname]);

    const handleJoyceClick = useCallback((event) => {
        if (!aboutVisible) {
            return;
        }

        event.preventDefault();
        handleCloseAbout();
    }, [aboutVisible, handleCloseAbout]);

    if (pathname === "/studio" || pathname.startsWith("/studio/")) {
        return null;
    }

    const activeCategory = pathname.split("/").filter(Boolean)[0];
    const isLanding = pathname === "/";
    const usesAboutColors = isLanding ? aboutColor : aboutNavActive;

    return (
        <>
            <nav
                className={`container ${usesAboutColors ? "nav-about-colors" : ""}`}
                ref={navRef}
            >
                <div className="col-span-12">
                    <Link className={usesAboutColors ? "text-purple" : ""} href="/" onClick={handleJoyceClick}>Joyce Shi </Link>
                    <span className="text-gray">
                        is an award-winning design director & independent publisher based in
                        New York working across{" "}
                    </span>

                    <span>
                        <CategoryLink
                            active={!usesAboutColors && activeCategory === categories[0].value}
                            href={categories[0].href}
                            muted={usesAboutColors}
                            onNavigate={handleCloseAbout}
                        >
                            {categories[0].label}
                        </CategoryLink>
                        <span className="text-gray">,&nbsp;</span>
                        <CategoryLink
                            active={!usesAboutColors && activeCategory === categories[1].value}
                            href={categories[1].href}
                            muted={usesAboutColors}
                            onNavigate={handleCloseAbout}
                        >
                            {categories[1].label}
                        </CategoryLink>
                        <span className="text-gray">&nbsp;and&nbsp;</span>
                        <CategoryLink
                            active={!usesAboutColors && activeCategory === categories[2].value}
                            href={categories[2].href}
                            muted={usesAboutColors}
                            onNavigate={handleCloseAbout}
                        >
                            {categories[2].label}
                        </CategoryLink>
                        <span className="text-gray">.</span>
                    </span>

                    <button
                        aria-label="Open more information"
                        className={`nav-plus ${plusHidden ? "nav-plus-hidden" : ""} ${aboutVisible ? "nav-plus-disabled" : ""}`}
                        onClick={handleOpenAbout}
                        type="button"
                    >
                        <span className="sr-only">Open more information</span>
                    </button>
                </div>

                <div className="col-start-18 col-span-2 flex flex-col">
                    <a href="https://www.instagram.com/gloamaxis/?igshid=YmMyMTA2M2Y%3D" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                    <a href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGNWLSerqeJMgAAAZ9foGzoYoxpxz3iECS684sBRXnGjFvtpmFfe6ayL8q-pqrkG12S0xWPYvpXq3TK-KZFi9dqO-tPUzp9PFkA_tAPzmJGt-gSu49Hod6vicm0lbNg9rkgPmI=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fjoyce-shi-553272167" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </div>

                <div className="col-start-20 col-span-4 flex flex-col">
                    <a href="mailto:joyceshidesign@gmail.com" target="_blank" rel="noopener noreferrer">
                        joyceshidesign@gmail.com
                    </a>
                    <a href="https://drive.google.com/file/d/1PItNqPCMpBB5bFmDLqDpwux05vBWqp4V/view" target="_blank" rel="noopener noreferrer">CV</a>
                </div>
            </nav>
            {aboutVisible ? (
                <AboutOverlay
                    about={about}
                    onClose={handleCloseAbout}
                    onExited={handleAboutExited}
                    open={aboutOpen}
                />
            ) : null}
        </>
    );
};

function CategoryLink({ active, children, href, muted, onNavigate }) {
    return (
        <Link
            href={href}
            className={`underline ${active ? "text-purple" : muted ? "text-gray" : ""}`}
            onClick={onNavigate}
        >
            {children}
        </Link>
    );
}

export default Nav;
