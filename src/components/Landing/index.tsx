import { useEffect, useState } from "react";
import { useDuneStatus } from "../../hooks/useDune";
import { DuneResults } from "../Results";
import { duneFetcher } from "../../utils/dune";
import etheye from "./images/etheye.gif";
import wizard from "./images/wizard.png";
import dune from "./images/dune.png";
import charts from "./images/charts.gif";

import Image from "next/image";

// TODO - Add more features
export const DUNEQUERY = 1532819;

export const Landing = () => {
  const [executionId, setExecutionId] = useState<string>();
  const [duneStatus, setDuneStatus] = useState(true);
  const [duneQ, setDuneQ] = useState(false);

  async function startQuery() {
    setDuneQ(true);
    const response = await duneFetcher(DUNEQUERY);
    setExecutionId(response.execution_id);
    console.log("done query");
  }
  const { data: duneS } = useDuneStatus(executionId || "", duneStatus);
  useEffect(() => {
    if (executionId) {
      console.log(duneS?.state, "state");
      if (duneS?.state == "QUERY_STATE_COMPLETED") {
        console.log("completed query");
        setDuneStatus(false);
      }
    }
  }, [duneS, executionId]);

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.2)",
        minHeight: "100vh",
        paddingTop: "100px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image alt={"eye"} src={wizard} height={200} width={200} />
        <Image alt={"eye"} src={etheye} height={200} width={200} />
        <Image alt={"eye"} src={charts} height={200} width={200} />
      </div>
      <div
        style={{
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 220px 40px",
          borderRadius: "20px",
          backgroundColor: "white",
        }}
      >
        <h3
          style={{
            fontFamily: "sans-serif",
            justifyContent: "center",
            paddingTop: "20px",
            alignSelf: "center",
            display: "flex",
          }}
        >
          BUILD MODELS TO PREDICT ETH PRICES
        </h3>
        <div
          style={{
            fontFamily: "sans-serif",
            justifyContent: "center",
            display: "flex",
            alignContent: "center",
          }}
        >
          <button
            onClick={startQuery}
            disabled={duneQ}
            style={{
              border: "0.5px solid gray",
              borderRadius: "3px",
              padding: "10px",
              paddingLeft: "20px",
              paddingRight: "20px",
              margin: "20px",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            {!duneQ
              ? "Run Query"
              : executionId
              ? "Query Results Fetched. Cleaning the data."
              : "Running Query....."}
          </button>
        </div>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "10px",
          }}
        >
          Powered by{" "}
          <Image
            alt={"dune"}
            width={20}
            height={20}
            src={dune}
            style={{ paddingLeft: "10px", paddingRight: "10px" }}
          />{" "}
          API.
        </p>
        {executionId && <DuneResults executionId={executionId} />}
      </div>
    </div>
  );
};
