import React, { useState } from "react";
import "../index.css"

const CreateExpense = ({ onClose, onCreateExpense }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Health");
  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = formattedDate.toLocaleString("default", { month: "long" });
    const day = formattedDate.getDate();
    return `${day} ${month}, ${year}`;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseData = {
      id: new Date().getTime(),
      name,
      category,
      date: formatDate(date),
      description,
      amount: `INR ${amount}`,
      email,
    };
    onCreateExpense(expenseData);
  };
  const handleNameChange = (e) => {
    const inputName = e.target.value;
    const regex = /^.{0,140}$/; // 140 characters or less
    if (regex.test(inputName)) {
      setName(inputName);
    }
  };
  const handleAmountChange = (e) => {
    const inputAmount = e.target.value;
    const regex = /^\d*\.?\d+$/; // Positive numbers with optional decimal point
    if (regex.test(inputAmount)) {
      setAmount(inputAmount);
    }
  };
  return (
    <div className="create-expense-modal absolute top-[39px] p-4 right-[29px] w-[28%] bg-white border-2 border-black rounded">
      <h2 className="font-bold uppercase text-[16px] text-center px-[4px] py-[6px] bg-[teal] text-white rounded ">
        New Expense
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="text-md ">
          Name:
          <input
            className="border-[1px] p-1 m-2 border-gray-500 rounded text-[13px]"
            placeholder="Gym"
            type="text"
            value={name}
            required
            onChange={handleNameChange}
          />
        </label>
        <label className="text-md ">
          Description:
          <input
            className="border-[1px] p-1 m-2 border-gray-500 rounded text-[13px]"
            placeholder="Gym Subscription"
            required
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="text-md ">
          Category:
          <select
            required
            className="border-[1px] p-1 m-2 border-gray-500 rounded text-[13px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Health">Health</option>
            <option value="Electronics">Electronics</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Books">Books</option>
            <option value="Others">Others</option>
          </select>
        </label>
        <label className="text-md ">
          Date of Expense:
          <input
            className="border-[1px] p-1 m-2 border-gray-500 rounded text-[13px]"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className="text-md ">
          Expense Amount:
          <input
            placeholder="1000"
            className="border-[1px] w-[150px] p-1 m-2 border-gray-500 rounded text-[13px]"
            type="number"
            required
            value={amount}
            onChange={handleAmountChange}
          />
        </label>
        <label className="text-md ">
          Email:
          <input
            className="border-[1px] email-input  p-1 m-2 border-gray-500 rounded text-[13px]"
            type="email"
            value={email}
            required
            placeholder="abc123@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="text-md bg-[#15ad4f] p-1.5 my-[10px] mx-[5px] relative left-[90px] text-white w-[46%] text-center rounded create-expense"
        >
          Create Expense
        </button>
        <button
          onClick={onClose}
          className="text-md bg-[#dadada] p-1.5  mx-[5px] relative left-[90px] w-[46%] text-center rounded cancel"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateExpense;
