import VenueList from "@/components/venue-list";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Venue Tracker</h1>
        <VenueList />
      </main>
    </div>
  );
}
