import { ThemeProvider } from "./contexts/ThemeContext";
import { DataProvider } from "./contexts/DataContext";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { ChannelPage } from "./components/channel/ChannelPage";

function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-(--color-bg-primary) text-(--color-text-primary)">
          <Header />
          <Sidebar />
          <ChannelPage />
        </div>
      </ThemeProvider>
    </DataProvider>
  );
}

export default App;
