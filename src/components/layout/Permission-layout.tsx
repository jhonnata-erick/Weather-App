export function PermissionLayout({
  setPermited,
}: {
  setPermited: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <main>
      <h1>Where do you want to see the weather?</h1>
      <p>Use your location or search one</p>
      <button
        onClick={() => {
          setPermited(true);
        }}
      >
        <p>Use my location</p>
        <p>You let us to access your location to show you the weather</p>
      </button>
      <button>
        <p>Search a location</p>
        <p>Search and chose a location to see the weather</p>
      </button>
    </main>
  );
}
