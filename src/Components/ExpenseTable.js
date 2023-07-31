import React, { useState } from "react";
import "../index.css"
import { Pencil, Trash2 } from "lucide-react";
import EditExpense from "./EditExpense";

const ExpenseTable = ({
  expenses,
  onDeleteExpense,
  onUpdateExpense,
  onEditButtonClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Filter expenses based on search term and date
  const filteredExpenses = expenses.filter((expense) => {
    return (
      (searchTerm === "" ||
        expense.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filterDate || new Date(expense.date) >= filterDate)
    );
  });
  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setShowEditModal(true);
    onEditButtonClick();
  };
  const handleDeleteConfirmation = (expenseId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (shouldDelete) {
      onDeleteExpense(expenseId);
    }
  };
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = formattedDate.toLocaleString("default", { month: "long" });
    const day = formattedDate.getDate();
    return `${day} ${month}, ${year}`;
  };
  const handleUpdateExpense = (updatedExpense) => {
    // Formatting the date
    const formattedDate = formatDate(updatedExpense.date);
    const updatedExpenseData = {
      ...updatedExpense,
      date: formattedDate,
    };
    setShowEditModal(false);
    onUpdateExpense(updatedExpenseData);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search by Expense Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-1 search text-xs text-black absolute w-[12%] rounded top-[20px] right-[50%] border-[1px] border-slate-950 "
      />
      <input
        className="p-1 date-filter text-xs text-black absolute rounded top-[20px] right-[63%] border-[1px] border-slate-950 "
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      />
      <div className="overflow-y-scroll h-[430px] ">
      <table className=" table border-2 border-[#c1bdbd] w-[67%]  relative top-[20px] ">
        <thead className="bg-[darkgray] text-white">
          <tr>
            <th className="p-[10px]">Name</th>
            <th>Category</th>
            <th>Date of Expense</th>
            <th>Amount</th>
            <th>Created By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredExpenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-[1px] bg-white border-gray-400"
            >
              <td className="p-[10px]">{expense.name}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>{expense.amount}</td>
              <td>{expense.email}</td>
              <td>
                <button
                  className="px-2"
                  onClick={() => handleEditExpense(expense)}
                >
                  <Pencil className="edit"/>
                </button>
                <button onClick={() => handleDeleteConfirmation(expense.id)}>
                  <Trash2 className="text-[red] delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
      {showEditModal && (
        <EditExpense
          expense={selectedExpense}
          onClose={() => setShowEditModal(false)}
          onUpdateExpense={handleUpdateExpense}
        />
      )}
    </div>
  );
};

export default ExpenseTable;
