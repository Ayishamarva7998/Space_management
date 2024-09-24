import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Profile = ({ modal, Setmodal,admin }) => {
  const [activeSection, setActiveSection] = useState("profile");
  const [batches, setBatches] = useState(["Batch 1", "Batch 2"]);
  const [stacks, setStacks] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newBatch, setNewBatch] = useState("");
  const [newStack, setNewStack] = useState("");
  const [newRole, setNewRole] = useState("");

  const handleAddBatch = () => {
    if (newBatch) {
      setBatches([...batches, newBatch]);
      setNewBatch("");
    }
  };

  const handleAddStack = () => {
    if (newStack) {
      setStacks([...stacks, newStack]);
      setNewStack("");
    }
  };

  const handleAddRole = () => {
    if (newRole) {
      setRoles([...roles, newRole]);
      setNewRole("");
    }
  };

  return (
    <>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl p-6 relative">
            <div className="flex justify-between items-center border-b pb-4">
              <MdClose
                onClick={() => Setmodal(false)}
                className="text-2xl cursor-pointer hover:bg-gray-200 rounded-full p-1"
              />
            </div>

            <div className="flex mt-6 space-x-6">
              <div className="w-1/3 bg-gray-100 p-4 rounded-lg">
                <div className="flex flex-col items-center">
                  <img
                    src={admin.profileImg}
                    alt="Profile"
                    className="rounded-full w-32 h-32 mb-4 border"
                  />
                  <h4 className="text-lg font-semibold mb-6">{admin.name}</h4>
                </div>

                <div className="border-t pt-4">
                  {["profile", "addBatch", "addStack", "addRole"].map((section) => (
                    <button
                      key={section}
                      className={`w-full flex justify-center items-center mt-4 ${
                        activeSection === section ? "bg-[#e64c67]" : " bg-[#13425c]"
                      } text-white px-4 py-2 rounded-lg hover:bg-[#e16a80]`}
                      onClick={() => setActiveSection(section)}
                    >
                      {section === "addBatch" ? "Add Batch" : section === "addStack" ? "Add Stack" : section === "addRole" ? "Add Role" : "Profile"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-2/3 bg-white p-4 rounded-lg border">
                {activeSection === "profile" ? (
                  <div className="grid grid-cols-2 gap-4">
                
                
                    <div className="text-sm font-semibold text-gray-600">Email:</div>
                    <div className="flex items-center text-sm">
                     {admin.email}
                    </div>
                    <div className="text-sm font-semibold text-gray-600">Name:</div>
                    <div className="flex items-center text-sm">
                     {admin.name}
                    </div>
                    
                  </div>
                ) : activeSection === "addBatch" ? (
                  <div>
                    <input
                      type="text"
                      value={newBatch}
                      onChange={(e) => setNewBatch(e.target.value)}
                      placeholder="Enter new batch"
                      className="border rounded p-2 w-full mb-4"
                    />
                    <button
                      onClick={handleAddBatch}
                      className=" bg-[#13425c] text-white px-4 py-2 rounded-lg hover:bg-[#e16a80]"
                    >
                      Add Batch
                    </button>
                    <h4 className="text-lg font-semibold mb-4">Current Batches</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {batches.map((batch, index) => (
                        <div key={index} className="bg-gray-200 text-sm p-3 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                          {batch}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : activeSection === "addStack" ? (
                  <div>
                    <input
                      type="text"
                      value={newStack}
                      onChange={(e) => setNewStack(e.target.value)}
                      placeholder="Enter new stack"
                      className="border rounded p-2 w-full mb-4"
                    />
                    <button
                      onClick={handleAddStack}
                      className=" bg-[#13425c] text-white px-4 py-2 rounded-lg hover:bg-[#e16a80]"
                    >
                      Add Stack
                    </button>
                    <h4 className="text-lg font-semibold mb-4">Current Stacks</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {stacks.map((stack, index) => (
                        <div key={index} className="bg-gray-200 text-sm p-3 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                          {stack}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : activeSection === "addRole" ? (
                  <div>
                    <input
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder="Enter new role"
                      className="border rounded p-2 w-full mb-4"
                    />
                    <button
                      onClick={handleAddRole}
                      className=" bg-[#13425c] text-white px-4 py-2 rounded-lg hover:bg-[#e16a80]"
                    >
                      Add Role
                    </button>
                    <h4 className="text-lg font-semibold mb-4">Current Roles</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {roles.map((role, index) => (
                        <div key={index} className="bg-gray-200 text-sm p-3 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                          {role}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
