export type UserRole =
  | "ADMIN"
  | "STUDENT"
  | "PROFESSIONAL"
  | "ENGINEER"
  | "MENTOR"
  | "OTHER";

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  organization: string;
  role: UserRole;
  region?: string | null;
  profileVisibility?: "PUBLIC" | "PRIVATE";
  subscribedToNews?: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterForm {
  firstname: string;
  lastname: string;
  email: string;
  organization: string;
  role: Exclude<UserRole, "ADMIN" | "MENTOR">;
  password: string;
  agreedToTerms: boolean;
  subscribedToNews?: boolean;
}
