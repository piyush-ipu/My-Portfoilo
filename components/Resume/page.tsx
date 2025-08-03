import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import userData from "@/data/user.json";
import { DialogClose } from "@radix-ui/react-dialog";

const {
  info,
  contact,
  location,
  ProfessionalSummary,
  AcademicBackground,
  CoreSkills,
  Projects,
  OtherProjects,
  Certificates,
  RecentWorks,
} = userData;

export function Resume() {
  async function Save() {
    const element = document.getElementById("resume");
    if (!element) return;
  
    // Store original styles
    const originalBodyOverflow = document.body.style.overflow;
    const originalDialogWidth = element.style.width;
    const originalMaxHeight = element.style.maxHeight;
    const originalElementOverflow = element.style.overflow;
  
    // Prepare layout for screenshot
    document.body.style.overflow = "visible";
    element.style.overflow = "visible";
    element.style.maxHeight = "none";
    element.style.width = "1440px"; // Adjust width as needed
  
    // Hide save button
    const saveButton = document.getElementById("save-resume-btn");
    const closeButton = document.getElementById("resume-close-btn");
    const link = document.querySelectorAll("#link") as NodeListOf<HTMLElement>;
    if (saveButton) saveButton.style.display = "none";
    if (closeButton) closeButton.style.display = "none";
    link.forEach((link) => (link.style.display = "none"));
  
    await new Promise((res) => setTimeout(res, 100));
  
    // Check if the browser is Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
    try {
      // If it's Safari, show an error and stop the process
      if (isSafari) {
        alert("PDF download may not work in Safari. Please use a different browser.");
        return;
      }
  
      // Take screenshot
      const canvas = await html2canvas(element, {
        allowTaint: true,
        useCORS: true,
        scale: 4, // Increase scale for better resolution
        backgroundColor: "#ffffff",
        windowWidth: 1440, // Adjust window width as needed
        scrollX: 0,
        scrollY: -window.scrollY,
      });
  
      const imgData = canvas.toDataURL("image/jpeg", 0.7); // JPEG format + 70% quality
  
      // Convert canvas to mm
      const pxToMm = (px: number) => px * 0.264583;
      const imgWidthMm = 210; // A4 width
      const imgHeightMm =
        pxToMm(canvas.height) * (imgWidthMm / pxToMm(canvas.width));
  
      const pdf = new jsPDF("p", "mm", [imgWidthMm, imgHeightMm]);
  
      // Add image without any border, margin, or offset
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        imgWidthMm,
        imgHeightMm,
        undefined,
        "FAST"
      );
  
      // Attempt to save the PDF
      pdf.save("Sonu_Rai_Resume.pdf");
  
      // Check if the file was downloaded successfully (in some cases, you can check after a timeout)
      setTimeout(() => {
        if (!pdf) {
          alert("An error occurred while generating the PDF. Please try again.");
        }
      }, 3000); // 3 seconds after attempting download
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF. Please try again.");
    } finally {
      // Restore original styles
      if (saveButton) saveButton.style.display = "block";
      if (closeButton) closeButton.style.display = "block";
      link.forEach((link) => (link.style.display = "block"));
      document.body.style.overflow = originalBodyOverflow;
      element.style.width = originalDialogWidth;
      element.style.maxHeight = originalMaxHeight;
      element.style.overflow = originalElementOverflow;
    }
  }
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="fixed top-4 left-2 z-50 shadow-lg backdrop-blur-md text-white cursor-pointer transition
             bg-gradient-to-br from-[#6748FF] via-[#5a3ee0] to-[#4c32c7] hover:brightness-110"
        >
          Resume
        </Button>
      </DialogTrigger>

      <DialogContent
        id="resume"
        className="sm:max-w-[800px] z-[1000] max-h-[90vh] overflow-y-auto bg-white text-gray-900 rounded-xl shadow-xl px-6 py-6"
      >
        {/* Required for accessibility */}
        <DialogHeader>
          <DialogTitle className="hidden">Sonu Rai Resume</DialogTitle>
          <DialogClose id="resume-close-btn">
            <Image
              src="/images/close.png"
              alt="Close"
              width={10}
              height={10}
              className="absolute top-4 right-4 cursor-pointer hover:opacity-80 border hover:border-black p-1 w-5 rounded-sm"
            />
          </DialogClose>
        </DialogHeader>

        {/* Header with photo, name, role and contact */}
        <div className="flex flex-col sm:flex-row items-center self-start justify-between gap-6 border-b pb-6 w-full">
          <Image
            crossOrigin="anonymous"
            src="/images/profile_picture.png"
            alt="Profile"
            width={120}
            height={120}
            className="rounded-lg object-cover border border-gray-200 shadow-xl w-1/2 sm:w-1/4"
            priority
          />
          <div className="flex flex-col items-start space-y-1 w-3/4">
            {info.map((item, index) => (
              <div key={index} className="space-y-1">
                <h1 className="text-3xl font-bold uppercase">{item.name}</h1>
                <p className="text-sm tracking-wider uppercase text-gray-600">
                  {item.role}
                </p>
              </div>
            ))}

            <div className="grid sm:grid-cols-2 gap-1 mt-3 text-sm text-gray-700">
              {contact.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Image
                    height={20}
                    width={20}
                    src={item.image}
                    alt={item.name}
                  />
                  <Link
                    target="_blank"
                    href={item.href}
                    className="hover:underline cursor-pointer text-indigo-500 hover:text-indigo-700"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>

            {location.map((item, index) => {
              return (
                <div key={index}>
                  <p>
                    {item.city}, {item.country}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Professional Summary */}
        <section className="mt-6">
          <h3 className="bg-gray-800 text-white text-sm px-3 py-1 rounded uppercase font-semibold w-fit">
            Professional Summary
          </h3>
          {ProfessionalSummary.map((item, index) => {
            return (
              <p
                key={index}
                className="mt-2 ml-3 text-sm text-gray-700 leading-relaxed"
              >
                {item.description}
              </p>
            );
          })}
        </section>

        {/* Section: Academic Background */}
        <section className="mt-6">
          <h3 className="bg-gray-800 text-white text-sm px-3 py-1 rounded uppercase font-semibold w-fit">
            Academic Background
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 ml-3 text-sm">
            {AcademicBackground.map((item, index) => {
              return (
                <div key={index}>
                  <div className="font-semibold">{item.name}</div>
                  <div>{item.education}</div>
                  <div className="text-gray-600">{item.grade}</div>
                  <p className="mt-2 text-gray-700">{item.describe}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Core Skills */}
        <section className="mt-6">
          <h3 className="bg-gray-800 text-white text-sm px-3 py-1 rounded uppercase font-semibold w-fit">
            Core Skills
          </h3>
          {CoreSkills.map((item, index) => {
            return (
              <div
                key={index}
                className="list-disc ml-3 mt-2 text-sm text-gray-700 space-y-1"
              >
                <span>
                  <strong>{item.type}:</strong> {item.learn}
                </span>
              </div>
            );
          })}
        </section>

        {/* Section: Career History */}
        <section className="mt-6">
          <h3 className="bg-gray-800 text-white text-sm px-3 py-1 rounded uppercase font-semibold w-fit">
            Career History / Projects
          </h3>
          <div className="mt-2 space-y-4 text-sm">
            {Projects.map((item, index) => (
              <div key={index} className="mt-2 ml-3 space-y-4 text-sm">
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-gray-600">
                    <span className="font-semibold">Tech - </span>
                    {item.tech}
                  </div>
                  <p className="mt-1 text-gray-700 leading-relaxed">
                    {item.description}
                    {item.link && item.link.length > 0 && (
                      <>
                        &nbsp;
                        {item.link.map((person, idx) => (
                          <span key={idx}>
                            <Link
                              href={person.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-500 hover:underline inline-flex items-center gap-1"
                            >
                              <span>{person.name}</span>
                              <Image
                                height={20}
                                width={20}
                                src="/svg/linkdin.svg"
                                alt="LinkedIn"
                              />
                            </Link>
                            {idx < item.link.length - 2 ? ", " : ""}
                            {idx === item.link.length - 2 ? ", and " : ""}
                          </span>
                        ))}
                      </>
                    )}
                    {item.description2}
                  </p>
                </div>
              </div>
            ))}

            {/* Other Projects */}
            <div>
              <span className="font-bold">Other Projects</span>
              {OtherProjects.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="list-disc ml-3 text-gray-700 mt-1 space-y-1 text-sm"
                  >
                    <span>
                      <strong>{item.name}: </strong>
                      {item.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section: Certificates */}
        <section className="mt-6">
          <h3 className="bg-gray-800 text-white text-sm px-3 py-1 rounded uppercase font-semibold w-fit">
            Certificates
          </h3>
          {Certificates.map((item, index) => {
            return (
              <ul
                key={index}
                className="mt-2 ml-3 space-y-3 text-sm text-gray-700"
              >
                <li>
                  <div className="font-semibold">{item.name}</div>
                  <div>{item.issue}</div>
                  {item.id && <div>Credential ID: {item.id}</div>}
                  <Link
                    id="link"
                    href={item.href}
                    target="_blank"
                    className="text-indigo-500 hover:underline"
                  >
                    Show credential
                  </Link>
                </li>
              </ul>
            );
          })}
        </section>

        {/* Section: Work References */}
        <section className="mt-6">
          <h3 className="bg-gray-800 text-white text-sm px-3 py-1 rounded uppercase font-semibold w-fit">
            Recent Works
          </h3>

          <div className="mt-2 ml-3 text-sm text-gray-700">
            {RecentWorks.map((item, index) => {
              return (
                <div key={index} className="flex gap-1">
                  {item.site}{" "}
                  <div id="link">
                    (
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 hover:text-indigo-700 hover:underline"
                    >
                      {item.name}
                    </Link>
                    )
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <DialogFooter className="mt-6 justify-end">
          <Button
            id="save-resume-btn"
            onClick={Save}
            className="text-white bg-gradient-to-br from-[#6748FF] via-[#5a3ee0] to-[#4c32c7] hover:brightness-120 cursor-pointer mt-6"
          >
            Save Resume
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
