import { ReactNode, createContext, useState } from "react";

export const ConfigContext = createContext<any>(null);

interface ConfigContextProps {
  children: ReactNode;
}

export const ConfigContextProvider: React.FC<ConfigContextProps> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchPaletteVisible, setSearchPaletteVisible] = useState(false);
  const [isChatSelected, setIsChatSelected] = useState(false);


  const handleSearchUsers = () => { };

  return (
    <>
      <ConfigContext.Provider
        value={{
          isDarkMode,
          setIsDarkMode,
          setSearchTerm,
          setSearchPaletteVisible,
          searchTerm,
          isSearchPaletteVisible,
          isChatSelected,
          setIsChatSelected
        }}
      >
        {children}
      </ConfigContext.Provider>
    </>
  );
};
