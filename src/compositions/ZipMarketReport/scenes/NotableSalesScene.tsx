import { AbsoluteFill, Img } from "remotion";
import type { NotableSaleItem, ZipMarketReportProps } from "../index";
import { PersistentBanner } from "../components/PersistentBanner";

const labelByVariant: Record<ZipMarketReportProps["notableSalesVariant"], string> = {
  notable: "Notable Sales",
  hot_listing: "Hot Listing",
  mixed: "Notable Sales & Hot Listing",
};

export const NotableSalesScene: React.FC<ZipMarketReportProps> = ({
  notableSalesVariant,
  notableSalesItems,
  agent,
}) => {
  const firstThree = notableSalesItems.slice(0, 3);
  return (
    <AbsoluteFill style={{ background: "#0b1423", color: "white", padding: "92px 82px" }}>
      <div style={{ color: agent.accentColor, fontSize: 24, textTransform: "uppercase", letterSpacing: 2 }}>
        {labelByVariant[notableSalesVariant]}
      </div>
      <div style={{ display: "flex", gap: 26, marginTop: 28 }}>
        {firstThree.map((item, idx) => (
          <SaleCard key={`${item.address}-${idx}`} item={item} />
        ))}
      </div>
      <PersistentBanner agent={agent} />
    </AbsoluteFill>
  );
};

const SaleCard: React.FC<{ item: NotableSaleItem }> = ({ item }) => {
  return (
    <div
      style={{
        flex: 1,
        background: "rgba(255,255,255,0.06)",
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {item.imageUrl ? (
        <Img src={item.imageUrl} style={{ width: "100%", height: 300, objectFit: "cover" }} />
      ) : (
        <div style={{ width: "100%", height: 300, background: "#1e2e44" }} />
      )}
      <div style={{ padding: "18px 20px 22px" }}>
        <div style={{ fontSize: 20, opacity: 0.82 }}>{item.address}</div>
        <div style={{ fontSize: 36, fontWeight: 700, marginTop: 8 }}>{item.priceLabel}</div>
        {item.bedsBaths ? <div style={{ marginTop: 8, fontSize: 20, opacity: 0.82 }}>{item.bedsBaths}</div> : null}
      </div>
    </div>
  );
};
