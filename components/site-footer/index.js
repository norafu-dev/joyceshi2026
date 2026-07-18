import Link from "next/link";

export default function SiteFooter({ secondaryHref = "/archive", secondaryLabel = "Archive" }) {
  return (
    <footer className="container col-span-24 mt-[200px]">
      <div className="col-span-3 self-end">
        <a href="#page-top">Back to top&nbsp; ↑</a>
      </div>

      <div className="col-start-4 col-span-3 self-end">
        <Link className="underline" href={secondaryHref}>
          {secondaryLabel}
        </Link>
      </div>

      <div className="col-start-18 col-span-2 flex flex-col">
        <a href="https://www.instagram.com/gloamaxis/?igshid=YmMyMTA2M2Y%3D" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://www.linkedin.com/in/joyce-shi-553272167" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>

      <div className="col-start-20 col-span-4 flex flex-col">
        <a href="mailto:joyceshidesign@gmail.com">joyceshidesign@gmail.com</a>
        <a href="https://drive.google.com/file/d/1PItNqPCMpBB5bFmDLqDpwux05vBWqp4V/view" target="_blank" rel="noopener noreferrer">
          CV
        </a>
      </div>
    </footer>
  );
}
