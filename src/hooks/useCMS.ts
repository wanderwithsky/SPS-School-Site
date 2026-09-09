import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchSiteSettings,
  updateSiteSettings,
  fetchPageSection,
  savePageSection,
  fetchTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  fetchAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  fetchFeeTiers,
  createFeeTier,
  updateFeeTier,
  deleteFeeTier,
  fetchNotices,
  createNotice,
  updateNotice,
  deleteNotice,
  fetchAdmissionEnquiries,
  createAdmissionEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
} from "@/lib/cms-service";
import {
  SiteSettings,
  TeacherItem,
  AchievementItem,
  FeeTierItem,
  NoticeItem,
  AdmissionEnquiryItem,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_TEACHERS,
  DEFAULT_ACHIEVEMENTS,
  DEFAULT_FEE_TIERS,
  DEFAULT_NOTICES,
} from "@/lib/cms-types";

// Setup global Supabase Realtime Listener to invalidate React Query cache on changes
let isRealtimeSubscribed = false;

export function useRealtimeCMS() {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof window === "undefined" || isRealtimeSubscribed) return;
    isRealtimeSubscribed = true;

    try {
      const channel = supabase
        .channel("sps-cms-realtime-global")
        .on("postgres_changes", { event: "*", schema: "public", table: "site_settings" }, () => {
          queryClient.invalidateQueries({ queryKey: ["site_settings"] });
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "page_sections" }, () => {
          queryClient.invalidateQueries({ queryKey: ["page_sections"] });
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "teachers" }, () => {
          queryClient.invalidateQueries({ queryKey: ["teachers"] });
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "achievements" }, () => {
          queryClient.invalidateQueries({ queryKey: ["achievements"] });
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "fee_tiers" }, () => {
          queryClient.invalidateQueries({ queryKey: ["fee_tiers"] });
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "notices_events" }, () => {
          queryClient.invalidateQueries({ queryKey: ["notices"] });
        })
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "admission_enquiries" },
          () => {
            queryClient.invalidateQueries({ queryKey: ["admission_enquiries"] });
          },
        );

      channel.subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          console.debug("Realtime subscription inactive or pending database sync");
        }
      });
    } catch (err) {
      console.debug("Realtime subscription fallback:", err);
    }
  }, [queryClient]);
}

// ---------------- Site Settings Hook ----------------
export function useSiteSettings() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["site_settings"],
    queryFn: fetchSiteSettings,
    initialData: DEFAULT_SITE_SETTINGS,
    staleTime: 1000 * 60 * 5, // 5 mins
  });

  const mutation = useMutation({
    mutationFn: (updated: Partial<SiteSettings>) => updateSiteSettings(updated),
    onSuccess: (data) => {
      queryClient.setQueryData(["site_settings"], data);
      queryClient.invalidateQueries({ queryKey: ["site_settings"] });
    },
  });

  return { ...query, updateSettings: mutation.mutateAsync, isUpdating: mutation.isPending };
}

// ---------------- Page Sections Hook ----------------
export function usePageSection<T = unknown>(pageKey: string, sectionKey: string, fallback: T) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["page_sections", pageKey, sectionKey],
    queryFn: () => fetchPageSection<T>(pageKey, sectionKey, fallback),
    initialData: fallback,
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: ({ content, title }: { content: T; title?: string }) =>
      savePageSection(pageKey, sectionKey, content, title),
    onSuccess: (data) => {
      queryClient.setQueryData(["page_sections", pageKey, sectionKey], data);
      queryClient.invalidateQueries({ queryKey: ["page_sections"] });
    },
  });

  return {
    data: (query.data as T) || fallback,
    isLoading: query.isLoading,
    saveSection: (content: T, title?: string) =>
      mutation.mutateAsync({ content, ...(title !== undefined ? { title } : {}) }),
    isSaving: mutation.isPending,
  };
}

// ---------------- Teachers Hook ----------------
export function useTeachersCMS() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
    initialData: DEFAULT_TEACHERS,
    staleTime: 1000 * 60 * 5,
  });

  const addMutation = useMutation({
    mutationFn: (teacher: Omit<TeacherItem, "id">) => createTeacher(teacher),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teachers"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<TeacherItem> }) =>
      updateTeacher(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teachers"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTeacher(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teachers"] }),
  });

  return {
    teachers: query.data || DEFAULT_TEACHERS,
    isLoading: query.isLoading,
    addTeacher: addMutation.mutateAsync,
    updateTeacher: updateMutation.mutateAsync,
    deleteTeacher: deleteMutation.mutateAsync,
    isSaving: addMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
}

// ---------------- Achievements Hook ----------------
export function useAchievementsCMS() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["achievements"],
    queryFn: fetchAchievements,
    initialData: DEFAULT_ACHIEVEMENTS,
    staleTime: 1000 * 60 * 5,
  });

  const addMutation = useMutation({
    mutationFn: (item: Omit<AchievementItem, "id">) => createAchievement(item),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["achievements"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<AchievementItem> }) =>
      updateAchievement(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["achievements"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAchievement(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["achievements"] }),
  });

  return {
    achievements: query.data || DEFAULT_ACHIEVEMENTS,
    isLoading: query.isLoading,
    addAchievement: addMutation.mutateAsync,
    updateAchievement: updateMutation.mutateAsync,
    deleteAchievement: deleteMutation.mutateAsync,
    isSaving: addMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
}

// ---------------- Fee Structure Hook ----------------
export function useFeeStructureCMS() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["fee_tiers"],
    queryFn: fetchFeeTiers,
    initialData: DEFAULT_FEE_TIERS,
    staleTime: 1000 * 60 * 5,
  });

  const addMutation = useMutation({
    mutationFn: (item: Omit<FeeTierItem, "id">) => createFeeTier(item),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["fee_tiers"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<FeeTierItem> }) =>
      updateFeeTier(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["fee_tiers"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFeeTier(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["fee_tiers"] }),
  });

  return {
    feeTiers: query.data || DEFAULT_FEE_TIERS,
    isLoading: query.isLoading,
    addFeeTier: addMutation.mutateAsync,
    updateFeeTier: updateMutation.mutateAsync,
    deleteFeeTier: deleteMutation.mutateAsync,
    isSaving: addMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
}

// ---------------- Notices Hook ----------------
export function useNoticesCMS() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["notices"],
    queryFn: fetchNotices,
    initialData: DEFAULT_NOTICES,
    staleTime: 1000 * 60 * 5,
  });

  const addMutation = useMutation({
    mutationFn: (item: Omit<NoticeItem, "id">) => createNotice(item),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notices"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<NoticeItem> }) =>
      updateNotice(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notices"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNotice(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notices"] }),
  });

  return {
    notices: query.data || DEFAULT_NOTICES,
    isLoading: query.isLoading,
    addNotice: addMutation.mutateAsync,
    updateNotice: updateMutation.mutateAsync,
    deleteNotice: deleteMutation.mutateAsync,
    isSaving: addMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
}

// ---------------- Admission Enquiries Hook ----------------
export function useAdmissionEnquiriesCMS() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admission_enquiries"],
    queryFn: fetchAdmissionEnquiries,
    staleTime: 1000 * 30,
  });

  const addMutation = useMutation({
    mutationFn: (
      item: Omit<AdmissionEnquiryItem, "id" | "created_at" | "status"> & {
        status?: AdmissionEnquiryItem["status"];
      },
    ) => createAdmissionEnquiry(item),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admission_enquiries"] }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: AdmissionEnquiryItem["status"] }) =>
      updateEnquiryStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admission_enquiries"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteEnquiry(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admission_enquiries"] }),
  });

  return {
    enquiries: query.data || [],
    isLoading: query.isLoading,
    createEnquiry: addMutation.mutateAsync,
    updateStatus: updateStatusMutation.mutateAsync,
    deleteEnquiry: deleteMutation.mutateAsync,
    isUpdating: addMutation.isPending || updateStatusMutation.isPending || deleteMutation.isPending,
  };
}
