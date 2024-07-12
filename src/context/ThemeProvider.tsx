import useObjectLocalStorage from "@/hooks/useObjectLocalStorage";
import { createContext, useEffect, FC } from "react";

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);
const ThemeProvider: FC<TChildren> = ({ children }) => {
  const [isDark, setIsDark] = useObjectLocalStorage("isDark", false);
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  const toggleTheme = () => setIsDark(!isDark);
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
