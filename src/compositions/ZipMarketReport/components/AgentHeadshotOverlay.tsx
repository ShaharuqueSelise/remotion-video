import { Img } from "remotion";

type AgentHeadshotOverlayProps = {
  headshotUrl?: string;
};

export const AgentHeadshotOverlay: React.FC<AgentHeadshotOverlayProps> = ({ headshotUrl }) => {
  if (!headshotUrl) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        right: 42,
        bottom: 132,
        width: 138,
        height: 138,
        borderRadius: "50%",
        border: "5px solid #fff",
        overflow: "hidden",
        background: "#121c2d",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      <Img src={headshotUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
};
