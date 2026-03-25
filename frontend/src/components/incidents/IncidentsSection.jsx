import StatCard       from "../ui/StatCard";
import IncidentDetect from "./IncidentDetect";
import IncidentTable  from "./IncidentTable";
import { useIncidents } from "../../hooks/useIncidents";

export default function IncidentsSection({ toast }) {
  const { incidents, found, looking, detectByOrderId } = useIncidents(toast);

  const critical = incidents.filter(i => (i.severity || "").toLowerCase() === "critical").length;
  const high     = incidents.filter(i => (i.severity || "").toLowerCase() === "high").length;
  const other    = incidents.length - critical - high;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Incidents" value={incidents.length} accent="rose"    />
        <StatCard label="Critical"        value={critical}         accent="rose"    />
        <StatCard label="High"            value={high}             accent="amber"   />
        <StatCard label="Low / Medium"    value={other}            accent="emerald" />
      </div>

      <IncidentDetect
        onDetect={detectByOrderId}
        looking={looking}
        found={found}
      />

      <IncidentTable incidents={incidents} />
    </div>
  );
}