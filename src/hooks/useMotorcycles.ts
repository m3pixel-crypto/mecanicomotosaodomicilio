import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Motorcycle {
  id: string;
  user_id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  current_km: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceRecord {
  id: string;
  motorcycle_id: string;
  service_date: string;
  service_description: string;
  km_at_service: number;
  source: "oficina" | "cliente";
  created_at: string;
}

export const useMotorcycles = () => {
  const { user } = useAuth();
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMotorcycles = async () => {
    if (!user) {
      setMotorcycles([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("motorcycles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMotorcycles(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMotorcycles();
  }, [user]);

  const addMotorcycle = async (
    motorcycle: Omit<Motorcycle, "id" | "user_id" | "created_at" | "updated_at">
  ) => {
    if (!user) return { error: new Error("Not authenticated") };

    const { data, error } = await supabase
      .from("motorcycles")
      .insert({
        ...motorcycle,
        user_id: user.id,
      })
      .select()
      .single();

    if (!error && data) {
      setMotorcycles((prev) => [data, ...prev]);
    }
    return { data, error };
  };

  const updateMotorcycle = async (
    id: string,
    updates: Partial<Omit<Motorcycle, "id" | "user_id" | "created_at" | "updated_at">>
  ) => {
    const { data, error } = await supabase
      .from("motorcycles")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (!error && data) {
      setMotorcycles((prev) =>
        prev.map((m) => (m.id === id ? data : m))
      );
    }
    return { data, error };
  };

  const deleteMotorcycle = async (id: string) => {
    const { error } = await supabase.from("motorcycles").delete().eq("id", id);

    if (!error) {
      setMotorcycles((prev) => prev.filter((m) => m.id !== id));
    }
    return { error };
  };

  return {
    motorcycles,
    loading,
    error,
    addMotorcycle,
    updateMotorcycle,
    deleteMotorcycle,
    refetch: fetchMotorcycles,
  };
};

export const useServiceHistory = (motorcycleId: string | null) => {
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    if (!motorcycleId) {
      setServices([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("service_history")
        .select("*")
        .eq("motorcycle_id", motorcycleId)
        .order("service_date", { ascending: false });

      if (error) throw error;
      setServices((data as ServiceRecord[]) || []);
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [motorcycleId]);

  const addService = async (
    service: Omit<ServiceRecord, "id" | "created_at">
  ) => {
    const { data, error } = await supabase
      .from("service_history")
      .insert(service)
      .select()
      .single();

    if (!error && data) {
      setServices((prev) => [data as ServiceRecord, ...prev]);
    }
    return { data, error };
  };

  const deleteService = async (id: string) => {
    const { error } = await supabase.from("service_history").delete().eq("id", id);

    if (!error) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
    return { error };
  };

  return {
    services,
    loading,
    addService,
    deleteService,
    refetch: fetchServices,
  };
};
