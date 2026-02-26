import { useAuth } from '../context/AuthContext';
import { WidgetGrid } from '../components/widgets';
import { HudGrid, HudScanLine, HudGlowText } from '../components/hud';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <HudGrid className="relative min-h-full">
      {/* Scan line effect */}
      <HudScanLine speed="normal" />
      
      <div className="space-y-6 p-2">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <HudGlowText pulse>{user?.username}!</HudGlowText>
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Your AI command center is operational.
          </p>
        </div>

        {/* Widget Grid - All widgets in default layout */}
        <WidgetGrid />
      </div>
    </HudGrid>
  );
};

export default Dashboard;
