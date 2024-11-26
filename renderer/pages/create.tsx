import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";

function Create() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    dueDate: "",
    amount: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Invoice successfully created!");
        setFormData({
          clientName: "",
          clientEmail: "",
          dueDate: "",
          amount: "",
          status: "Pending",
        });
      } else {
        alert("Failed to create invoice.");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Create Invoice</title>
      </Head>
      <div className="w-screen h-screen flex">
        <Navbar />

        {/* FORM VIEW */}
        <section className="flex flex-col items-center w-full min-w-[1024px] h-full px-8 py-16 overflow-scroll">
          <h1 className="text-4xl font-bold mb-8">Create New Invoice</h1>
          <form
            className="bg-purple-900 shadow-lg rounded-lg p-8 w-full max-w-[600px] flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="clientName" className="font-semibold">
                Client Name
              </label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="clientEmail" className="font-semibold">
                Client Email
              </label>
              <input
                type="email"
                id="clientEmail"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="dueDate" className="font-semibold">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="amount" className="font-semibold">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="status" className="font-semibold">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border border-gray-300 bg-gray-600 rounded-lg p-2"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-purple hover:bg-purple-hover text-white font-bold rounded-lg p-3 mt-4"
            >
              Create Invoice
            </button>
          </form>
        </section>
      </div>
    </React.Fragment>
  );
}

export default Create;
