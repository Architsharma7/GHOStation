import React from "react";
import AllClaimsTable from "./claim-history-table";

export default function ALLClaims() {
  return (
    <div className="py-4 min-h-screen">
      <div className=" gap-5 flex-col flex items-start justify-between">
        <h1 className=" text-xl font-semibold tracking-wide">
          Premium Histroy
        </h1>
        <AllClaimsTable />
      </div>
    </div>
  );
}
