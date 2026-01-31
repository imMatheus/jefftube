import { ThemeProvider } from './hooks/useTheme';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ChannelPage } from './components/channel/ChannelPage';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-(--color-bg-primary) text-(--color-text-primary)">
        <Header />
        <Sidebar />
        <ChannelPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
