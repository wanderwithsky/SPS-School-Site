export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      admission_enquiries: {
        Row: {
          admission_status: string | null;
          call_status: string | null;
          class_applying_for: string;
          contact_status: string | null;
          created_at: string;
          current_school: string | null;
          date_of_birth: string | null;
          email: string | null;
          follow_up_status: string | null;
          id: string;
          interest_status: string | null;
          is_deleted: boolean | null;
          locality: string | null;
          message: string | null;
          mobile: string;
          parent_name: string;
          source: string | null;
          status: Database["public"]["Enums"]["enquiry_status"];
          student_name: string;
          updated_at: string;
        };
        Insert: {
          admission_status?: string | null;
          call_status?: string | null;
          class_applying_for: string;
          contact_status?: string | null;
          created_at?: string;
          current_school?: string | null;
          date_of_birth?: string | null;
          email?: string | null;
          follow_up_status?: string | null;
          id?: string;
          interest_status?: string | null;
          is_deleted?: boolean | null;
          locality?: string | null;
          message?: string | null;
          mobile: string;
          parent_name: string;
          source?: string | null;
          status?: Database["public"]["Enums"]["enquiry_status"];
          student_name: string;
          updated_at?: string;
        };
        Update: {
          admission_status?: string | null;
          call_status?: string | null;
          class_applying_for?: string;
          contact_status?: string | null;
          created_at?: string;
          current_school?: string | null;
          date_of_birth?: string | null;
          email?: string | null;
          follow_up_status?: string | null;
          id?: string;
          interest_status?: string | null;
          is_deleted?: boolean | null;
          locality?: string | null;
          message?: string | null;
          mobile?: string;
          parent_name?: string;
          source?: string | null;
          status?: Database["public"]["Enums"]["enquiry_status"];
          student_name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
      admission_notes: {
        Row: {
          id: string;
          admission_enquiry_id: string | null;
          note: string;
          created_by: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          admission_enquiry_id?: string | null;
          note: string;
          created_by?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          admission_enquiry_id?: string | null;
          note?: string;
          created_by?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          title: string;
          date: string;
          time: string | null;
          location: string | null;
          description: string | null;
          cover_image: string | null;
          status: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          date: string;
          time?: string | null;
          location?: string | null;
          description?: string | null;
          cover_image?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          date?: string;
          time?: string | null;
          location?: string | null;
          description?: string | null;
          cover_image?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      notices: {
        Row: {
          id: string;
          title: string;
          date: string;
          description: string | null;
          document_url: string | null;
          publish_date: string | null;
          status: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          date: string;
          description?: string | null;
          document_url?: string | null;
          publish_date?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          date?: string;
          description?: string | null;
          document_url?: string | null;
          publish_date?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      academic_calendar: {
        Row: {
          id: string;
          title: string;
          date: string;
          category: string;
          description: string | null;
          status: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          date: string;
          category: string;
          description?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          date?: string;
          category?: string;
          description?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      teachers: {
        Row: {
          id: string;
          name: string;
          designation: string | null;
          subject: string | null;
          department: string | null;
          photo_url: string | null;
          description: string | null;
          display_order: number | null;
          status: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          designation?: string | null;
          subject?: string | null;
          department?: string | null;
          photo_url?: string | null;
          description?: string | null;
          display_order?: number | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          designation?: string | null;
          subject?: string | null;
          department?: string | null;
          photo_url?: string | null;
          description?: string | null;
          display_order?: number | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      achievements: {
        Row: {
          id: string;
          student_name: string;
          class: string | null;
          academic_year: string | null;
          achievement: string | null;
          exam: string | null;
          rank: string | null;
          percentage: string | null;
          image_url: string | null;
          description: string | null;
          status: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          student_name: string;
          class?: string | null;
          academic_year?: string | null;
          achievement?: string | null;
          exam?: string | null;
          rank?: string | null;
          percentage?: string | null;
          image_url?: string | null;
          description?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          student_name?: string;
          class?: string | null;
          academic_year?: string | null;
          achievement?: string | null;
          exam?: string | null;
          rank?: string | null;
          percentage?: string | null;
          image_url?: string | null;
          description?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          display_order: number | null;
          status: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          display_order?: number | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          display_order?: number | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      admin_activity_logs: {
        Row: {
          id: string;
          admin_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string | null;
          metadata: Json | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          admin_id?: string | null;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          metadata?: Json | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          admin_id?: string | null;
          action?: string;
          entity_type?: string;
          entity_id?: string | null;
          metadata?: Json | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "staff";
      enquiry_status: "new" | "contacted" | "follow_up" | "visited" | "closed";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff"],
      enquiry_status: ["new", "contacted", "follow_up", "visited", "closed"],
    },
  },
} as const;
