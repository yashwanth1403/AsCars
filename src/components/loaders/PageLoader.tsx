const PageLoader = ({ label = "Loading..." }: { label?: string }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
      </div>
      <p className="text-sm font-medium text-muted-foreground animate-pulse">{label}</p>
    </div>
  );
};

export default PageLoader;
