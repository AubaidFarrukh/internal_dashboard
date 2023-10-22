import { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomChartTooltip } from "./customChartTooltip";
import { NoChartData } from "./noChartData";
import { LoadingContent } from "../loadingContent";
import { barColors as _barColors } from "./chartConstants";
import type { TBar } from "./types";

export interface CustomBarChartProps {
  bars: TBar[];
  type: "pickers" | "drivers";
  isLoading?: boolean;
  height?: number;
  xLabel?: string;
  reverseBarColors?: boolean;
}

export const CustomBarChart: FC<CustomBarChartProps> = ({
  bars,
  type,
  isLoading,
  height,
  xLabel,
  reverseBarColors = false,
}) => {
  const barColors = reverseBarColors ? [..._barColors].reverse() : _barColors;

  const sortedBars = [...bars].sort(
    (a, b) => (a[a.dataKey] as number) - (b[b.dataKey] as number)
  );
  const maxTimeUser = sortedBars.length ? sortedBars.slice(-1)[0] : null;
  const maxTime = maxTimeUser
    ? Math.ceil((maxTimeUser[maxTimeUser.dataKey] as number) / 10) * 10
    : 50;
  const xDomain = [0, maxTime];
  const xTicks =
    maxTime <= 10
      ? Array.from({ length: maxTime / 2 + 1 }, (_, i) => i * 2)
      : maxTime <= 20
      ? Array.from({ length: maxTime / 4 + 1 }, (_, i) => i * 4)
      : maxTime <= 60
      ? Array.from({ length: maxTime / 5 + 1 }, (_, i) => i * 5)
      : Array.from({ length: maxTime / 10 + 1 }, (_, i) => i * 10);

  if (isLoading) {
    return <LoadingContent />;
  }

  if (!bars.length) {
    return <NoChartData />;
  }

  return (
    <ResponsiveContainer height={height ?? 420}>
      <BarChart
        data={bars}
        layout="vertical"
        barSize={20}
        margin={{ top: 10, right: 30, left: 24, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="5" horizontal={false} />
        <XAxis
          type="number"
          height={80}
          interval="preserveEnd"
          domain={xDomain}
          ticks={xTicks}
          axisLine={false}
          tickLine={false}
          style={{ fontWeight: 500 }}
        >
          <Label value={xLabel} style={{ fontWeight: 500 }} />
        </XAxis>
        <YAxis
          type="category"
          width={120}
          dataKey="name"
          axisLine={false}
          tickLine={false}
          style={{ fontWeight: 500 }}
        />
        <Tooltip content={<CustomChartTooltip type={type} />} />
        {bars.map((b, index) => (
          <Bar
            key={b.name}
            dataKey={b.dataKey}
            stackId="a"
            fill={barColors[index % barColors.length]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
