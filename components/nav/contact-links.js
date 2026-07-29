export default function NavContactLinks({ layout = "site" }) {
  const isSidebar = layout === "sidebar";
  const isAbout = layout === "about";

  return (
    <>
      <div className={`${isSidebar || isAbout ? "col-span-2" : "tablet:col-start-14 tablet:col-span-2 desktop:col-start-18 desktop:col-span-2"} flex flex-col`}>
        <a href="https://www.instagram.com/gloamaxis/?igshid=YmMyMTA2M2Y%3D" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGNWLSerqeJMgAAAZ9foGzoYoxpxz3iECS684sBRXnGjFvtpmFfe6ayL8q-pqrkG12S0xWPYvpXq3TK-KZFi9dqO-tPUzp9PFkA_tAPzmJGt-gSu49Hod6vicm0lbNg9rkgPmI=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fjoyce-shi-553272167" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>

      <div className={`${isSidebar ? "col-start-3 col-span-5" : isAbout ? "col-start-5 col-span-4" : "tablet:col-start-18 tablet:col-span-4 desktop:col-start-20 desktop:col-span-4"} flex flex-col`}>
        <a href="mailto:joyceshidesign@gmail.com" target="_blank" rel="noopener noreferrer">
          joyceshidesign@gmail.com
        </a>
        <a href="https://drive.google.com/file/d/1PItNqPCMpBB5bFmDLqDpwux05vBWqp4V/view" target="_blank" rel="noopener noreferrer">
          CV
        </a>
      </div>
    </>
  );
}
