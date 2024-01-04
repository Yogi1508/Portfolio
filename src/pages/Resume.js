import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { ArrowBigDownDash, Eye, EyeOff, FileDown } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const Resume = ({ props }) => {
  const [file, setFile] = useState();
  const [showResume, setShowResume] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (showResume && props !== null && props !== undefined) {
      if (props.src !== null && props.src !== undefined) {
        if (props.src.length > 0) {
          const fetchPdfFile = async () => {
            try {
              const response = await fetch(props.src);
              if (response.headers.get("Content-Length") !== null) {
                const blob = await response.blob();
                const file = new File([blob], props.resumeName, {
                  type: "application/pdf",
                });
                setFile([
                  {
                    uri: URL.createObjectURL(file),
                    filename: props.resumeName,
                  },
                ]);
              } else
                toast.error(
                  "Unable To Download Resume. Apology for the Inconvenience."
                );
            } catch (error) {
              console.error("Error fetching PDF:", error);
              toast.error(
                "Unable To Download Resume. Apology for the Inconvenience."
              );
            }
          };
          fetchPdfFile();
        } else
          toast.error(
            "Unable To Download Resume. Apology for the Inconvenience."
          );
      } else
        toast.error(
          "Unable To Download Resume. Apology for the Inconvenience."
        );
    }
  }, [props, showResume]);

  const ResumeDownloadHandler = () => {
    setIsDownloading(true);
    if (props !== null && props !== undefined) {
      if (props.src !== null && props.src !== undefined) {
        if (props.src.length > 0) {
          const fetchPdfFile = async () => {
            try {
              const response = await fetch(props.src);
              if (response.headers.get("Content-Length") !== null) {
                const blob = await response.blob();
                const file = new File([blob], props.resumeName, {
                  type: "application/pdf",
                });
                toast.success("Resume Will Download shortly");
                const blobUrl = URL.createObjectURL(file);
                const link = document.createElement("a");
                link.href = blobUrl;
                link.setAttribute("download", props.resumeName);
                link.style.display = "none";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              } else
                toast.error(
                  "Unable To Download Resume. Apology For The Inconvenience."
                );

              setIsDownloading(false);
            } catch (error) {
              console.error("Error fetching PDF:", error);
              setIsDownloading(false);
              toast.error(
                "Unable To Download Resume. Apology For The Inconvenience."
              );
            }
          };
          fetchPdfFile();
        } else
          toast.error(
            "Unable To Download Resume. Apology For The Inconvenience."
          );
      } else
        toast.error(
          "Unable To Download Resume. Apology For The Inconvenience."
        );
    } else
      toast.error("Unable To Download Resume. Apology For The Inconvenience.");
  };
  return (
    props && (
      <>
        <button
          onClick={() => setShowResume(!showResume)}
          className="mt-2 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 ml-3 overflow-hidden font-medium text-md  rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span className="flex  gap-2 px-2 py-2.5 transition-all ease-in duration-75 bg-cyan-600 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {showResume ? (
              <>
                <EyeOff color="#942ad1" /> Hide
              </>
            ) : (
              <>
                <Eye color="#942ad1" /> View
              </>
            )}{" "}
            Resume
          </span>
        </button>
        <button
          onClick={() => ResumeDownloadHandler()}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-md font-medium rounded-lg group bg-gradient-to-br text-white from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="flex px-2 py-2.5 transition-all ease-in duration-75 bg-blue-500 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {isDownloading ? (
              <>
                <ArrowBigDownDash /> Downloading
              </>
            ) : (
              <>
                <FileDown color="#8cc412" />
                Download Resume
              </>
            )}
          </span>
        </button>
        {showResume && (
          <div className="ml-2 bg-cardPrimary p-4 rounded-md shadow-lg bg-blue-gray-900">
            {file && (
              <DocViewer
                documents={file}
                pluginRenderers={DocViewerRenderers}
                style={{
                  maxHeight: "85vh",
                }}
                config={{
                  header: {
                    disableHeader: true,
                    disableFileName: true,
                    retainURLParams: false,
                  },
                  pdfZoom: {
                    defaultZoom: 1.1, // 1 as default,
                    zoomJump: 0.2, // 0.1 as default,
                  },
                  pdfVerticalScrollByDefault: true, // false as default
                }}
              />
            )}
          </div>
        )}
      </>
    )
  );
};

export default Resume;
