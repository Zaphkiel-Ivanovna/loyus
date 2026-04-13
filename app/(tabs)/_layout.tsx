import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { CreditCard, ScanBarcode, Settings } from 'lucide-react-native';
import { CustomTabBar } from '@components/ui/CustomTabBar';
import { useAccentColor } from '@hooks/useAccentColor';

function NativeTabLayout() {
  const { primary } = useAccentColor();

  return (
    <NativeTabs tintColor={primary} minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: 'creditcard', selected: 'creditcard.fill' }} />
        <Label>Wallet</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="scanner">
        <Icon sf="barcode.viewfinder" />
        <Label>Scan</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <Icon sf={{ default: 'gearshape', selected: 'gearshape.fill' }} />
        <Label>Settings</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function ClassicTabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, size }) => <CreditCard size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, size }) => <ScanBarcode size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const isIOS26 = Platform.OS === 'ios' && Number(Platform.Version) >= 26;

export default function TabLayout() {
  return isIOS26 ? <NativeTabLayout /> : <ClassicTabLayout />;
}
