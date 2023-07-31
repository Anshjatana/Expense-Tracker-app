import React from "react";
import ViewExpense from "./Components/ViewExpence";
import "./index.css";

const App = () => {
  const divStyle = {
    background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(1,59,61,1) 100%)",
  };
  return (
    <div>
      <h1
        style={divStyle}
        className="uppercase App-title text-2xl text-white text-center p-4 font-bold bg-[aliceblue]"
      >
        Expense Tracker App
      </h1>
      <ViewExpense />
    </div>
  );
};

export default App;
