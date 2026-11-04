import { View } from 'react-native';
import { Image } from 'expo-image';
import { Logo } from '@/constants/assets';

export type AppIconName = 'logo';

const AVAILABLE: AppIconName[] = ['logo'];

export function hasAsset(name: AppIconName): boolean {
  return AVAILABLE.includes(name);
}

// Tampilkan hanya area tulisan dari kanvas 2048x2048
export default function AppIcon({ size = 160 }: { name: AppIconName; size?: number }) {
  const scale = size / Logo.box.width;
  const full = Logo.canvas * scale;
  return (
    <View style={{ width: size, height: Logo.box.height * scale, overflow: 'hidden' }} accessible accessibilityLabel="Secura">
      <Image
        source={Logo.source}
        contentFit="fill"
        style={{ position: 'absolute', width: full, height: full, left: -Logo.box.x * scale, top: -Logo.box.y * scale }}
      />
    </View>
  );
}
