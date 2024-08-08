import { useState, useContext } from "react";
import PicModal from "../components/PicModal";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context";
import BOX_IMAGE from "../images/blank_box.png"
import axios from "axios";

export default function Description() {
  const { uploadedPhoto, setUploadedPhoto, setImgUrl } = useContext(AppContext);
  const [openModal, setOpenModal] = useState({ show: false });
  const navigate = useNavigate();

  const uploadImage = async (imageSrc) => {
    let formData = new FormData();
    const blob = await fetch(imageSrc).then((res) => res.blob());

    formData.append("upload_file", blob, "something.png");

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
        setImgUrl(resp?.data?.filename)
        return;
      }
    } catch (error) {
      console.log(error, "error")
    }
  };

  const handlePhotoUpload = async (photo) => {
    setUploadedPhoto(photo);
    setOpenModal({ show: false });
    await uploadImage(photo);
    navigate("/preview");
  };

  return (
    <div className="px-14 pt-8 h-[100%] ">
      <div
        className="relative  text-[#fff] text-lg rounded-md px-4 py-10 shadow-3xl overflow-hidden space-y-4"
        style={{
          backgroundImage: `url(${BOX_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid #5f5c56'
        }}
      >
        <div className="leading-6">
          <p>Similar to </p>
          <p>the freedom fighters,</p>
          <p>you are the </p>
          <p><strong>'DIABETES REFORMER'</strong> </p>
          <p>for diabetes patients.</p>
        </div>

        <div className="leading-6">
          <p>You are helping them </p>
          <p>transform their lives</p>
          <p>and become</p>
          <p><strong>DIABETES-FREE</strong></p>
        </div>

        <hr />

        <div className="leading-6">
          <p>To create</p>
          <p> the <strong>DISPLAY PICTURE</strong> </p>
          <p>and be the face</p>
          <p>of this movement</p>
          <div
            className="btn text-center my-4 cursor-pointer"
            onClick={() => setOpenModal({ show: true })}
          >
            Click here to upload
          </div>
          <p className="text-sm">(Upload Photo in JPEG or PNG format)</p>
        </div>
      </div>
      <PicModal
        show={openModal.show}
        setShow={setOpenModal}
        handlePhotoUpload={handlePhotoUpload}
      />
    </div>
  );
}
