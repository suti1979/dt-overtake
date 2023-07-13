export default function Loading() {
  return (
    <div className="h-screen flex flex-col justify-center align-middle">
      <div className="text-red">Loading...</div>
      <div>
        <span className="loading loading-ball loading-xs"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-lg"></span>
      </div>
    </div>
  );
}
