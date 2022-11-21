import { useEffect, useState } from "react";
import Image from "next/image";
import { useDuneResults } from "../../hooks/useDune";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ZAxis,
} from "recharts";
import { Sequential } from "../Models/Linear";
import eth from "../../../public/eth.gif";

export type Response = {
  price: number;
  usdvolume: number;
  priceChange: number;
  volumeChange: number;
  time: any;
};
export const optionsTrain = {
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  showTitle: false,
  title: "train",
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
};

export const DuneResults = ({ executionId }: { executionId: string }) => {
  const { data: DunePriceResults } = useDuneResults(executionId);
  const [priceInfo, setPriceInfo] = useState<Response[]>();
  const [disabledB, setDisabledB] = useState(false);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    if (DunePriceResults?.result) {
      const info: Response[] = DunePriceResults.result.rows;
      if (info) {
        const cleaned: Response[] = [];
        for (let i: number = 1; i < info.length; i++) {
          const t: Response | undefined = info.at(i);
          const t2: Response | undefined = info.at(i - 1);

          if (t !== undefined && t2 !== undefined) {
            cleaned.push({
              price: t.price,
              priceChange: t2.price - t.price,
              usdvolume: t2.usdvolume,
              time: t2.time,
              volumeChange: t2.usdvolume - t.usdvolume,
            });
          }
        }
        console.log(cleaned, "Cleaned Data");
        setPriceInfo(cleaned);
        setDisabledB(true);
      }
    }
    console.log("No Data", DunePriceResults?.state);
  }, [DunePriceResults]);

  const [chart, setChart] = useState<pts>();
  const [chart2, setChart2] = useState<pts>();

  const handleScatter = async () => {
    setFetching(true);
    console.log("Model is waiting to be trained.");
    if (priceInfo !== undefined) {
      console.log("Model will begin training.");

      const { original: originalPts, predicted: predictedPts } =
        await Sequential({ data: priceInfo });
      setChart(originalPts as pts);
      setChart2(predictedPts as pts);
      console.log("pts");
    }
  };
  if (priceInfo === undefined) {
    return (
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Image alt={"loading"} height={90} width={90} src={eth} />
      </div>
    );
  } else if (chart === undefined) {
    return (
      <>
        <h3
          style={{
            fontFamily: "sans-serif",
            justifyContent: "center",
            display: "flex",
            paddingTop: "20px",
          }}
        >
          TRAIN MODEL WITH YOUR RESULTS
        </h3>
        <div
          style={{
            fontFamily: "sans-serif",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <button
            disabled={fetching}
            onClick={handleScatter}
            style={{
              border: "0.5px solid gray",
              borderRadius: "3px",
              padding: "10px",
              paddingLeft: "20px",
              paddingRight: "20px",
              margin: "20px",
              backgroundColor: "white",
            }}
          >
            {fetching ? "Training...." : chart ? "Model Trained " : "Train"}
          </button>
        </div>
        {fetching && (
          <div style={{ justifyContent: "center", display: "flex" }}>
            <Image alt={"loading"} height={90} width={90} src={eth} />
          </div>
        )}
      </>
    );
  } else {
    return (
      <div
        style={{
          justifyContent: "center",
          justifyItems: "center",
          display: "block",
        }}
      >
        <h3
          style={{
            fontFamily: "sans-serif",
            justifyContent: "center",
            display: "flex",
            paddingTop: "20px",
          }}
        >
          TRAIN MODEL WITH YOUR RESULTS
        </h3>
        <div
          style={{
            fontFamily: "sans-serif",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <button
            disabled={true}
            onClick={handleScatter}
            style={{
              border: "0.5px solid gray",
              borderRadius: "3px",
              padding: "10px",
              paddingLeft: "20px",
              paddingRight: "20px",
              margin: "20px",
              backgroundColor: "white",
            }}
          >
            {"Model Trained "}
          </button>
        </div>
        <div style={{ paddingBottom: "50px" }}>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <Image alt={"loading"} height={90} width={90} src={eth} />
          </div>
          {chart && (
            <div style={{ display: "block", justifyContent: "center" }}>
              <h5
                style={{
                  fontFamily: "sans-serif",
                  justifyContent: "center",
                  display: "flex",
                  paddingTop: "20px",
                }}
              >
                ETH Price vs. Volume Model Predictions
              </h5>
              <ScatterChart
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                width={800}
                height={350}
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
                title={
                  "Sequential Model Prediction Curve for ETH Price Difference vs. Volume Difference"
                }
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Volume Difference"
                  unit=" dollars"
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Price Difference"
                  unit=" dollars"
                />
                <Scatter data={chart} fill={"red"} name="Actual Values" />
                <Scatter
                  data={chart2}
                  fill={"gray"}
                  name="Predicted Values"
                  attributeName="Predicted"
                />
                <ZAxis />

                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Legend
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                />
              </ScatterChart>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export type pts = [
  {
    x: number;
    y: number;
  }
];
