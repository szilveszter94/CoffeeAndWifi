import { ReactNode, createContext, useState } from "react";

// Define the interface for Snackbar context value
export interface SnackbarContextValue {
  snackbar: {
    open: boolean;
    message: string;
    type: "success" | "error" | "info" | "warning" | undefined;
  };

  setSnackbar: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      message: string;
      type: "success" | "error" | "info" | "warning" | undefined;
    }>
  >;
}

// Create the Snackbar context
export const SnackbarContext = createContext<SnackbarContextValue>({
  snackbar: {
    open: false,
    message: "",
    type: undefined,
  },
  setSnackbar: () => {},
});

// Define the props interface for SnackbarProvider
interface SnackbarProviderProps {
  children: ReactNode;
}

// Define the SnackbarProvider component
export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackbar, setSnackbar] = useState<SnackbarContextValue["snackbar"]>({
    open: false,
    message: "",
    type: undefined,
  });
  const value: SnackbarContextValue = { snackbar, setSnackbar };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};
