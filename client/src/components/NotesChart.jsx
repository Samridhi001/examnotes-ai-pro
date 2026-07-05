import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export function NotesChart({ charts = [] }) {
  const chart = charts[0];

  if (!chart || !Array.isArray(chart.data) || chart.data.length === 0) {
    return null;
  }

  return (
    <div className="chart-view">
      <h3>{chart.title || "Study Chart"}</h3>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chart.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}