import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import axios from "axios";

// Slide Transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductUi = () => {
  const [productForm, setProductForm] = useState({
    name: "",
    startup: "",
    pitchSummary: "",
  });
  const [getdata, setgetdata] = useState([]);
  const [open, setOpen] = useState(false);

  // form handlers
  const handleform = (e) => {
    const { name, value } = e.target;
    setProductForm((p) => ({ ...p, [name]: value }));
  };

  // create
  const uploadproduct = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const userId = user?.id;

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/entrepreum",
        { ...productForm, userId },
        { headers: { authorization: `Bearer ${token}` } }
      );
      setgetdata((prev) => [data.data, ...prev]);
      setProductForm({ name: "", startup: "", pitchSummary: "" });
      setOpen(false);
    } catch (err) {
      console.error("Create error:", err.response?.data || err.message);
    }
  };

  // read
  const getproductdata = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const userId = user?.id;

    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/auth/getentrepreum/${userId}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      setgetdata(data.data || []);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    }
  };

  // delete
  const productdelete = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    try {
      await axios.delete(
        `http://localhost:5000/api/auth/deleteEntrepreum/${id}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      setgetdata((prev) => prev.filter((x) => x._id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getproductdata();
  }, []);

  return (
    <>
      <div className="w-[95%] mx-auto my-6 space-y-4">
        {/* top actions */}
        <div className="flex flex-col gap-3.5 sm:flex-row items-stretch sm:items-center justify-between">
          <input
            type="text"
            className="bg-[#6C757D] text-white placeholder-white/80 w-full sm:w-[420px] p-3 rounded-lg font-medium text-[15px] outline-none"
            placeholder="Search Product"
          />
          <button
            onClick={() => setOpen(true)}
            className="bg-[#6C757D] hover:bg-black transition px-6 py-3 rounded-lg text-white"
          >
            Add Product
          </button>
        </div>

        {/* card header (like image) */}
        <div className="bg-[#4b1f1f] text-white px-4 py-3 rounded-t-xl flex items-center justify-between shadow">
          <h2 className="font-semibold text-lg">Current Products</h2>
          <span className="text-xl leading-none">➔</span>
        </div>

        {/* table container */}
        <div className="bg-white rounded-b-xl shadow overflow-x-auto">
          {/* set a sensible min width so it scrolls on small screens like the image */}
          <table className="min-w-[720px] w-full text-sm text-left border-separate border-spacing-0">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider sticky top-0">
              <tr>
                <th className="px-6 py-3 border-b">Name</th>
                <th className="px-6 py-3 border-b">Startup</th>
                <th className="px-6 py-3 border-b">Pitch Summary</th>
                <th className="px-6 py-3 border-b">Edit</th>
                <th className="px-6 py-3 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {getdata.length ? (
                getdata.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item?.name}
                    </td>
                    <td className="px-6 py-4">{item?.startup}</td>
                    <td className="px-6 py-4">
                      <span className="line-clamp-2">{item?.pitchSummary}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-3 py-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700">
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => productdelete(item._id)}
                        className="px-3 py-1.5 rounded-md bg-red-50 hover:bg-red-100 text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* dialog */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="add-product"
      >
        <div className="p-6 w-[300px] sm:w-[420px]">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Add New Product
          </h2>
          <form className="flex flex-col gap-4" onSubmit={uploadproduct}>
            <input
              type="text"
              onChange={handleform}
              name="name"
              value={productForm.name}
              placeholder="Product Name"
              className="border rounded-lg p-2 outline-none"
            />
            <input
              type="text"
              onChange={handleform}
              name="startup"
              value={productForm.startup}
              placeholder="Startup Name"
              className="border rounded-lg p-2 outline-none"
            />
            <textarea
              name="pitchSummary"
              onChange={handleform}
              value={productForm.pitchSummary}
              placeholder="Pitch Summary"
              className="border rounded-lg p-2 outline-none min-h-[96px]"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default ProductUi;
