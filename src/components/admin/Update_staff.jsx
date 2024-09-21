import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import userInstance from "../../axios_interceptor/userAxios";
import { toast } from "react-toastify";
import Loading from '../Modal/Loading';


export default function UpdateStaff({ isOpen, onClose, staffData }) {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (staffData) {
      setFormData({
        firstname: staffData.firstname || "",
        lastname: staffData.lastname || "",
        email: staffData.email || "",
        role: staffData.role || "",
        badgecolor: staffData.badgecolor || "",
        batch: staffData.batch || "",
        profileImg: null,
      });
      setImagePreview(staffData.profileImg || "");
    }
  }, [staffData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      profileImg: e.target.files[0],
    }));
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updateData = new FormData();
    updateData.append("firstname", formData.firstname);
    updateData.append("lastname", formData.lastname);
    updateData.append("email", formData.email);
    updateData.append("role", formData.role);
    updateData.append("badgecolor", formData.badgecolor);
    updateData.append("batch", formData.batch);

    if (formData.profileImg) {
      updateData.append("profileImg", formData.profileImg);
    }

    try {
      const response = await userInstance.patch(`/staff/${staffData._id}`, updateData);
      toast.success(response.data.message);
      onClose();
    } catch (error) {
      console.error("Error updating staff:", error);
      toast.error("Error updating staff. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-10 transition-opacity" />
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left transition-all sm:max-w-lg w-full">
            <div className="px-6 py-8">
              <DialogTitle as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-6">
                Update Staff Information
              </DialogTitle>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Profile Image */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                  {imagePreview && (
                    <img src={imagePreview} alt="Profile Preview" className="mt-1 h-24 w-24 rounded-full" />
                  )}
                  <label>
                    <input
                      type="file"
                      name="profileImg"
                      hidden
                      onChange={handleFileChange}
                    />
                    <div className="flex w-32 bg-[#12415d] text-white h-8 px-3 rounded-md leading-4 items-center justify-center cursor-pointer focus:outline-none">
                      Choose File
                    </div>
                  </label>
                </div>

                {/* Firstname */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>

                {/* Lastname */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                  />
                </div>

                {/* Email */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>

                {/* Role */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                  />
                </div>

                {/* Badge Color */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Badge Color</label>
                  <input
                    type="text"
                    name="badgecolor"
                    value={formData.badgecolor}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                  />
                </div>

                {/* Batch */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Batch</label>
                  <input
                    type="text"
                    name="batch"
                    value={formData.batch}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                  />
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="col-span-2 flex justify-end gap-4 mt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm ${loading ? 'bg-gray-500' : 'bg-[#13425c] hover:bg-[#e64c67]'} focus:outline-none focus:ring-2 focus:ring-[#e64c67]`}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex justify-center rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      {loading && <Loading/>} 
    </>
  );
}
