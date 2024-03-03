export interface Profile {
  sub: Sub;
  email: string;
}
interface Sub {
  name: string;
  role: string;
  createAt: Date;
  isActive: boolean;
}
