import { View, Text, Pressable, Linking } from 'react-native';
import { Camera } from 'lucide-react-native';
import { useAccentColor } from '@hooks/useAccentColor';

interface CameraPermissionViewProps {
  canAskAgain: boolean;
  onRequest: () => void;
}

export function CameraPermissionView({ canAskAgain, onRequest }: CameraPermissionViewProps) {
  const { primary } = useAccentColor();

  return (
    <View className="flex-1 items-center justify-center px-6 gap-4">
      <Camera size={64} color="#9ca3af" strokeWidth={1.5} />

      <Text className="text-xl font-bold text-center text-gray-900 dark:text-white">
        Camera Access
      </Text>

      {canAskAgain ? (
        <>
          <Text className="text-base text-gray-500 dark:text-gray-400 text-center">
            We need camera access to scan barcodes and QR codes on your loyalty cards.
          </Text>
          <Pressable
            className="mt-2 px-6 py-3 rounded-full active:opacity-80"
            style={{ backgroundColor: primary }}
            onPress={onRequest}
          >
            <Text className="text-white font-semibold text-base">Allow Camera Access</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text className="text-base text-gray-500 dark:text-gray-400 text-center">
            Camera access was denied. Please enable it in your device settings to scan cards.
          </Text>
          <Pressable
            className="mt-2 px-6 py-3 rounded-full active:opacity-80"
            style={{ backgroundColor: primary }}
            onPress={() => Linking.openSettings()}
          >
            <Text className="text-white font-semibold text-base">Open Settings</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}
