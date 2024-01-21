import React from "react";
import AllClaimsTable from "./claim-history-table";

export default function ALLClaims() {
  return (
    <div className="py-4 min-h-screen">
      <div className=" gap-5 flex-col flex items-start justify-between">
        <div>
          <h1 className=" text-xl font-semibold tracking-wide">
            Claims History
          </h1>
          <div className=" text-sm mt-1">List of all claims made on GHOSTATION</div>
        </div>
        <AllClaimsTable />
      </div>
    </div>
  );
}
