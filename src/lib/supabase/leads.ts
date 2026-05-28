import { supabase } from "@/lib/supabase/client";
import type { LeadRecord, LeadSource, LeadStatus } from "@/types/domain";

type LeadInsertInput = Omit<LeadRecord, "id" | "createdat" | "updatedat" | "status"> & {
  status?: LeadStatus;
};

export const createLead = async (input: LeadInsertInput): Promise<LeadRecord> => {
  const { data, error } = await supabase
    .from("Lead")
    .insert({ ...input, status: input.status ?? "new" })
    .select("*")
    .single();
  if (error) throw error;
  return data as LeadRecord;
};

export const fetchLeads = async (): Promise<LeadRecord[]> => {
  const { data, error } = await supabase
    .from("Lead")
    .select("*")
    .order("createdat", { ascending: false });
  if (error) throw error;
  return (data ?? []) as LeadRecord[];
};

export const updateLeadStatus = async (id: string, status: LeadStatus): Promise<LeadRecord> => {
  const { data, error } = await supabase
    .from("Lead")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as LeadRecord;
};

export const toLeadSource = (value: string): LeadSource => {
  if (value === "sell") return "sell";
  if (value === "cardetail") return "cardetail";
  return "contact";
};
