import html2pdf from "html2pdf.js"; // Replacing RNHTMLtoPDF
import { toast } from "react-toastify"; // Replacing Toast
import "react-toastify/dist/ReactToastify.css";
export async function CustomPDF(model) {
    // HTML content for the PDF
    const htmlContent = `
    <html>
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          td, th {
            border: 1px solid #dddddd;
            text-align: center;
            padding: 8px;
          }
          h1, h4 {
            text-align: center;
          }
          img {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }
        </style>
      </head>
      <body>
        <h1 style="color: #30c39e;">Daddy Check</h1>
        <table>
          <tr style="background-color: #30c39e;">
            <th>Full Name</th>
            <th>Phone Number</th>
          </tr>
          <tr>
            <td>${model.fullName}</td>
            <td>${model.phoneNumber}</td>
          </tr>
        </table>
        <h4>Information</h4>
        <table>
          <tr style="background-color: #30c39e;">
            <th>Analysis Date</th>
            <th>Analysis Time</th>
          </tr>
          <tr>
            <td>${model.date}</td>
            <td>${model.time}</td>
          </tr>
        </table>
        <h4>Initial Data</h4>
        <table>
          <tr style="background-color: #30c39e;">
            <th>Parameter</th>
            <th>Value</th>
            <th>Normal Range</th>
          </tr>
          <tr>
            <td>volume(ml)</td>
            <td>${model.volume}</td>
            <td>>1.5 ml</td>
          </tr>
          <tr>
            <td>color</td>
            <td>${model.color}</td>
            <td>Milky</td>
          </tr>
          <tr>
            <td>viscosity</td>
            <td>${model.viscosity}</td>
            <td>Normal</td>
          </tr>
        </table>
        <h4>Motility Result</h4>
        <table>
          <tr style="background-color: #30c39e;">
            <th>Spermatozoa</th>
            <th>Value</th>
            <th>Reference Value</th>
          </tr>
          <tr>
            <td>Quantity</td>
            <td>${model.quantity}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Concentration</td>
            <td>-</td>
            <td>15</td>
          </tr>
        </table><br />
        <table>
          <tr style="background-color: #30c39e;">
            <th>Spermatozoa</th>
            <th>Value</th>
            <th>%</th>
            <th>Reference Value</th>
          </tr>
          <tr>
            <td>Total Motile</td>
            <td>-</td>
            <td>-</td>
            <td>>40%</td>
          </tr>
          <tr>
            <td>Progressive</td>
            <td>${model.prog}</td>
            <td>-</td>
            <td>>32%</td>
          </tr>
          <tr>
            <td>None-progressive</td>
            <td>${model.n_prog}</td>
            <td>-</td>
            <td></td>
          </tr>
          <tr>
            <td>Immotile</td>
            <td>${model.immotile}</td>
            <td>-</td>
            <td><60%</td>
          </tr>
        </table><br />
        <h4>Processed Photo From Sample</h4>
        <img src="${model.imgUrl}" alt="Sample Photo" />
      </body>
    </html>
  `;

    // PDF generation options
    const options = {
        margin: 10,
        filename: model.title || "report.pdf", // Fallback filename if title is missing
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    try {
        // Generate and download the PDF
        await html2pdf().set(options).from(htmlContent).save();
        toast.success("با موفقیت دانلود شد"); // Replacing Toast.show
    } catch (error) {
        console.error("PDF generation error:", error);
        toast.error("Failed to generate PDF: " + error.message);
    }
}