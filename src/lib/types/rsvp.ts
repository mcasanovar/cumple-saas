export type DashboardRSVP = {
  id: string;
  name: string;
  email: string | null;
  willAttend: boolean;
  guestCount: number;
  guestNames: string[];
  createdAt: string;
};
