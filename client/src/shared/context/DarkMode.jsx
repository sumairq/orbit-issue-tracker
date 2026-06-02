import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext({ isDark: false, toggle: () => {} });

export const DarkModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('orbit-dark') === 'true');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('orbit-dark', isDark);
  }, [isDark]);

  const toggle = () => setIsDark(d => !d);

  return <DarkModeContext.Provider value={{ isDark, toggle }}>{children}</DarkModeContext.Provider>;
};

export const useDarkMode = () => useContext(DarkModeContext);
