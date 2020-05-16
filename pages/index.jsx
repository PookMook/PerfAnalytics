import React from "react";
import useSWR from "swr";

import Metric from "components/metric";

const fetcher = (url) => fetch(url).then((r) => r.json());
const initialData = {
  data: {
    allMetrics: {
      data: [],
    },
  },
};

export default function EntryPoint() {
  const { data, error } = useSWR("/api/perf", fetcher, { initialData });
  return (
    <>
      <ul>
        <li>CLS - Cumulative Layout Shift</li>
        <li>FID - First Input Delay</li>
        <li>LCP - Largest Contenful Paint</li>
        <li>NextJs Hydratation - Javascript ready</li>
        <li>TTFB - Time to first Byte</li>
      </ul>
      <h2>Data below</h2>
      {error ? (
        <p>Error: {error.toString()}</p>
      ) : (
        data.data.allMetrics.data
          .reverse()
          .map((m) => <Metric {...m} key={m.id} />)
      )}
    </>
  );
}
