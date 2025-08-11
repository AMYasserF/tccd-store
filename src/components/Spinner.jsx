function Spinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <svg
        className="animate-spin"
        width={40}
        height={40}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="10" stroke="#e5e7eb" strokeWidth="4" />
        <path
          d="M22 12a10 10 0 00-10-10"
          stroke="#0b74ff"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
export default Spinner;
