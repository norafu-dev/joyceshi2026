import Link from "next/link";

const profileLinks = [
    { label: "brand & campaign system", href: "#" },
    { label: "print & editorial design", href: "#" },
    { label: "digital design", href: "#" },
];

const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
];

const Nav = () => {
    return (
        <header className="container px-5 pt-3 text-sm leading-[1.1]">
            <div className="col-span-13">
                <span>Joyce Shi </span>
                <span className="text-gray">
                    is an award-winning design director & independent publisher based in
                    New York working across{" "}
                </span>

                {profileLinks.map((link, index) => (
                    <span key={link.label}>
                        <Link href={link.href} className="underline underline-offset-2">
                            {link.label}
                        </Link>
                        {index < profileLinks.length - 1 && (
                            <span className="text-gray">, </span>
                        )}
                    </span>
                ))}

                <span className="text-gray"> and </span>
                <button
                    type="button"
                    aria-label="Open more information"
                    className="ml-1 align-[-1px] text-xl leading-none"
                >
                    +
                </button>
            </div>

            <nav
                aria-label="Social links"
                className="col-span-2 col-start-18 flex flex-col"
            >
                {socialLinks.map((link) => (
                    <a key={link.label} href={link.href}>
                        {link.label}
                    </a>
                ))}
            </nav>

            <div className="col-span-4 col-start-20 flex flex-col">
                <a href="mailto:joyceshidesign@gmail.com">
                    joyceshidesign@gmail.com
                </a>
                <Link href="#">CV</Link>
            </div>
        </header>
    );
};

export default Nav;
