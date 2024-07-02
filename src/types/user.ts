export type User = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
};

export type Session = {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  expires: string;
};
