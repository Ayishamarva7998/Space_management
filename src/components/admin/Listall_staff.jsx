import { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdPersonAddAlt1, MdDeleteOutline } from "react-icons/md";
import Manage_staff from "./Manage_staff";
import Block_staff from "../Modal/Staff_block";
import Update_staff from "./Update_staff";
import Loading from "../Modal/Loading";
import userInstance from "../../axios_interceptor/userAxios";
const Listall_staff = () => {
  const [staffData, setStaffData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [Open, SetOpen] = useState(false);
  const [Openblock, SetOpenBlock] = useState(false);
  const [updateOpen, SetupdateOpen] = useState(false);
  const [selectstaff, setSelectStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await userInstance.get(`/staff`);
        if (result && result.data.message) {
          setStaffData(result.data.message);
        }
      } catch (error) {
        console.error("Error fetching staff data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [Openblock, updateOpen, Open]);

  const updateClose = () => {
    SetupdateOpen(!updateOpen);
  };

  const blockclose = () => {
    SetOpenBlock(!Openblock);
  };

  const filteredStaffData = staffData.filter((item) =>
    `${item.firstname} ${item.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {Open ? (
        <Manage_staff setOpen={SetOpen} />
      ) : (
        <div className="  p-4 flex  justify-center  ml-16 md:ml-64 ">
          <div className="bg-[#d8cbd7] w-full max-w-7xl rounded-3xl p-3 md:p-4 shadow-lg">
            <div className="bg-white w-full text-black flex flex-col md:flex-row justify-between items-center rounded-2xl p-6 shadow-md mb-8">
              <input
                type="text"
                placeholder="Search here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 mb-4 md:mb-0 bg-gray-200 w-full md:w-[400px] rounded-full focus:outline-none shadow-inner"
              />

              <button
                onClick={() => SetOpen(true)}
                className="w-full md:w-[150px] bg-white p-3 border flex justify-center items-center border-gray-300 rounded-lg hover:bg-gray-200 transition-all text-gray-800 font-semibold"
              >
                <MdPersonAddAlt1 />
                Add Staff
              </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="bg-white p-4 rounded-lg">
                <div className="hidden md:grid md:grid-cols-6 gap-1 font-semibold text-gray-700 text-center bg-gray-200 p-3 rounded-lg mb-2">
                  <div>Name</div>
                  <div>Position</div>
                  <div>Badge Color</div>
                  <div>Batch</div>
                  <div>Email</div>
                </div>

                {loading ? (
                  <Loading />
                ) : (
                  <div className="bg-white min-h-[300px] overflow-auto max-h-[500px]">
                    {filteredStaffData.map((item) => (
                      <div
                        key={item._id}
                        className="grid grid-cols-1 md:grid-cols-6 gap-4 text-center items-center p-4 bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition-all"
                      >
                        <div className="grid grid-cols-2 flex-col md:flex-row gap-2 items-center justify-between">
                          <img
                            src={item.profileImg || "default-profile-img.png"}
                            alt={`${item.firstname} profile`}
                            className="w-[40px] h-[40px] rounded-full"
                          />
                          <span className="font-medium text-gray-800">
                            {item.firstname}
                            {item.lastname}
                          </span>
                        </div>

                        <div className="hidden md:block text-gray-600">
                          {item.role || "N/A"}
                        </div>
                        <div className="hidden md:block">
                          <div
                            className="w-[30px] h-[30px] rounded-full mx-auto"
                            style={{
                              backgroundColor: item.badgecolor || "#ccc",
                            }}
                          ></div>
                        </div>
                        <div className="hidden md:block text-gray-600">
                          {item.batch || "N/A"}
                        </div>
                        <div className="hidden md:block text-sm text-gray-600">
                          {item.email || "N/A"}
                        </div>

                        <div className="flex justify-center space-x-4">
                          <button
                            aria-label="Email"
                            className="text-gray-600 hover:text-[#e16a80] transition-all"
                          >
                            <FaEnvelope />
                          </button>
                          <button
                            aria-label="Edit"
                            className="text-gray-600 hover:text-[#e16a80] transition-all"
                            onClick={() => {
                              SetupdateOpen(true), setSelectStaff(item);
                            }}
                          >
                            <CiEdit />
                            {updateOpen && (
                              <Update_staff
                                isOpen={updateOpen}
                                onClose={updateClose}
                                staffData={selectstaff}
                              />
                            )}
                          </button>
                          <button
                            aria-label="Edit"
                            className="text-gray-600 hover:text-[#e16a80] transition-all"
                            onClick={() => {
                              SetOpenBlock(true), setSelectStaff(item);
                            }}
                          >
                            <MdDeleteOutline />
                            {Openblock && (
                              <Block_staff
                                isOpen={Openblock}
                                onClose={blockclose}
                                SetOpenBlock={SetOpenBlock}
                                staffData={selectstaff}
                              />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Listall_staff;
