import { supabase } from "@/lib/supabase/client";

const getPublicUrl = (bucket: string, path: string): string => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

export const uploadCarImage = async (file: File): Promise<{ path: string; publicUrl: string }> => {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { data, error } = await supabase.storage.from("car-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return {
    path: data.path,
    publicUrl: getPublicUrl("car-images", data.path),
  };
};

export const uploadCarVideo = async (file: File): Promise<{ path: string; publicUrl: string }> => {
  const ext = file.name.split(".").pop() || "mp4";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { data, error } = await supabase.storage.from("car-videos").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return {
    path: data.path,
    publicUrl: getPublicUrl("car-videos", data.path),
  };
};

export const uploadCarImages = async (
  files: File[],
): Promise<Array<{ path: string; publicUrl: string }>> => {
  const uploaded = await Promise.all(files.map((file) => uploadCarImage(file)));
  return uploaded;
};

export const uploadCarVideos = async (
  files: File[],
): Promise<Array<{ path: string; publicUrl: string }>> => {
  const uploaded = await Promise.all(files.map((file) => uploadCarVideo(file)));
  return uploaded;
};
