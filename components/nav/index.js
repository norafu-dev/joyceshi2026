"use client";

import AboutOverlay from "@/components/about";
import NavContactLinks from "./contact-links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const NAV_COLOR_CLOSE_DELAY = 480;
const MOBILE_MEDIA_QUERY = "(max-width: 42.499rem)";

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

    const clearNavActiveTimer = useCallback(() => {
        if (!navActiveTimerRef.current) {
            return;
        }

        window.clearTimeout(navActiveTimerRef.current);
        navActiveTimerRef.current = null;
    }, []);

    const handleOpenAbout = useCallback(() => {
        clearNavActiveTimer();
        setPlusHidden(true);
        setAboutNavActive(true);
        setAboutColor(pathname === "/");
        setAboutVisible(true);
        setAboutOpen(true);
    }, [clearNavActiveTimer, pathname]);

    const handleCloseAbout = useCallback(() => {
        if (!aboutVisible && !aboutOpen && !aboutNavActive && !aboutColor && !plusHidden) {
            return;
        }

        clearNavActiveTimer();
        setPlusHidden(false);
        setAboutOpen(false);

        if (window.matchMedia(MOBILE_MEDIA_QUERY).matches) {
            setAboutNavActive(false);
            setAboutColor(false);
            return;
        }

        navActiveTimerRef.current = window.setTimeout(() => {
            setAboutNavActive(false);
            setAboutColor(false);
            navActiveTimerRef.current = null;
        }, NAV_COLOR_CLOSE_DELAY);

    }, [aboutColor, aboutNavActive, aboutOpen, aboutVisible, clearNavActiveTimer, plusHidden]);

    const handleAboutExited = useCallback(() => {
        clearNavActiveTimer();
        setAboutVisible(false);
        setAboutNavActive(false);
        setAboutColor(false);
        setPlusHidden(false);
    }, [clearNavActiveTimer]);

    useEffect(() => {
        return () => {
            clearNavActiveTimer();
        };
    }, [clearNavActiveTimer]);

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
    const usesAboutColors = isLanding ? aboutColor : aboutNavActive;
    const plusReturning = aboutVisible && !aboutOpen;

    return (
        <>
            <nav
                className={`container ${navThemeClass} ${navRouteClass} ${usesAboutColors ? "nav-about-colors" : ""}`}
                ref={navRef}
            >
                {isProjectRoute ? (
                    <div className="project-mobile-nav col-span-12 tablet:hidden">
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

                <div className={`col-span-12 tablet:col-span-11 desktop:col-span-12 ${isProjectRoute ? "hidden tablet:block" : ""}`}>
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
                        <span className="text-gray">&nbsp;and </span>
                        <span className="nav-ending">
                            <CategoryLink
                                active={!usesAboutColors && activeCategory === categories[2].value}
                                href={categories[2].href}
                                muted={usesAboutColors}
                                onNavigate={handleCloseAbout}
                            >
                                {categories[2].label}
                            </CategoryLink>
                            <span className="text-gray">.</span>
                            <button
                                aria-label="Open more information"
                                className={`nav-plus ${plusHidden ? "nav-plus-hidden" : ""} ${plusReturning ? "nav-plus-returning" : ""} ${aboutVisible ? "nav-plus-disabled" : ""}`}
                                onClick={handleOpenAbout}
                                type="button"
                            >
                                <span className="sr-only">Open more information</span>
                            </button>
                        </span>
                    </span>
                </div>

                <div className={isProjectRoute ? "hidden tablet:contents desktop:hidden" : "hidden tablet:contents"}>
                    <NavContactLinks />
                </div>

                {isProjectRoute && aboutVisible ? (
                    <nav
                        aria-label="Contact links"
                        className="project-about-contact-nav hidden desktop:grid"
                    >
                        <NavContactLinks layout="sidebar" />
                    </nav>
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
