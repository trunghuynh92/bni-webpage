import Link from "next/link";

interface Resource {
  label: string;
  href: string;
}

interface ResourceGridProps {
  columns?: number;
  heading?: string;
  resources: Resource[];
}

export default function ResourceGrid({
  columns = 3,
  heading,
  resources,
}: ResourceGridProps) {
  const gridColsClass: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="w-full">
      {heading && (
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-bni-red inline-block shrink-0 animate-pulse-glow" />
            {heading}
          </h2>
          <div className="mt-3 h-[2px] w-16 bg-gradient-to-r from-bni-red to-transparent rounded-full" />
        </div>
      )}
      <div
        className={`grid gap-4 ${gridColsClass[columns] ?? gridColsClass[3]}`}
      >
        {resources.map((resource, i) => (
          <Link
            key={resource.label}
            href={resource.href}
            className="group relative block bg-bni-dark rounded-xl p-5 border-l-4 border-transparent hover:border-bni-red transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25 ring-1 ring-white/5 hover:ring-white/10 overflow-hidden"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-bni-red/0 to-bni-red/0 group-hover:from-bni-red/5 group-hover:to-transparent transition-all duration-300 rounded-xl" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-bni-gray/50 group-hover:bg-bni-red group-hover:shadow-[0_0_8px_rgba(204,0,0,0.4)] transition-all duration-300" />
                <span className="text-white font-medium text-sm group-hover:text-white transition-colors duration-200">
                  {resource.label}
                </span>
              </div>
              <span className="text-bni-gray opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-0">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
