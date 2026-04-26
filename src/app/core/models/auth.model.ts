export type UserRole =
  | 'SuperAdmin'
  | 'BuildingAdmin'
  | 'SecurityStaff'
  | 'MaintenanceStaff'
  | 'CanteenStaff'
  | 'Resident'
  | 'Tenant';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  buildingId?: string;
}

export interface AuthResponse extends AuthTokens {
  user: AuthUser;
}
