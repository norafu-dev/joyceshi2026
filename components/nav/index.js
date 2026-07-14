import Link from "next/link";

const Nav = () => {
    return (
        <nav className="container">
            <div className="col-span-12">
                <span>Joyce Shi </span>
                <span className="text-gray">
                    is an award-winning design director & independent publisher based in
                    New York working across{" "}
                </span>

                <span>
                    <Link href="/brand-campaign-system" className=" underline">brand & campaign system</Link>
                    <span className="text-gray">,&nbsp;</span>
                    <Link href="/print-editorial-design">print & editorial design</Link>
                    <span className="text-gray">&nbsp;and&nbsp;</span>
                    <Link href="/digital-design">digital design</Link>
                    <span className="text-gray">.</span>
                </span>

                <button
                    type="button"
                    aria-label="Open more information"
                    className="ml-1 align-[-1px] text-xl leading-none"
                >
                    ＋
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
    );
};

export default Nav;
