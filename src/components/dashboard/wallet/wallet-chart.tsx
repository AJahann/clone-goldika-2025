"use client";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const panelChartData = [
  {
    میانگین: "1",
    ماه: "۱۴۰۳",
  },
  {
    میانگین: "1",
    ماه: "فروردین",
  },
  {
    میانگین: "1",
    ماه: "۱۴۰۴",
  },
];

const WalletChart = ({ hasWallet }: { hasWallet: boolean }) => {
  if (hasWallet) {
    panelChartData[2]["میانگین"] = "2";
  } else {
    panelChartData[2]["میانگین"] = "1";
  }
  const data = panelChartData;

  return (
    <ResponsiveContainer height={160} width="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: -30,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="5%"
              stopColor="rgba(241, 171, 31, 0.73)"
              stopOpacity={0.7}
            />
            <stop
              offset="95%"
              stopColor="rgba(241, 171, 31, 0)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="ماه" tick={{ fill: "#f2f2f3" }} />
        <YAxis style={{ display: "none" }} domain={[0, 1.5]} />
        <Area
          dataKey="میانگین"
          fill="url(#colorUv)"
          fillOpacity={1}
          type="linear"
          stroke="#f1ab1f"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default WalletChart;
