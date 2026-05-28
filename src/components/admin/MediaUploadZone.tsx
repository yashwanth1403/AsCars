import { useCallback, useRef, useState } from "react";
import { CheckCircle2, ImageIcon, Loader2, Upload, Video, X } from "lucide-react";
import { cn } from "@/lib/utils";

type UploadItem = {
  id: string;
  preview?: string;
  url?: string;
  name: string;
  status: "uploading" | "done" | "error";
};

interface MediaUploadZoneProps {
  type: "image" | "video";
  items: string[];
  onChange: (urls: string[]) => void;
  onUpload: (files: File[]) => Promise<string[]>;
  disabled?: boolean;
}

const MediaUploadZone = ({
  type,
  items,
  onChange,
  onUpload,
  disabled,
}: MediaUploadZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [queue, setQueue] = useState<UploadItem[]>([]);

  const accept = type === "image" ? "image/*" : "video/*";
  const isImage = type === "image";

  const processFiles = useCallback(
    async (files: File[]) => {
      if (!files.length || disabled) return;

      const pending: UploadItem[] = files.map((file) => ({
        id: crypto.randomUUID(),
        preview: isImage ? URL.createObjectURL(file) : undefined,
        name: file.name,
        status: "uploading" as const,
      }));
      setQueue((prev) => [...prev, ...pending]);

      try {
        const urls = await onUpload(files);
        setQueue((prev) =>
          prev.map((item) => {
            const idx = pending.findIndex((p) => p.id === item.id);
            if (idx === -1) return item;
            return { ...item, status: "done" as const, url: urls[idx] };
          }),
        );
        onChange([...items, ...urls]);
        setTimeout(() => {
          setQueue((prev) => prev.filter((q) => !pending.some((p) => p.id === q.id)));
        }, 1200);
      } catch {
        setQueue((prev) =>
          prev.map((item) =>
            pending.some((p) => p.id === item.id) ? { ...item, status: "error" as const } : item,
          ),
        );
      } finally {
        pending.forEach((p) => {
          if (p.preview) URL.revokeObjectURL(p.preview);
        });
      }
    },
    [disabled, isImage, items, onChange, onUpload],
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    void processFiles(Array.from(e.dataTransfer.files).filter((f) =>
      isImage ? f.type.startsWith("image/") : f.type.startsWith("video/"),
    ));
  };

  const removeItem = (url: string) => onChange(items.filter((u) => u !== url));

  const allPreviews = [
    ...items.map((url) => ({ id: url, url, name: "Uploaded", status: "done" as const })),
    ...queue.filter((q) => q.status !== "done" || !q.url || !items.includes(q.url)),
  ];

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "group relative cursor-pointer rounded-2xl border-2 border-dashed p-6 transition-all duration-300",
          dragOver
            ? "border-secondary bg-secondary/5 scale-[1.01]"
            : "border-border/80 bg-gradient-to-br from-muted/40 to-background hover:border-primary/40 hover:bg-muted/30",
          disabled && "pointer-events-none opacity-60",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={(e) => {
            void processFiles(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
        />
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl transition-colors",
              dragOver ? "bg-secondary text-secondary-foreground" : "bg-primary/10 text-primary",
            )}
          >
            {isImage ? <ImageIcon className="h-7 w-7" /> : <Video className="h-7 w-7" />}
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {isImage ? "Drop car photos here" : "Drop walkthrough videos here"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              or tap to browse · multiple files supported
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
            <Upload className="h-3.5 w-3.5" />
            Choose files
          </span>
        </div>
        {dragOver && (
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-secondary/50 ring-offset-2" />
        )}
      </div>

      {allPreviews.length > 0 && (
        <div
          className={cn(
            "grid gap-2",
            isImage ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1",
          )}
        >
          {allPreviews.map((item) => (
            <div
              key={item.id}
              className={cn(
                "relative overflow-hidden rounded-xl border bg-card shadow-sm",
                item.status === "uploading" && "admin-upload-pulse",
              )}
            >
              {isImage ? (
                <div className="aspect-[4/3] bg-muted">
                  {(item as UploadItem).preview || item.url ? (
                    <img
                      src={(item as UploadItem).preview || item.url}
                      alt=""
                      className={cn(
                        "h-full w-full object-cover",
                        item.status === "uploading" && "opacity-60 blur-[1px]",
                      )}
                    />
                  ) : null}
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Video className="h-5 w-5" />
                  </div>
                  <p className="min-w-0 flex-1 truncate text-xs font-medium">{item.name}</p>
                </div>
              )}

              {item.status === "uploading" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/70 backdrop-blur-sm">
                  <Loader2 className="h-6 w-6 animate-spin text-secondary" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Uploading
                  </span>
                  <div className="h-1 w-2/3 overflow-hidden rounded-full bg-muted">
                    <div className="admin-upload-bar h-full rounded-full bg-secondary" />
                  </div>
                </div>
              )}

              {item.status === "done" && item.url && (
                <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              )}

              {item.status === "error" && (
                <div className="absolute inset-0 flex items-center justify-center bg-destructive/10 text-xs font-semibold text-destructive">
                  Failed
                </div>
              )}

              {item.url && item.status === "done" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.url!);
                  }}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUploadZone;
