import React, { useState } from "react";
import CreateExpense from "./CreateExpense";
import ExpenseTable from "./ExpenseTable";
import "../index.css"

const ViewExpence = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const handleCreateExpense = (expenseData) => {
    setExpenses([...expenses, expenseData]);
    setShowCreateModal(true);
  };
  const handleDeleteExpense = (expenseId) => {
    setExpenses(expenses.filter((expense) => expense.id !== expenseId));
  };
  const handleUpdateExpense = (updatedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setShowCreateModal(false);
  };
  const handleEditButtonClick = () => {
    setShowCreateModal(false);
  };
  return (
    <div className="box-border absolute p-6 h-[85vh] bg-[#f9f9f9] overflow-auto top-[79px] left-[20px] rounded-md w-[96vw] ">
      <h2 className="uppercase relative text-[17px] font-bold headline">
        My Expense Manager
      </h2>
      <button
        onClick={() => setShowCreateModal(true)}
        className="bg-[#15ad4f] new-expense text-white text-sm absolute p-[4px] px-3 top-[19px] right-[34%] rounded-md "
      >
        + New Expense
      </button>
      <ExpenseTable
        expenses={expenses}
        onDeleteExpense={handleDeleteExpense}
        onUpdateExpense={handleUpdateExpense}
        onEditButtonClick={handleEditButtonClick}
      />

      {showCreateModal && (
        <CreateExpense
          onCreateExpense={handleCreateExpense}
          onClose={() => setShowCreateModal(false)}
        />
      )}
      <div></div>
    </div>
  );
};

export default ViewExpence;
