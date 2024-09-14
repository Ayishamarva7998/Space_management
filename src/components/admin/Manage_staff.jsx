import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addstaff } from "../../api/authentication_api";
import { toast } from "react-toastify";

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

const Manage_staff = () => {
  const [badgeColor, setBadgeColor] = useState("#000000");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      const formDataToSend = new FormData();
      Object.keys(values).forEach((key) => {
        formDataToSend.append(key, values[key]);
      });
      formDataToSend.append("badgecolor", badgeColor);

      if (photo) {
        formDataToSend.append("profileImg", photo);
      }

      try {
        const response = await addstaff(formDataToSend);
        toast.success(response.data.message);
      } catch (error) {
        toast.error(
          "Error: " + (error.response?.data?.message || "Something went wrong")
        );
      } finally {
        setLoading(false);
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
    <div className="bg-gray-100 min-h-screen p-5 md:p-10">
      {loading && (
        <div className="fixed backdrop-blur-md h-[100%] w-[100%] top-0 left-0 flex justify-center items-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-16 h-16 border-4 border-t-transparent border-pink-500 rounded-full animate-spin"></div>
            <div className="absolute w-12 h-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin-slow"></div>
            <div className="absolute w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin-reverse"></div>
          </div>
        </div>
      )}

      <div className="bg-[#d8cbd7] w-full p-5 md:p-10 rounded-lg">
        <div className="bg-[#f3eff2] rounded-xl h-full">
          <div className="p-5">
            <h1 className="text-xs md:text-2xl font-bold">Add New Advisor</h1>
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

              <div className="flex flex-col md:flex-row w-full gap-5">
                <div className="flex flex-col p-5 w-full md:w-1/2 gap-3">
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    className="h-8 border border-gray-300 rounded-md px-2"
                    id="firstname"
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                  />
                  {formik.errors.firstname && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.firstname}
                    </div>
                  )}

                  <label htmlFor="lastname">Last Name:</label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                    className="h-8 border border-gray-300 rounded-md px-2"
                    id="lastname"
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                  />
                  {formik.errors.lastname && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.lastname}
                    </div>
                  )}

                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="h-8 border border-gray-300 rounded-md px-2"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.email}
                    </div>
                  )}

                  <label htmlFor="address">Address:</label>
                  <textarea
                    name="address"
                    id="address"
                    className="border border-gray-300 rounded-md p-2 h-24"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                  {formik.errors.address && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.address}
                    </div>
                  )}
                </div>

                <div className="flex flex-col p-5 w-full md:w-1/2 gap-3">
                  <label htmlFor="dateofbirth">Date of Birth:</label>
                  <input
                    type="date"
                    name="dateofbirth"
                    className="h-8 border border-gray-300 rounded-md px-2"
                    id="dateofbirth"
                    onChange={formik.handleChange}
                    value={formik.values.dateofbirth}
                  />
                  {formik.errors.dateofbirth && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.dateofbirth}
                    </div>
                  )}

                  <label htmlFor="education">Education:</label>
                  <input
                    type="text"
                    name="education"
                    placeholder="Education"
                    className="h-8 border border-gray-300 rounded-md px-2"
                    id="education"
                    onChange={formik.handleChange}
                    value={formik.values.education}
                  />
                  {formik.errors.education && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.education}
                    </div>
                  )}

                  <label htmlFor="phonenumber">Phone Number:</label>
                  <input
                    type="tel"
                    name="phonenumber"
                    placeholder="Phone number"
                    className="h-8 border border-gray-300 rounded-md px-2"
                    id="phonenumber"
                    onChange={formik.handleChange}
                    value={formik.values.phonenumber}
                  />
                  {formik.errors.phonenumber && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.phonenumber}
                    </div>
                  )}

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
                        <label htmlFor="batch">Batch:</label>
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
                        {formik.errors.batch && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.batch}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col ml-2">
                        <label htmlFor="role">Role:</label>
                        <select
                          name="role"
                          id="role"
                          className="h-8 border border-gray-300 rounded-md px-2"
                          onChange={formik.handleChange}
                          value={formik.values.role}
                        >
                          <option value="Admin">Admin</option>
                          <option value="Advisor">Advisor</option>
                          <option value="Manager">Manager</option>
                          <option value="Staff">Staff</option>
                        </select>
                        {formik.errors.role && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.role}
                          </div>
                        )}
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
