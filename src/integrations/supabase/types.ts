export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      communities: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      community_memberships: {
        Row: {
          community_id: string
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          community_id: string
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          community_id?: string
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_memberships_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          community_id: string
          content: string
          created_at: string
          file_type: string | null
          file_url: string | null
          id: string
          post_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          community_id: string
          content: string
          created_at?: string
          file_type?: string | null
          file_url?: string | null
          id?: string
          post_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          community_id?: string
          content?: string
          created_at?: string
          file_type?: string | null
          file_url?: string | null
          id?: string
          post_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      ads: {
        Row: {
          id: string;
          img_url: string;
          redirect_url: string;
          showorder?: number;
          location: string;
          status: boolean;
        };
      };
      course_enrollments: {
        Row: {
          amount: number | null
          completed: boolean | null
          completion_date: string | null
          course_id: string
          currency: string | null
          enrolled_at: string
          id: string
          payment_method: string | null
          payment_status: string | null
          stripe_session_id: string | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          completed?: boolean | null
          completion_date?: string | null
          course_id: string
          currency?: string | null
          enrolled_at?: string
          id?: string
          payment_method?: string | null
          payment_status?: string | null
          stripe_session_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number | null
          completed?: boolean | null
          completion_date?: string | null
          course_id?: string
          currency?: string | null
          enrolled_at?: string
          id?: string
          payment_method?: string | null
          payment_status?: string | null
          stripe_session_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_modules: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          id: string
          module_number: number
          title: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          module_number: number
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          module_number?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          copyright_agreement_accepted: boolean | null
          created_at: string
          creator_id: string
          description: string | null
          duration_months: number
          has_project: boolean | null
          id: string
          number_of_modules: number
          offline_hours: number | null
          online_hours: number | null
          privacy_policy_accepted: boolean | null
          project_description: string | null
          resources_summary: string | null
          status: Database["public"]["Enums"]["course_status"] | null
          title: string
          updated_at: string
        }
        Insert: {
          copyright_agreement_accepted?: boolean | null
          created_at?: string
          creator_id: string
          description?: string | null
          duration_months: number
          has_project?: boolean | null
          id?: string
          number_of_modules: number
          offline_hours?: number | null
          online_hours?: number | null
          privacy_policy_accepted?: boolean | null
          project_description?: string | null
          resources_summary?: string | null
          status?: Database["public"]["Enums"]["course_status"] | null
          title: string
          updated_at?: string
        }
        Update: {
          copyright_agreement_accepted?: boolean | null
          created_at?: string
          creator_id?: string
          description?: string | null
          duration_months?: number
          has_project?: boolean | null
          id?: string
          number_of_modules?: number
          offline_hours?: number | null
          online_hours?: number | null
          privacy_policy_accepted?: boolean | null
          project_description?: string | null
          resources_summary?: string | null
          status?: Database["public"]["Enums"]["course_status"] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_providers: {
        Row: {
          address: string
          contract_details: string | null
          created_at: string
          department: string | null
          duty_hours: string | null
          google_location: string | null
          id: string
          manager_contact: string
          manager_email: string
          manager_name: string
          number_of_vacancies: number | null
          organization_name: string
          organization_type: string
          salary_range: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          contract_details?: string | null
          created_at?: string
          department?: string | null
          duty_hours?: string | null
          google_location?: string | null
          id?: string
          manager_contact: string
          manager_email: string
          manager_name: string
          number_of_vacancies?: number | null
          organization_name: string
          organization_type: string
          salary_range?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          contract_details?: string | null
          created_at?: string
          department?: string | null
          duty_hours?: string | null
          google_location?: string | null
          id?: string
          manager_contact?: string
          manager_email?: string
          manager_name?: string
          number_of_vacancies?: number | null
          organization_name?: string
          organization_type?: string
          salary_range?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      job_seekers: {
        Row: {
          availability: string | null
          bio: string | null
          created_at: string
          email: string
          experience_years: number | null
          id: string
          location: string | null
          phone: string
          previous_experience: string | null
          qualification: string
          skills: string[] | null
          specialization: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          availability?: string | null
          bio?: string | null
          created_at?: string
          email: string
          experience_years?: number | null
          id?: string
          location?: string | null
          phone: string
          previous_experience?: string | null
          qualification: string
          skills?: string[] | null
          specialization?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          availability?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          experience_years?: number | null
          id?: string
          location?: string | null
          phone?: string
          previous_experience?: string | null
          qualification?: string
          skills?: string[] | null
          specialization?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mcq_questions: {
        Row: {
          correct_answer: string
          created_at: string
          explanation: string | null
          id: string
          module_id: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
        }
        Insert: {
          correct_answer: string
          created_at?: string
          explanation?: string | null
          id?: string
          module_id: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
        }
        Update: {
          correct_answer?: string
          created_at?: string
          explanation?: string | null
          id?: string
          module_id?: string
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          question_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "mcq_questions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      module_content: {
        Row: {
          content_text: string | null
          content_title: string
          content_type: string
          content_url: string | null
          created_at: string
          file_size: number | null
          id: string
          module_id: string
        }
        Insert: {
          content_text?: string | null
          content_title: string
          content_type: string
          content_url?: string | null
          created_at?: string
          file_size?: number | null
          id?: string
          module_id: string
        }
        Update: {
          content_text?: string | null
          content_title?: string
          content_type?: string
          content_url?: string | null
          created_at?: string
          file_size?: number | null
          id?: string
          module_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_content_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number
          course_id: string | null
          created_at: string
          currency: string | null
          id: string
          payment_method: string | null
          status: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          course_id?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          payment_method?: string | null
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          course_id?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          payment_method?: string | null
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          payment_method: string | null
          status: string
          stripe_payment_intent_id: string | null
          subscription_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string | null
          status: string
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "provider_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          category: string | null
          city: string | null
          country: string | null
          created_at: string
          date_of_birth: string | null
          degree_level: string | null
          email: string | null
          first_name: string | null
          gender: string | null
          id: string
          institution: string | null
          last_name: string | null
          medical_specialty: string | null
          phone: string | null
          profile_image_url: string | null
          updated_at: string
          year_of_study: string | null
        }
        Insert: {
          bio?: string | null
          category?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          degree_level?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id: string
          institution?: string | null
          last_name?: string | null
          medical_specialty?: string | null
          phone?: string | null
          profile_image_url?: string | null
          updated_at?: string
          year_of_study?: string | null
        }
        Update: {
          bio?: string | null
          category?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          degree_level?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          institution?: string | null
          last_name?: string | null
          medical_specialty?: string | null
          phone?: string | null
          profile_image_url?: string | null
          updated_at?: string
          year_of_study?: string | null
        }
        Relationships: []
      }
      provider_subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          payment_status: string | null
          plan_id: string | null
          provider_id: string
          start_date: string | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          payment_status?: string | null
          plan_id?: string | null
          provider_id: string
          start_date?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          payment_status?: string | null
          plan_id?: string | null
          provider_id?: string
          start_date?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_subscriptions_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "job_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      seminar_registrations: {
        Row: {
          id: string
          payment_status: string | null
          registered_at: string
          seminar_id: string
          user_id: string
        }
        Insert: {
          id?: string
          payment_status?: string | null
          registered_at?: string
          seminar_id: string
          user_id: string
        }
        Update: {
          id?: string
          payment_status?: string | null
          registered_at?: string
          seminar_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "seminar_registrations_seminar_id_fkey"
            columns: ["seminar_id"]
            isOneToOne: false
            referencedRelation: "seminars"
            referencedColumns: ["id"]
          },
        ]
      }
      seminars: {
        Row: {
          created_at: string
          date: string
          description: string | null
          host_id: string
          host_name: string
          id: string
          time: string
          topic: string
          updated_at: string
          host_country:string
          host_timezone: string; // NEW: Store host's timezone
  utc_start_time: string; // NEW: Store UTC timestamp
          is_host_joined: boolean;
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          host_id: string
          host_name: string
          id?: string
          time: string
          topic: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          host_id?: string
          host_name?: string
          id?: string
          time?: string
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      speakers: {
        Row: {
          created_at: string
          department: string
          id: string
          name: string
          qualification: string
          seminar_id: string
        }
        Insert: {
          created_at?: string
          department: string
          id?: string
          name: string
          qualification: string
          seminar_id: string
        }
        Update: {
          created_at?: string
          department?: string
          id?: string
          name?: string
          qualification?: string
          seminar_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "speakers_seminar_id_fkey"
            columns: ["seminar_id"]
            isOneToOne: false
            referencedRelation: "seminars"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          active: boolean
          billing_cycle: string
          created_at: string
          currency: string
          description: string | null
          features: Json | null
          id: string
          name: string
          price: number
        }
        Insert: {
          active?: boolean
          billing_cycle: string
          created_at?: string
          currency?: string
          description?: string | null
          features?: Json | null
          id?: string
          name: string
          price: number
        }
        Update: {
          active?: boolean
          billing_cycle?: string
          created_at?: string
          currency?: string
          description?: string | null
          features?: Json | null
          id?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      user_activities: {
        Row: {
          activity_description: string | null
          activity_type: string
          created_at: string
          id: string
          points_earned: number | null
          user_id: string
        }
        Insert: {
          activity_description?: string | null
          activity_type: string
          created_at?: string
          id?: string
          points_earned?: number | null
          user_id: string
        }
        Update: {
          activity_description?: string | null
          activity_type?: string
          created_at?: string
          id?: string
          points_earned?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_earnings: {
        Row: {
          amount: number
          currency: string | null
          description: string | null
          earned_at: string
          earning_type: string
          id: string
          status: string | null
          user_id: string
        }
        Insert: {
          amount?: number
          currency?: string | null
          description?: string | null
          earned_at?: string
          earning_type: string
          id?: string
          status?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          currency?: string | null
          description?: string | null
          earned_at?: string
          earning_type?: string
          id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_module_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          course_id: string
          created_at: string
          id: string
          module_id: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          course_id: string
          created_at?: string
          id?: string
          module_id: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string
          created_at?: string
          id?: string
          module_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_module_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_module_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_community_member_count: {
        Args: { community_uuid: string }
        Returns: number
      }
      get_user_profile: {
        Args: { user_uuid: string }
        Returns: {
          first_name: string
          last_name: string
        }[]
      }
      has_active_subscription: {
        Args: { user_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      course_status: "draft" | "published" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      course_status: ["draft", "published", "archived"],
    },
  },
} as const
