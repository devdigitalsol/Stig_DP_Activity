import PERSON from "../images/person.png";
import { useContext, useEffect } from "react";
import { AppContext } from "../context";
import LOGO from "../images/logo.png";
import BOX_IMAGE from "../images/Dp_back.png"; 
import DOWNLOAD_IMAGE from "../images/Download_btn.png"; 
import SHARE_IMAGE from "../images/share_btn.png"; 
import "../utils/app.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Preview() {
  const { uploadedPhoto, imgUrl,identifier } = useContext(AppContext);
  const navigate=useNavigate();


  const downloadPDF = async () => {
    let pdfPhoto = "";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "";
    img.src = imgUrl || uploadedPhoto;

    img.onload = async () => {
      canvas.width = 512;
      canvas.height = 512;
      ctx.beginPath();
      ctx.arc(256, 256, 256, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 0, 0, 512, 512);
      pdfPhoto = canvas.toDataURL("image/png");

      const existingPdfBytes = await fetch('/path/to/your/pdf/template.pdf').then(res =>
        res.arrayBuffer()
      );

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pngImageBytes = await fetch(pdfPhoto).then(res =>
        res.arrayBuffer()
      );

      const pngImage = await pdfDoc.embedPng(pngImageBytes);
      const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      firstPage.drawImage(pngImage, {
        x: (firstPage.getWidth() - 131) / 2,
        y: 309,
        width: 131,
        height: 131,
      });

      const pdfBytes = await pdfDoc.save();
      download(pdfBytes, "pdf.pdf", "application/pdf");
    };
  };


  const updateImage = async (pdfUrl) => {
    try {
      const resp = await axios.post("https://quitsugarmovement.in/api/operations.php", {
        operation: "update_photo_url",
        record_id: identifier,
        photo_url: pdfUrl,
      });
      if (resp?.data?.status === 200) {
           console.log("save image url")
      }
    } catch (error) {
      console.log(error);
    }
  };



 useEffect(()=>{
    updateImage(imgUrl)
 },[])


  const handleShare = () => {
    navigate("/description")
  };

  return (
    <div className="px-4 py-6">
      <div
        id="doctorImg"
        className="relative text-[#fff] text-lg rounded-md px-6 py-10 shadow-3xl overflow-hidden space-y-4"
        style={{
          backgroundImage: `url(${BOX_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-white relative rounded-md px-4 py-8 flex flex-col items-center space-y-4">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#7cc8f2]">
            {uploadedPhoto ? (
              <img src={uploadedPhoto} alt="Uploaded" className="w-full h-full object-cover" />
            ) : (
              <img src={PERSON} alt="Default Person" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="logo-circle">
            <img src={LOGO} alt="Company Logo" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <img
            src={DOWNLOAD_IMAGE}
            alt="Download"
            className="cursor-pointer"
            onClick={downloadPDF}
          />
          <img
            src={SHARE_IMAGE}
            alt="Share"
            className="cursor-pointer"
            onClick={handleShare}
          />
        </div>
      </div>
    </div>
  );
}
