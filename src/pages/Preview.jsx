import { useContext, useEffect } from "react";
import { AppContext } from "../context";
import BOTTOMLOGO from "../images/bottom_img.png";
import LOGO from "../images/logo.png"
import BOX_IMAGE from "../images/Dp_back.png";
import DOWNLOAD_IMAGE from "../images/Download_btn.png";
import BACK from "../images/back_btn.png"
import "../utils/app.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";

export default function Preview() {
  const { uploadedPhoto, imgUrl, identifier } = useContext(AppContext);
  const navigate = useNavigate();

  const downloadImage = async () => {
    const element = document.getElementById("downloadableContent");

    if (element) {
      html2canvas(element, {
        allowTaint: true,
        useCORS: true,
      })
        .then(async (canvas) => {
          const myImage = canvas.toDataURL("image/jpeg", 0.8);
          const link = document.createElement("a");
          link.href = myImage;
          link.target = "_blank";
          link.setAttribute("download", "image.jpeg");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Convert the image to Blob and upload
          const blob = await (await fetch(myImage)).blob();
          uploadImage(blob);
        })
        .catch((error) => {
          console.log(error);
          alert("Oops, something went wrong!");
        });
    }
  };

  const uploadImage = async (imageBlob) => {
    let formData = new FormData();
    formData.append("upload_file", imageBlob, "image.jpeg");

    const headers = {
      HTTP_SECRETKEY: "ae9e762a",
      "Access-Control-Allow-Origin": "*",
      "content-type": "multipart/form-data",
    };

    try {
      const resp = await axios.post(
        `https://quitsugarmovement.in/api/file_upload.php`,
        formData,
        {
          headers,
        }
      );

      if (resp.data.status === 200) {
        const imageUrl = resp.data.filename;
        await updateImage(imageUrl);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const updateImage = async (imageUrl) => {
    try {
      const resp = await axios.post("https://quitsugarmovement.in/api/operations.php", {
        operation: "update_photo_url",
        record_id: identifier,
        photo_url: imageUrl,
      });
      if (resp?.data?.status === 200) {
        console.log("Image URL updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateImage(imgUrl);
  }, [imgUrl]);

  const handleShare = () => {
    navigate("/description");
  };

  return (
    <div className="px-4 py-6">
      <div
        className="relative text-[#fff] text-lg rounded-md px-6 py-10 shadow-3xl overflow-hidden space-y-4"
        style={{
          backgroundImage: `url(${BOX_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="relative rounded-lg    flex flex-col items-center space-y-4 bg-white"
          id="downloadableContent"
          style={{ position: "relative", width: "100%", height: "auto" }}
        >
          <div className="relative w-48 h-48 ">
            {uploadedPhoto ? (
            <img src={uploadedPhoto} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <img src={PERSON} alt="Default Person" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="absolute w-full bottom-0 z-20">
            <img src={BOTTOMLOGO} alt="Company Logo" className="w-31 h-31 object-cover" />
          </div> 
          <div className="absolute top-[-12px] left-0 z-20">
            <img src={LOGO} alt="Company Logo" className="w-16 h-31 object-cover" />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <img
            src={DOWNLOAD_IMAGE}
            alt="Download"
            className="cursor-pointer"
            onClick={downloadImage}
          />
          <img
            src={BACK}
            alt="Share"
            className="cursor-pointer"
            onClick={handleShare}
          />
        </div>
      </div>
    </div>
  );
}
