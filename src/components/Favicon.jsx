export default function Favicon({ className = "", size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M150 30L255.311 90V210L150 270L44.6891 210V90L150 30Z"
        fill="currentColor"
        className="text-emerald-500"
      />
      <path
        d="M150 30L255.311 90L150 150L44.6891 90L150 30Z"
        fill="currentColor"
        className="text-emerald-400"
      />
      <path
        d="M44.6891 90L150 150V270L44.6891 210V90Z"
        fill="currentColor"
        className="text-emerald-700"
      />
      <path
        d="M255.311 90L150 150V270L255.311 210V90Z"
        fill="currentColor"
        className="text-emerald-600"
      />
    </svg>
  );
}
