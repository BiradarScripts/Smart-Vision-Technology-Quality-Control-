export const downloadPDF = async (pdfType: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Get the base URL from the environment
  
    try {
      if (!baseUrl) {
        throw new Error("Base URL is not defined in environment variables");
      }
  
      const response = await fetch(`${baseUrl}api/${pdfType}/pdf`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }
  
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
  
      // Create a link element to download the PDF
      const link = document.createElement("a");
      link.href = url;
      link.download = `${pdfType}.pdf`;
      link.click();
  
      // Clean up the object URL after download
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };