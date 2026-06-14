export interface Application {
  id: number;
  company: string;
  position: string;
  status: string;

  notes?: string;
  location?: string;
  salary?: string;

  createdAt?: string;
}