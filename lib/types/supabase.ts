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
      equipments: {
        Row: {
          description: string | null
          id: number
          img: string | null
          name: string | null
          stock: number | null
        }
        Insert: {
          description?: string | null
          id?: number
          img?: string | null
          name?: string | null
          stock?: number | null
        }
        Update: {
          description?: string | null
          id?: number
          img?: string | null
          name?: string | null
          stock?: number | null
        }
        Relationships: []
      }
      "profiles": {
        Row: {
          // contactno: string | null
          // email: string | null
          // id: string | null
          // name?: string | null
          // profileimg: string | null
          // isVerified?: boolean | null

          contactno: string | null
          email: string | null
          id: string | null
          name: string | null
          profileimg: string | null
          isVerified: boolean | null
          isAdmin: boolean | null
          prereq_Form5: boolean | null
          prereq_Attendance: boolean | null
          jobtitle: string | null 
          age: string | null
          degprog: string | null
          sex: string | null
          education: string | null
          organization: string | null
        }
        Insert: {
          contactno?: string | null
          email?: string | null
          id: string
          name?: string | null
        }
        Update: {
          isVerified?: boolean | null
          contactno?: string | null
          email?: string | null
          id?: string
          name?: string | null
          age: string | null
          jobTitle: string | null
          degprog: string | null
          sex: string | null
          education: string | null
          organization: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reservationform: {
        Row: {
          adviser: string | null
          borrower_id: string | null
          created_at: string
          equipment: Json | null
          id: number
          project: string | null
        }
        Insert: {
          adviser?: string | null
          borrower_id?: string | null
          created_at?: string
          equipment?: Json | null
          id?: number
          project?: string | null
        }
        Update: {
          adviser?: string | null
          borrower_id?: string | null
          created_at?: string
          equipment?: Json | null
          id?: number
          project?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservationform_borrower_id_fkey"
            columns: ["borrower_id"]
            isOneToOne: false
            referencedRelation: "profiles (Google)"
            referencedColumns: ["id"]
          },
        ]
      }
      room: {
        Row: {
          capacity: number | null
          purpose: string | null
          reservationDate: string | null
          reservationTime: string | null
          roomID: number
          roomName: string
          roomNumber: number | null
        }
        Insert: {
          capacity?: number | null
          purpose?: string | null
          reservationDate?: string | null
          reservationTime?: string | null
          roomID?: number
          roomName: string
          roomNumber?: number | null
        }
        Update: {
          capacity?: number | null
          purpose?: string | null
          reservationDate?: string | null
          reservationTime?: string | null
          roomID?: number
          roomName?: string
          roomNumber?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          contactno: string | null
          email: string
          id: number
          isadmin: boolean | null
          isenrolled: boolean
          isverified: boolean
          name: string | null
          password: string | null
        }
        Insert: {
          contactno?: string | null
          email: string
          id?: number
          isadmin?: boolean | null
          isenrolled?: boolean
          isverified?: boolean
          name?: string | null
          password?: string | null
        }
        Update: {
          contactno?: string | null
          email?: string
          id?: number
          isadmin?: boolean | null
          isenrolled?: boolean
          isverified?: boolean
          name?: string | null
          password?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
