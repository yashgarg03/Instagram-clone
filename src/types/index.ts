import React from "react";

export type INewUser = {
  username: string;
  email: string;
  password: string;
  name: string;
};

export type IContextType = {
  user: INewUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};
