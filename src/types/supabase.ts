export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      follows: {
        Row: {
          follower_id: string
          post_id: string
        }
        Insert: {
          follower_id: string
          post_id: string
        }
        Update: {
          follower_id?: string
          post_id?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          address: string
          area: number
          author_id: string | null
          category: string
          created_at: string
          deposit: number
          description: string
          id: string
          imageSrc: string[]
          price: number
          title: string
          update_at: string | null
          utility: string[] | null
          videoSrc: string | null
        }
        Insert: {
          address: string
          area: number
          author_id?: string | null
          category: string
          created_at?: string
          deposit: number
          description: string
          id?: string
          imageSrc: string[]
          price: number
          title: string
          update_at?: string | null
          utility?: string[] | null
          videoSrc?: string | null
        }
        Update: {
          address?: string
          area?: number
          author_id?: string | null
          category?: string
          created_at?: string
          deposit?: number
          description?: string
          id?: string
          imageSrc?: string[]
          price?: number
          title?: string
          update_at?: string | null
          utility?: string[] | null
          videoSrc?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          new_avatar_url: string | null
          new_full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          new_avatar_url?: string | null
          new_full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          new_avatar_url?: string | null
          new_full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
