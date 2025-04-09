import LeafletMap from "../components/LeafletMap";

function StationList() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nearby Charging Stations</h1>
      <LeafletMap />
    </div>
  );
}

export default StationList;
