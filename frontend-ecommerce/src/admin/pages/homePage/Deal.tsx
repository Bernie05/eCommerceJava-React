import { Button } from "@mui/material";
import React, { useState } from "react";
import DealTable from "./DealTable";
import DealCategoryTable from "./DealCategoryTable";
import CreateDealForm from "./CreateDealForm";

const tabs = [
  {
    tab: "Deals",
    component: <DealTable />
  },
  {
    tab: "Category",
    component: <DealCategoryTable />
  },
  {
    tab: "Create Deal",
    component: <CreateDealForm />
  }
];

const Deal = () => {
  const [activeTab, setActiveTab] = useState('Deals');

  const getActiveDeal = () => {
    return tabs.find((tabDtl) => tabDtl.tab === activeTab);
  }

  return (
    <div>
      <div className="flex gap-4">
        {tabs.map(({ tab }) => (
          <Button 
            variant={activeTab === tab ? "contained" : "outlined"}
            onClick={() => setActiveTab(tab)}
            >
            {tab}
          </Button>
        ))}
      </div>
        <div className="mt-5">
          {getActiveDeal()?.component}
        </div>
    </div>
  );
};

export default Deal;
