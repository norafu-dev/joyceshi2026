"use client";

import AboutOverlay from "@/components/about";
import NavContactLinks from "./contact-links";
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
    const navActiveTimerRef = useRef(null);
    const navColorTimerRef = useRef(null);

    const clearNavActiveTimer = useCallback(() => {
        if (!navActiveTimerRef.current) {
            return;
        }

        window.clearTimeout(navActiveTimerRef.current);
        navActiveTimerRef.current = null;
    }, []);

    const clearNavColorTimer = useCallback(() => {
        if (!navColorTimerRef.current) {
            return;
        }

        window.clearTimeout(navColorTimerRef.current);
        navColorTimerRef.current = null;
    }, []);

    const handleOpenAbout = useCallback(() => {
        clearNavActiveTimer();
        clearNavColorTimer();
        setPlusHidden(true);
        setAboutNavActive(true);
        setAboutColor(pathname === "/");
        setAboutVisible(true);
        setAboutOpen(true);
    }, [clearNavActiveTimer, clearNavColorTimer, pathname]);

    const handleCloseAbout = useCallback(() => {
        if (!aboutVisible && !aboutOpen && !aboutNavActive && !aboutColor && !plusHidden) {
            return;
        }

        clearNavActiveTimer();
        clearNavColorTimer();
        setPlusHidden(false);
        setAboutOpen(false);

        navActiveTimerRef.current = window.setTimeout(() => {
            setAboutNavActive(false);
            navActiveTimerRef.current = null;
        }, NAV_COLOR_CLOSE_DELAY);

        if (aboutColor) {
            navColorTimerRef.current = window.setTimeout(() => {
                setAboutColor(false);
                navColorTimerRef.current = null;
            }, NAV_COLOR_CLOSE_DELAY);
            return;
        }

        setAboutColor(false);
    }, [aboutColor, aboutNavActive, aboutOpen, aboutVisible, clearNavActiveTimer, clearNavColorTimer, plusHidden]);

    const handleAboutExited = useCallback(() => {
        clearNavActiveTimer();
        clearNavColorTimer();
        setAboutVisible(false);
        setAboutNavActive(false);
        setAboutColor(false);
        setPlusHidden(false);
    }, [clearNavActiveTimer, clearNavColorTimer]);

    useEffect(() => {
        return () => {
            clearNavActiveTimer();
            clearNavColorTimer();
        };
    }, [clearNavActiveTimer, clearNavColorTimer]);

    useEffect(() => {
        const nav = navRef.current;

        if (!nav) {
            return undefined;
        }

        const updateNavHeight = () => {
            const navStyles = window.getComputedStyle(nav);
            const paddingTop = Number.parseFloat(navStyles.paddingTop) || 0;
            const paddingBottom = Number.parseFloat(navStyles.paddingBottom) || 0;

            document.documentElement.style.setProperty(
                "--site-nav-height",
                `${nav.getBoundingClientRect().height - paddingTop - paddingBottom}px`,
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

    const handleJoyceClick = useCallback(() => {
        if (aboutVisible || aboutOpen || aboutNavActive) {
            handleCloseAbout();
            return;
        }

        handleOpenAbout();
    }, [aboutNavActive, aboutOpen, aboutVisible, handleCloseAbout, handleOpenAbout]);

    if (pathname === "/studio" || pathname.startsWith("/studio/")) {
        return null;
    }

    const pathSegments = pathname.split("/").filter(Boolean);
    const activeCategory = pathSegments[0];
    const isLanding = pathname === "/";
    const isArchive = pathname === "/archive";
    const isCategoryRoute = categories.some(({ value }) => value === activeCategory);
    const isCategoryIndexRoute = isCategoryRoute && pathSegments.length === 1;
    const isProjectRoute = isCategoryRoute && pathSegments.length === 2;
    const navLineClass = aboutVisible
        ? ""
        : isCategoryIndexRoute
          ? "site-nav-line-category"
          : isProjectRoute
            ? "site-nav-line-project"
            : "";
    const navThemeClass = isLanding
        ? "site-nav-landing site-nav-dark"
        : isArchive
          ? "site-nav-archive site-nav-dark"
          : "";
    const navRouteClass = isProjectRoute
        ? "site-nav-project"
        : isCategoryIndexRoute
          ? "site-nav-category"
          : "";
    const showFixedContactLinks = !isProjectRoute || aboutVisible;
    const usesAboutColors = isLanding ? aboutColor : aboutNavActive;

    return (
        <>
            <nav
                className={`container ${isLanding ? "" : "site-nav-fixed"} ${navLineClass} ${navThemeClass} ${navRouteClass} ${usesAboutColors ? "nav-about-colors" : ""}`}
                ref={navRef}
            >
                {isProjectRoute ? (
                    <div className="project-mobile-nav col-span-12 desktop:hidden">
                        <button
                            className={`cursor-pointer border-0 bg-transparent p-0 text-left text-inherit [font:inherit] ${usesAboutColors ? "text-purple" : ""}`}
                            onClick={handleJoyceClick}
                            type="button"
                        >
                            Joyce Shi
                        </button>
                        <button
                            aria-label="Open more information"
                            className="project-mobile-nav-more"
                            onClick={handleOpenAbout}
                            type="button"
                        >
                            (...)
                        </button>
                    </div>
                ) : null}

                <div className={`col-span-12 ${isProjectRoute ? "hidden desktop:block" : ""}`}>
                    <button
                        className={`cursor-pointer border-0 bg-transparent p-0 text-left text-inherit [font:inherit] ${usesAboutColors ? "text-purple" : ""}`}
                        onClick={handleJoyceClick}
                        type="button"
                    >
                        Joyce Shi{" "}
                    </button>
                    <span className="text-gray">
                        {" "}is an award-winning design director & independent publisher based in
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

                {showFixedContactLinks ? (
                    <div className="hidden desktop:contents">
                        <NavContactLinks />
                    </div>
                ) : null}
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
