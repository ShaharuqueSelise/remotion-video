import { Img } from "remotion";
import type { AgentConfig } from "../index";

type PersistentBannerProps = {
  agent: AgentConfig;
};

export const PersistentBanner: React.FC<PersistentBannerProps> = ({ agent }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 110,
        background: "rgba(6, 13, 23, 0.88)",
        borderTop: `2px solid ${agent.accentColor}`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "0 42px",
      }}
    >
      {agent.logoUrl ? (
        <Img
          src={agent.logoUrl}
          style={{ width: 140, height: 56, objectFit: "contain", objectPosition: "left" }}
        />
      ) : null}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ color: "white", fontSize: 24, fontWeight: 700 }}>{agent.name}</span>
        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 18 }}>{agent.brokerage}</span>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", gap: 22 }}>
        {agent.phone ? (
          <span style={{ color: agent.accentColor, fontSize: 22, fontWeight: 600 }}>{agent.phone}</span>
        ) : null}
        {agent.email ? (
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 20 }}>{agent.email}</span>
        ) : null}
      </div>
    </div>
  );
};
