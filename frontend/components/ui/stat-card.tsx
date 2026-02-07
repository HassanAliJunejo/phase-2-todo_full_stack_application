import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: 'blue' | 'green' | 'orange' | 'cyan' | string; // Allow custom color classes
  description?: string;
}

const StatCard = ({ title, value, icon, color, description }: StatCardProps) => {
  // Map predefined colors to gradient classes, or use the color prop directly if it's a custom class
  const colorClassesMap = {
    blue: 'from-[#3B82F6] to-[#2563EB]',
    green: 'from-[#10B981] to-[#059669]',
    orange: 'from-[#F59E0B] to-[#D97706]',
    cyan: 'from-cyan-500 to-cyan-600',
  };

  const borderColorsMap = {
    blue: 'border-l-[#3B82F6]',
    green: 'border-l-[#10B981]',
    orange: 'border-l-[#F59E0B]',
    cyan: 'border-l-cyan-500',
  };

  // Determine if it's a predefined color or a custom class
  const isPredefinedColor = color in colorClassesMap;
  let bgGradient = '';
  if (isPredefinedColor) {
    bgGradient = colorClassesMap[color as keyof typeof colorClassesMap];
  } else {
    // Handle custom Tailwind classes like bg-primary-500
    // Convert bg-primary-500 to from-primary-500 to-primary-500
    const baseColor = color.replace('bg-', '');
    bgGradient = `from-${baseColor} to-${baseColor}`;
  }

  // For the reverse gradient on the accent bar, we need to swap from and to
  let accentGradient = '';
  if (isPredefinedColor) {
    accentGradient = bgGradient.replace('from-', 'to-').replace('to-', 'from-');
  } else {
    // For custom Tailwind classes, use the same format but with different shades
    const baseColor = color.replace('bg-', '');
    // Extract color name without shade number
    const colorName = baseColor.replace(/-\d+$/, ''); // Remove the number at the end
    const shadeNumberMatch = baseColor.match(/(\d+)$/); // Get the number at the end
    const shadeNumber = shadeNumberMatch ? shadeNumberMatch[0] : '500'; // Get the number or default to 500

    // Create a gradient from a darker to a lighter shade
    const numericShade = parseInt(shadeNumber);
    const darkerShade = isNaN(numericShade) ? '600' : String(numericShade + 100);
    const lighterShade = isNaN(numericShade) ? '400' : String(Math.max(numericShade - 100, 100));

    accentGradient = `from-${colorName}-${darkerShade} to-${colorName}-${lighterShade}`;
  }

  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out transform relative overflow-hidden`}>
      {/* Left border accent */}
      <div className={`absolute top-0 left-0 h-full w-1 bg-gradient-to-b ${accentGradient || 'from-gray-600 to-gray-400'}`} />

      {/* Glassmorphism effect overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl z-0"></div>

      <div className="relative z-10 flex items-start">
        <div className="p-3 rounded-xl bg-black/10 bg-opacity-20 backdrop-blur-sm">
          {icon}
        </div>
        <div className="ml-4 w-0 flex-1">
          <dt className="text-sm font-medium text-white/90">{title}</dt>
          <dd className="flex items-baseline">
            <div className="text-2xl font-bold text-white">{value}</div>
          </dd>
        </div>
      </div>
      {description && (
        <div className="relative z-10 mt-3 text-xs text-white/80">
          {description}
        </div>
      )}
    </div>
  );
};

export default StatCard;