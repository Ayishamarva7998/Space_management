import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loading from "../Modal/Loading";
import userInstance from "../../axios_interceptor/userAxios";

const validationSchema = Yup.object({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  dateofbirth: Yup.date().required("Date of birth is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  education: Yup.string().required("Education is required"),
  phonenumber: Yup.string().required("Phone number is required"),
  batch: Yup.string().required("Batch is required"),
  role: Yup.string().required("Role is required"),
});

const Manage_staff = ({ setOpen }) => {
  const [badgeColor, setBadgeColor] = useState("#000000");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState();
  const [load, Setload] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      dateofbirth: "",
      email: "",
      address: "",
      education: "",
      phonenumber: "",
      batch: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      Setload(true);

      const formDataToSend = new FormData();
      Object.keys(values).forEach((key) => {
        formDataToSend.append(key, values[key]);
      });
      formDataToSend.append("badgecolor", badgeColor);

      if (photo) {
        formDataToSend.append("profileImg", photo);
      }

      try {
        const response = await userInstance.post('/staff',formDataToSend)

        toast.success(response.data.message);
      } catch (error) {
        if (error) {
          toast.error(
            "Error: " +
              (error.response?.data?.message || "Something went wrong")
          );
        }
      } finally {
        Setload(false);

        setOpen(false);
      }
    },
  });

  function colorChange(e) {
    setBadgeColor(e.target.value);
  }
  function handlePhotoChange(e) {
    const file = e.target.files[0];
    setPhoto(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    // <div className="bg-gray-100 min-h-screen p-5 md:p-10">
    <div className=" bg-gray-950y-50 p-6 ml-16 md:ml-64">
      {load && <Loading />}

      <div className="bg-[#d8cbd7] w-full p-3 md:p-4 rounded-lg">
        <div className="bg-[#f3eff2] rounded-xl h-full">
          <div className="p-5">
            <h1 className="text-xs md:text-2xl text-black font-bold">
              Add New Advisor
            </h1>
          </div>
          <hr />
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col md:flex-row p-5 md:p-10 gap-5 md:gap-10">
              <div className="flex flex-col gap-2">
                <h1 className="text-black text-lg md:text-xl">Photo</h1>
                <img
                  className="rounded-xl h-20 w-20 md:h-28 md:w-28 border-black"
                  src={
                    photoPreview ||
                    "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
                  }
                  alt="Profile Preview"
                />
                <div className="flex gap-2 ">
                  <label>
                    <input type="file" hidden onChange={handlePhotoChange} />
                    <div className="flex w-32 bg-[#12415d] text-white h-9 md:h-10 px-3 md:px-4 rounded-md leading-4 items-center justify-center cursor-pointer focus:outline-none">
                      Choose File
                    </div>
                  </label>
                  <button
                    type="button"
                    className="bg-[#d8cbd7] text-red-400 h-9 md:h-10 px-3 md:px-4 rounded-md"
                    onClick={() => {
                      setPhoto(null);
                      setPhotoPreview("");
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row text-black  w-full gap-5">
                <div className="flex flex-col  p-5 w-full md:w-1/2 gap-3">
                  <label htmlFor="firstname">
                    First Name:
                    {formik.errors.firstname && (
                      <span className="text-red-500 font-bold">
                        {/* {formik.errors.firstname}* */}*
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    className="h-8 border border-gray-300 rounded-md px-2"
                    id="firstname"
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                  />

                  <label htmlFor="lastname">
                    Last Name:
                    {formik.errors.lastname && (
                      <span className="text-red-500 font-bold "></span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                    className="h-8 border border-gray-300 rounded-md px-2"
                    id="lastname"
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                  />

                  <label htmlFor="email">
                    Email:
                    {formik.errors.email && (
                      <span className="text-red-500 font-bold"></span>
                    )}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="h-8 border border-gray-300 rounded-md px-2"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />

                  <label htmlFor="address">
                    Address:
                    {formik.errors.address && (
                      <span className="text-red-500 font-bold">
                        {/* {formik.errors.address}* */}*
                      </span>
                    )}
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    className="border border-gray-300 rounded-md p-2 h-24"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </div>

                <div className="flex flex-col p-5 w-full md:w-1/2 gap-3">
                  <label htmlFor="dateofbirth">
                    Date of Birth:
                    {formik.errors.dateofbirth && (
                      <span className="text-red-500 font-bold">
                        {/* {formik.errors.dateofbirth}* */}*
                      </span>
                    )}
                  </label>
                  <input
                    type="date"
                    name="dateofbirth"
                    className="h-8 border border-gray-300 rounded-md px-2"
                    id="dateofbirth"
                    onChange={formik.handleChange}
                    value={formik.values.dateofbirth}
                  />

                  <label htmlFor="education">
                    Education:
                    {formik.errors.education && (
                      <span className="text-red-500 font-bold">
                        {/* {formik.errors.education} */}*
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="education"
                    placeholder="Education"
                    className="h-8 border border-gray-300 rounded-md px-2"
                    id="education"
                    onChange={formik.handleChange}
                    value={formik.values.education}
                  />

                  <label htmlFor="phonenumber">
                    Phone Number:
                    {formik.errors.phonenumber && (
                      <span className="text-red-500 font-bold">
                        {/* {formik.errors.phonenumber} * */} *
                      </span>
                    )}
                  </label>
                  <input
                    type="tel"
                    name="phonenumber"
                    placeholder="Phone number"
                    className="h-8 border border-gray-300 rounded-md px-2"
                    id="phonenumber"
                    onChange={formik.handleChange}
                    value={formik.values.phonenumber}
                  />

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex md:flex-row flex-col gap-2 md:items-center justify-between">
                      <label htmlFor="badgecolor">Badge Color:</label>
                      <input
                        onChange={colorChange}
                        type="color"
                        value={badgeColor}
                        className="h-8 w-12 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={badgeColor}
                        readOnly
                        className="h-8 border border-gray-300 rounded-md px-2"
                        placeholder="Badge Color"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between md:flex-row gap-5">
                    <div className="flex w-full">
                      <div className="flex flex-col w-full md:w-1/3">
                        <label htmlFor="batch">
                          Batch:
                          {formik.errors.batch && (
                            <sapn className="text-red-500 font-bold">
                              {/* {formik.errors.batch} */}*
                            </sapn>
                          )}
                        </label>
                        <select
                          name="batch"
                          id="batch"
                          className="h-8 border border-gray-300 rounded-md px-2"
                          onChange={formik.handleChange}
                          value={formik.values.batch}
                        >
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                        </select>
                      </div>

                      <div className="flex flex-col ml-2">
                        <label htmlFor="role">
                          Role:
                          {formik.errors.role && (
                            <span className="text-red-500 font-bold">
                              {/* {formik.errors.role} */}*
                            </span>
                          )}
                        </label>
                        <select
                          name="role"
                          id="role"
                          className="h-8 border border-gray-300 rounded-md px-2"
                          onChange={formik.handleChange}
                          value={formik.values.role}
                        >
                          <option value="Advisor">Advisor</option>
                          <option value="Manager">Manager</option>
                          <option value="Staff">Staff</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="bg-[#12415d] text-white h-10 px-6 rounded-md cursor-pointer"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Manage_staff;
