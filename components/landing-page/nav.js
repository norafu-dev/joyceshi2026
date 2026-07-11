const Nav = () => {

    return (
        <section className="px-6 py-10">
            <div className="relative h-[520px] overflow-hidden">
                {/* background image */}
                <img
                    src="/images/about-cover.jpg"
                    alt="About Joyce Shi"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* dark overlay, optional */}
                <div className="absolute inset-0 bg-black/20" />

                {/* grid content */}
                <div className="relative z-10 grid h-full grid-cols-[repeat(24,minmax(0,1fr))] grid-rows-[auto_1fr_auto] gap-x-0 p-3 text-white">
                    {/* top left text */}
                    <p className="col-start-1 col-span-10 row-start-1 text-[11px] leading-tight">
                        Joyce Shi is an award-winning design director & independent publisher
                        based in New York working across brand & campaign system, print &
                        editorial design and digital design.
                    </p>

                    {/* top right links */}
                    <nav className="col-start-18 col-span-3 row-start-1 text-[11px] leading-tight">
                        <a href="#" className="block hover:underline">
                            Instagram
                        </a>
                        <a href="#" className="block hover:underline">
                            LinkedIn
                        </a>
                    </nav>

                    {/* top far right */}
                    <div className="col-start-20 col-span-5 row-start-1 text-[11px] leading-tight">
                        <a href="mailto:joyceshidesign@gmail.com" className="block hover:underline">
                            joyceshidesign@gmail.com
                        </a>
                        <a href="#" className="block hover:underline">
                            CV
                        </a>
                    </div>

                    {/* bottom left caption */}
                    <p className="col-start-1 col-span-7 row-start-3 self-end text-[11px]">
                        A Visual Directory of Edge of Chaos
                    </p>

                    {/* bottom page number */}
                    <p className="col-start-20 col-span-2 row-start-3 self-end text-[11px]">
                        1/8
                    </p>
                </div>
            </div>
        </section>
    )
}

return Nav;