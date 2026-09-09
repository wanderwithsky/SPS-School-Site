import { supabase } from "@/integrations/supabase/client";
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
  DEFAULT_HERO_CONTENT,
  DEFAULT_WELCOME_CONTENT,
  DEFAULT_WHY_US_ITEMS,
  DEFAULT_FACILITIES_ITEMS,
  DEFAULT_FAQS,
  DEFAULT_TESTIMONIALS,
} from "./cms-types";

// LocalStorage cache helpers for instant load & offline resilience
const isClient = typeof window !== "undefined";
function getLocal<T>(key: string, fallback: T): T {
  if (!isClient) return fallback;
  try {
    const raw = localStorage.getItem(`sps_cms_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function setLocal<T>(key: string, data: T) {
  if (!isClient) return;
  try {
    localStorage.setItem(`sps_cms_${key}`, JSON.stringify(data));
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
}

// ---------------- Site Settings ----------------
export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from("site_settings" as never)
      .select("*")
      .eq("id", "global")
      .maybeSingle();

    if (error || !data) {
      return getLocal<SiteSettings>("site_settings", DEFAULT_SITE_SETTINGS);
    }
    const settings = data as unknown as SiteSettings;
    setLocal("site_settings", settings);
    return settings;
  } catch {
    return getLocal<SiteSettings>("site_settings", DEFAULT_SITE_SETTINGS);
  }
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await fetchSiteSettings();
  const updated = { ...current, ...settings, id: "global" };
  setLocal("site_settings", updated);

  try {
    const { data, error } = await supabase
      .from("site_settings" as never)
      .upsert(updated as never)
      .select()
      .single();

    if (error) throw error;
    return (data as unknown as SiteSettings) || updated;
  } catch (err) {
    console.warn("Supabase update error, saved locally:", err);
    return updated;
  }
}

// ---------------- Page Sections CMS ----------------
export async function fetchPageSection<T = unknown>(
  pageKey: string,
  sectionKey: string,
  fallback: T,
): Promise<T> {
  const cacheKey = `section_${pageKey}_${sectionKey}`;
  try {
    const { data, error } = await (
      supabase.from("page_sections" as never) as ReturnType<typeof supabase.from>
    )
      .select("*")
      .eq("page_key", pageKey)
      .eq("section_key", sectionKey)
      .maybeSingle();

    if (error || !data || !(data as { content?: unknown }).content) {
      return getLocal<T>(cacheKey, fallback);
    }
    const content = (data as { content: T }).content;
    setLocal(cacheKey, content);
    return content;
  } catch {
    return getLocal<T>(cacheKey, fallback);
  }
}

export async function savePageSection<T = unknown>(
  pageKey: string,
  sectionKey: string,
  content: T,
  title?: string,
): Promise<T> {
  const cacheKey = `section_${pageKey}_${sectionKey}`;
  setLocal(cacheKey, content);

  try {
    const { error } = await supabase.from("page_sections" as never).upsert(
      {
        page_key: pageKey,
        section_key: sectionKey,
        title: title || `${pageKey} - ${sectionKey}`,
        content: content as unknown as Record<string, unknown>,
        updated_at: new Date().toISOString(),
      } as never,
      { onConflict: "page_key,section_key" },
    );

    if (error) console.warn("Supabase upsert section error:", error);
  } catch (err) {
    console.warn("Failed to sync section to Supabase:", err);
  }
  return content;
}

// ---------------- Teachers / Faculty ----------------
export async function fetchTeachers(): Promise<TeacherItem[]> {
  try {
    const { data, error } = await supabase
      .from("teachers" as never)
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return getLocal<TeacherItem[]>("teachers", DEFAULT_TEACHERS);
    }
    const list = data as unknown as TeacherItem[];
    setLocal("teachers", list);
    return list;
  } catch {
    return getLocal<TeacherItem[]>("teachers", DEFAULT_TEACHERS);
  }
}

export async function createTeacher(item: Omit<TeacherItem, "id">): Promise<TeacherItem> {
  const tempId = `t_${Date.now()}`;
  const newItem: TeacherItem = { ...item, id: tempId };
  const current = await fetchTeachers();
  const nextList = [...current, newItem];
  setLocal("teachers", nextList);

  try {
    const { data, error } = await supabase
      .from("teachers" as never)
      .insert({
        name: item.name,
        role: item.role,
        department: item.department,
        qualification: item.qualification,
        experience: item.experience,
        bio: item.bio,
        image_url: item.image_url,
        email: item.email,
        order_index: item.order_index,
        is_active: item.is_active,
      } as never)
      .select()
      .single();

    if (error) throw error;
    return data as unknown as TeacherItem;
  } catch (err) {
    console.warn("Saved teacher locally:", err);
    return newItem;
  }
}

export async function updateTeacher(
  id: string,
  updates: Partial<TeacherItem>,
): Promise<TeacherItem> {
  const current = await fetchTeachers();
  const nextList = current.map((t) => (t.id === id ? { ...t, ...updates } : t));
  setLocal("teachers", nextList);

  try {
    const { data, error } = await supabase
      .from("teachers" as never)
      .update({ ...updates, updated_at: new Date().toISOString() } as never)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return (data as unknown as TeacherItem) || nextList.find((t) => t.id === id)!;
  } catch (err) {
    console.warn("Updated teacher locally:", err);
    return nextList.find((t) => t.id === id)!;
  }
}

export async function deleteTeacher(id: string): Promise<void> {
  const current = await fetchTeachers();
  const nextList = current.filter((t) => t.id !== id);
  setLocal("teachers", nextList);

  try {
    await supabase
      .from("teachers" as never)
      .delete()
      .eq("id", id);
  } catch (err) {
    console.warn("Deleted teacher locally:", err);
  }
}

// ---------------- Achievements ----------------
export async function fetchAchievements(): Promise<AchievementItem[]> {
  try {
    const { data, error } = await supabase
      .from("achievements" as never)
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return getLocal<AchievementItem[]>("achievements", DEFAULT_ACHIEVEMENTS);
    }
    const list = data as unknown as AchievementItem[];
    setLocal("achievements", list);
    return list;
  } catch {
    return getLocal<AchievementItem[]>("achievements", DEFAULT_ACHIEVEMENTS);
  }
}

export async function createAchievement(
  item: Omit<AchievementItem, "id">,
): Promise<AchievementItem> {
  const tempId = `ach_${Date.now()}`;
  const newItem: AchievementItem = { ...item, id: tempId };
  const current = await fetchAchievements();
  const nextList = [...current, newItem];
  setLocal("achievements", nextList);

  try {
    const { data, error } = await supabase
      .from("achievements" as never)
      .insert(item as never)
      .select()
      .single();

    if (error) throw error;
    return data as unknown as AchievementItem;
  } catch {
    return newItem;
  }
}

export async function updateAchievement(
  id: string,
  updates: Partial<AchievementItem>,
): Promise<AchievementItem> {
  const current = await fetchAchievements();
  const nextList = current.map((a) => (a.id === id ? { ...a, ...updates } : a));
  setLocal("achievements", nextList);

  try {
    const { data, error } = await supabase
      .from("achievements" as never)
      .update({ ...updates, updated_at: new Date().toISOString() } as never)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return (data as unknown as AchievementItem) || nextList.find((a) => a.id === id)!;
  } catch {
    return nextList.find((a) => a.id === id)!;
  }
}

export async function deleteAchievement(id: string): Promise<void> {
  const current = await fetchAchievements();
  setLocal(
    "achievements",
    current.filter((a) => a.id !== id),
  );
  try {
    await supabase
      .from("achievements" as never)
      .delete()
      .eq("id", id);
  } catch (err) {
    console.warn("Deleted achievement locally:", err);
  }
}

// ---------------- Fee Tiers ----------------
export async function fetchFeeTiers(): Promise<FeeTierItem[]> {
  try {
    const { data, error } = await supabase
      .from("fee_tiers" as never)
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return getLocal<FeeTierItem[]>("fee_tiers", DEFAULT_FEE_TIERS);
    }
    const list = data as unknown as FeeTierItem[];
    setLocal("fee_tiers", list);
    return list;
  } catch {
    return getLocal<FeeTierItem[]>("fee_tiers", DEFAULT_FEE_TIERS);
  }
}

export async function createFeeTier(item: Omit<FeeTierItem, "id">): Promise<FeeTierItem> {
  const tempId = `fee_${Date.now()}`;
  const newItem: FeeTierItem = { ...item, id: tempId };
  const current = await fetchFeeTiers();
  setLocal("fee_tiers", [...current, newItem]);

  try {
    const { data, error } = await supabase
      .from("fee_tiers" as never)
      .insert(item as never)
      .select()
      .single();
    if (error) throw error;
    return data as unknown as FeeTierItem;
  } catch {
    return newItem;
  }
}

export async function updateFeeTier(
  id: string,
  updates: Partial<FeeTierItem>,
): Promise<FeeTierItem> {
  const current = await fetchFeeTiers();
  const nextList = current.map((f) => (f.id === id ? { ...f, ...updates } : f));
  setLocal("fee_tiers", nextList);

  try {
    const { data, error } = await supabase
      .from("fee_tiers" as never)
      .update(updates as never)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return (data as unknown as FeeTierItem) || nextList.find((f) => f.id === id)!;
  } catch {
    return nextList.find((f) => f.id === id)!;
  }
}

export async function deleteFeeTier(id: string): Promise<void> {
  const current = await fetchFeeTiers();
  setLocal(
    "fee_tiers",
    current.filter((f) => f.id !== id),
  );
  try {
    await supabase
      .from("fee_tiers" as never)
      .delete()
      .eq("id", id);
  } catch (err) {
    console.warn("Deleted fee tier locally:", err);
  }
}

// ---------------- Notices & Events ----------------
export async function fetchNotices(): Promise<NoticeItem[]> {
  try {
    const { data, error } = await supabase
      .from("notices_events" as never)
      .select("*")
      .order("publish_date", { ascending: false });

    if (error || !data || data.length === 0) {
      return getLocal<NoticeItem[]>("notices", DEFAULT_NOTICES);
    }
    const list = data as unknown as NoticeItem[];
    setLocal("notices", list);
    return list;
  } catch {
    return getLocal<NoticeItem[]>("notices", DEFAULT_NOTICES);
  }
}

export async function createNotice(item: Omit<NoticeItem, "id">): Promise<NoticeItem> {
  const tempId = `not_${Date.now()}`;
  const newItem: NoticeItem = { ...item, id: tempId };
  const current = await fetchNotices();
  setLocal("notices", [newItem, ...current]);

  try {
    const { data, error } = await supabase
      .from("notices_events" as never)
      .insert(item as never)
      .select()
      .single();
    if (error) throw error;
    return data as unknown as NoticeItem;
  } catch {
    return newItem;
  }
}

export async function updateNotice(id: string, updates: Partial<NoticeItem>): Promise<NoticeItem> {
  const current = await fetchNotices();
  const nextList = current.map((n) => (n.id === id ? { ...n, ...updates } : n));
  setLocal("notices", nextList);

  try {
    const { data, error } = await supabase
      .from("notices_events" as never)
      .update(updates as never)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return (data as unknown as NoticeItem) || nextList.find((n) => n.id === id)!;
  } catch {
    return nextList.find((n) => n.id === id)!;
  }
}

export async function deleteNotice(id: string): Promise<void> {
  const current = await fetchNotices();
  setLocal(
    "notices",
    current.filter((n) => n.id !== id),
  );
  try {
    await supabase
      .from("notices_events" as never)
      .delete()
      .eq("id", id);
  } catch (err) {
    console.warn("Deleted notice locally:", err);
  }
}

// ---------------- Admission Enquiries ----------------
export async function fetchAdmissionEnquiries(): Promise<AdmissionEnquiryItem[]> {
  const localItems = getLocal<AdmissionEnquiryItem[]>("enquiries", []);
  try {
    const { data, error } = await supabase
      .from("admission_enquiries" as never)
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return localItems;
    }
    const remoteList = data as unknown as AdmissionEnquiryItem[];
    // Preserve any local offline items not yet in remote
    const remoteIds = new Set(remoteList.map((r) => r.id));
    const pendingLocal = localItems.filter((loc) => !remoteIds.has(loc.id));
    const merged = [...pendingLocal, ...remoteList];
    setLocal("enquiries", merged);
    return merged;
  } catch {
    return localItems;
  }
}

export async function createAdmissionEnquiry(
  item: Omit<AdmissionEnquiryItem, "id" | "created_at" | "status"> & {
    status?: AdmissionEnquiryItem["status"];
  },
): Promise<AdmissionEnquiryItem> {
  const tempId = `enq_${Date.now()}`;
  const newItem: AdmissionEnquiryItem = {
    id: tempId,
    student_name: item.student_name,
    date_of_birth: item.date_of_birth || undefined,
    class_applying_for: item.class_applying_for,
    parent_name: item.parent_name,
    mobile: item.mobile,
    email: item.email || undefined,
    current_school: item.current_school || undefined,
    locality: item.locality || undefined,
    message: item.message || undefined,
    status: item.status || "new",
    created_at: new Date().toISOString(),
  };

  const current = getLocal<AdmissionEnquiryItem[]>("enquiries", []);
  const updatedList = [newItem, ...current.filter((e) => e.id !== tempId)];
  setLocal("enquiries", updatedList);

  try {
    const { data, error } = await supabase
      .from("admission_enquiries" as never)
      .insert({
        student_name: newItem.student_name,
        date_of_birth: newItem.date_of_birth || null,
        class_applying_for: newItem.class_applying_for,
        parent_name: newItem.parent_name,
        mobile: newItem.mobile,
        email: newItem.email || null,
        current_school: newItem.current_school || null,
        locality: newItem.locality || null,
        message: newItem.message || null,
        status: newItem.status,
      } as never)
      .select()
      .single();

    if (error || !data) {
      console.warn("Enquiry saved locally; Supabase sync pending:", error);
      return newItem;
    }
    const created = data as unknown as AdmissionEnquiryItem;
    // Replace temp item with synced remote item
    const nextList = updatedList.map((e) => (e.id === tempId ? created : e));
    setLocal("enquiries", nextList);
    return created;
  } catch (err) {
    console.warn("Enquiry saved locally; Supabase catch:", err);
    return newItem;
  }
}

export async function updateEnquiryStatus(
  id: string,
  status: AdmissionEnquiryItem["status"],
): Promise<void> {
  const current = getLocal<AdmissionEnquiryItem[]>("enquiries", []);
  const nextList = current.map((e) => (e.id === id ? { ...e, status } : e));
  setLocal("enquiries", nextList);

  try {
    await supabase
      .from("admission_enquiries" as never)
      .update({ status } as never)
      .eq("id", id);
  } catch (err) {
    console.warn("Updated enquiry status locally:", err);
  }
}

export async function deleteEnquiry(id: string): Promise<void> {
  const current = getLocal<AdmissionEnquiryItem[]>("enquiries", []);
  const nextList = current.filter((e) => e.id !== id);
  setLocal("enquiries", nextList);

  try {
    await supabase
      .from("admission_enquiries" as never)
      .delete()
      .eq("id", id);
  } catch (err) {
    console.warn("Deleted enquiry locally:", err);
  }
}
