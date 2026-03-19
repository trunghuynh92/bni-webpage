import ResourceButton from "@/components/ResourceButton";

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
        <h2 className="text-lg font-bold text-gray-900 mb-4">{heading}</h2>
      )}
      <div className={`grid gap-3 ${gridColsClass[columns] ?? gridColsClass[3]}`}>
        {resources.map((resource) => (
          <ResourceButton
            key={resource.label}
            label={resource.label}
            href={resource.href}
            variant="filled"
          />
        ))}
      </div>
    </section>
  );
}
