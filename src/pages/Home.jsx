import { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AppContext } from "../context";
import axios from "axios";
import regionDistricts from "../context/Data";
import TermModal from "../components/TermModal";

const validationSchema = Yup.object().shape({
  managername: Yup.string().required("Manager name is required"),
  managerHQ: Yup.string().required("HeadQuarter is required"),
  region: Yup.string().required("Region is required"),
  doctorname: Yup.string().required("Doctor Name is required"),
  termsAndCondition: Yup.boolean().oneOf([true], "Accept terms and conditions"),
});


export default function Home() {

  const { setFormData,setIdentifier } = useContext(AppContext);
  const {setIsAuthenticated}=useContext(AppContext);
  const [openModal, setOpenModal] = useState({});
  const [termModalOpen, setTermModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="px-6 ">
      <h4 className="text-primary text-xl text-center mb-2">
        Enter Your Details
      </h4>

      <Formik
        initialValues={{
          managername: "",
          managerHQ: "",
          region:"",
          doctorname: "",
          termsAndCondition: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
           console.log("Submit", values)
           setIsAuthenticated(true)
           navigate("/selectcolor");
          setFormData(values);
          const apiUrl = "https://quitsugarmovement.in/api/operations.php";
          const requestData = {
            operation: "save_record",
            manager_name: values.managername,
            region: values.region,
            headquarter: values.managerHQ,
            doctor_name: values.doctorname,
          };
          axios
            .post(apiUrl, requestData)
            .then((response) => {
              if (response.data?.status === 200) {
                setIdentifier(response.data.record_id);
                navigate("/selectcolor");
              }
            })
            .catch((error) => {
              console.error("API call error:", error);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({
          handleBlur,
          handleSubmit,
          errors,
          isValid,
          dirty,
          handleChange,
          setFieldValue,
          values,
        }) => (
          <>
            <Form
              onSubmit={handleSubmit}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-lg overflow-hidden space-y-2"
            >
              <div className="form-group">
                <Field
                  type="text"
                  className="form-control"
                  placeholder="Territory Manager Name"
                  id="managername"
                  name="managername"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="managername"
                  component="div"
                  className="text-red-600 text-center text-xs"
                />
              </div>
            
              <div className="form-group">
                <Field
                  as="select"
                  id="region"
                  name="region"
                  className="form-control"
                  onChange={(e) => {
                    const selectedRegion = e.target.value;
                    setFieldValue("region", selectedRegion);
                    setFieldValue("managerHQ", "");
                  }}
                  onBlur={handleBlur}
                >
                  <option value="" disabled >Region</option>
                  {Object.keys(regionDistricts).map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="region"
                  component="div"
                  className="text-red-600 text-center text-xs"
                />
              </div>

              <div className="form-group">
                <Field
                  as="select"
                  id="managerHQ"
                  name="managerHQ"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" disabled>Manager HQ</option>
                  {values.region &&
                    regionDistricts[values.region].map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name="managerHQ"
                  component="div"
                  className="text-red-600 text-center text-xs"
                />
              </div>
              <div className="form-group">
                <Field
                  type="text"
                  className="form-control"
                  placeholder="Doctor Name"
                  id="doctorname"
                  name="doctorname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="doctorname"
                  component="div"
                  className="text-red-600 text-center text-xs"
                />
              </div>
               <div className="space-x-2 text-center">
                <input
                  type="checkbox"
                  name="termsAndCondition"
                  id="termsAndCondition"
                  onChange={handleChange}
                />
                <span className="text-sm">
                  I have read and agree to the{" "}
                  <span
                    className="underline text-primary"
                    onClick={() => setTermModalOpen(true)}
                  >
                    terms and conditions.
                  </span>
                </span>
                <ErrorMessage
                  name="termsAndCondition"
                  component="div"
                  className="text-red-600 text-center text-xs"
                />
              </div> 
              <div className="text-center">
                <button
                  type="submit"
                  className="btn w-full"
                  disabled={submitting}
                >
                  SUBMIT
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
      {termModalOpen && (
        <TermModal setTermModalOpen={setTermModalOpen}>
          <div className="center-content-flex flex-col gap-4 text-sm">
            <h4 className="text-primary text-xl mb-1">Terms & Conditions</h4>
            <p>
            "I have opted to use the
            <a
                href="https://quitsugarmovement.in/"
                className="text-primary break-all font-semibold px-2 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                quitsugarmovement.in
              </a>  
            
              web link of my own volition and agree to upload my picture and personal details therein for participating in 
              
              <a
                href="https://quitsugarmovement.in/"
                className="text-primary break-all font-semibold px-2 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                quitsugarmovement.in.
              </a> 
              <br/>
              I state that the picture and personal details shared by me are true and accurate and the Company shall not have any liability arising from its reliance on the same.
              <br/>
              I agree that the all contents used for promotion of the event shall be the property of Dr. Reddy's, and meant for its use only."
            </p>
          </div>
        </TermModal>
      )}
    </div>
  );
}

