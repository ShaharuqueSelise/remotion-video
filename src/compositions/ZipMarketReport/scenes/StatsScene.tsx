import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import type { ZipMarketReportProps } from "../index";

const StatCard = ({
  label, value, change, delay, accentColor
}: { label: string; value: string; change: number; delay: number; accentColor: string }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [delay, delay + 20], [30, 0], { extrapolateRight: "clamp" });
  const isPositive = change >= 0;

  return (
    <div style={{
      opacity, transform: `translateY(${y}px)`,
      background: "rgba(255,255,255,0.07)",
      borderRadius: 16, padding: "36px 40px",
      borderLeft: `4px solid ${accentColor}`,
    }}>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 2 }}>
        {label}
      </p>
      <p style={{ color: "white", fontSize: 52, fontWeight: 700, margin: "0 0 12px" }}>
        {value}
      </p>
      <p style={{ color: isPositive ? "#4ade80" : "#f87171", fontSize: 20, margin: 0, fontWeight: 600 }}>
        {isPositive ? "▲" : "▼"} {Math.abs(change)}% vs last month
      </p>
    </div>
  );
};

export const StatsScene = ({ stats, agent, cityName }: ZipMarketReportProps) => {
  return (
    <AbsoluteFill style={{ background: "#0f1923", padding: "80px 120px" }}>
      <h2 style={{ color: "white", fontSize: 40, margin: "0 0 48px", fontWeight: 400 }}>
        {cityName} — Key Market Stats
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <StatCard
          label="Median Price" delay={0}
          value={`$${(stats.medianPrice / 1000).toFixed(0)}K`}
          change={stats.medianPriceChange}
          accentColor={agent.accentColor}
        />
        <StatCard
          label="Days on Market" delay={15}
          value={`${stats.daysOnMarket}`}
          change={stats.daysOnMarketChange}
          accentColor={agent.accentColor}
        />
        <StatCard
          label="Active Listings" delay={30}
          value={`${stats.activeListings}`}
          change={stats.activeListingsChange}
          accentColor={agent.accentColor}
        />
        <StatCard
          label="Homes Sold" delay={45}
          value={`${stats.soldHomes}`}
          change={stats.soldHomesChange}
          accentColor={agent.accentColor}
        />
      </div>
    </AbsoluteFill>
  );
};