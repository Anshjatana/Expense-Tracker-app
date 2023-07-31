import { useState, useEffect } from "react";
import React from "react";
import "../index.css"

const EditExpense = ({ expense, onClose, onUpdateExpense }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Health");
  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const { name, category, date, description, amount, email } = expense;
    setName(name);
    setCategory(category);
    setDate(new Date(date));
    setDescription(description);
    setAmount(amount);
    setEmail(email);
  }, [expense]);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = formattedDate.toLocaleString("default", { month: "long" });
    const day = formattedDate.getDate();
    return `${day} ${month}, ${year}`;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedExpenseData = {
      ...expense,
      name,
      category,
      date: formatDate(date),
      description,
      amount: `INR ${amount}`,
      email,
    };
    onUpdateExpense(updatedExpenseData);
    onClose();
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
    <div className="edit-expense-modal absolute top-[39px] p-4 right-[29px] w-[28%] bg-white border-2 border-black rounded">
      <h2 className="font-bold uppercase text-[16px] text-center px-[4px] py-[6px] bg-[#932142e8] text-white rounded ">
        Edit Expense
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="text-md ">
          Name:
          <input
            className="border-[1px] p-1 m-2 border-gray-500 rounded text-[13px]"
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </label>
        <label className="text-md ">
          Description:
          <input
            required
            className="border-[1px] p-1 m-2 border-gray-500 rounded text-[13px]"
            placeholder="Gym Subscription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Expense Amount:
          <input
            required
            type="number"
            placeholder="1000"
            className="border-[1px] w-[150px] p-1 m-2 border-gray-500 rounded text-[13px]"
            value={amount}
            onChange={handleAmountChange}
          />
        </label>
        <label>
          Email:
          <input
            required
            type="email"
            className="border-[1px] email-input w-[250px] p-1 m-2 border-gray-500 rounded text-[13px]"
            value={email}
            placeholder="abc123@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="text-md bg-[#15ad4f] update-expense p-1.5 my-[10px] mx-[5px] relative left-[90px] text-white w-[46%] text-center rounded"
        >
          Update Expense
        </button>
        <button
          onClick={onClose}
          className="text-md bg-[#dadada] cancel p-1.5  mx-[5px] relative left-[90px] w-[46%] text-center rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditExpense;
