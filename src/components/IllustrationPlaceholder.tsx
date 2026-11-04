import { Image } from 'expo-image';
import { IllustrationName, Illustrations } from '@/constants/assets';

// Nama lama dipertahankan agar import lama tetap jalan
export default function IllustrationPlaceholder({ name, size = 120 }: { name: IllustrationName; size?: number }) {
  return <Image source={Illustrations[name]} style={{ width: size, height: size }} contentFit="contain" accessible={false} />;
}

