import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Bypass internal types for the default icon fix
const Leaflet = L as any;

if (Leaflet.Icon && Leaflet.Icon.Default) {
  delete Leaflet.Icon.Default.prototype._getIconUrl;

  Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

export default L;