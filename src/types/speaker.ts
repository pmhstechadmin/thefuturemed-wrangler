// src/types/speaker.ts
export interface Speaker {
    id: string;
    name: string;
    qualification: string;
    department: string;
    bio?: string; // Make bio optional since it might not exist in all cases
    seminar_id: string;
    created_at: string;
    avatar_url?: string;
  }