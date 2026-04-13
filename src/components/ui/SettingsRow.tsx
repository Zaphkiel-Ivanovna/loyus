import { View, Text, Switch, Pressable } from 'react-native';
import { lightHaptic } from '@lib/haptics';
import { useAccentColor } from '@hooks/useAccentColor';

interface SettingsRowToggleProps {
  type: 'toggle';
  title: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

interface SettingsRowPickerProps {
  type: 'picker';
  title: string;
  description?: string;
  value: string;
  options: { label: string; value: string }[];
  onValueChange: (value: string) => void;
}

type SettingsRowProps = SettingsRowToggleProps | SettingsRowPickerProps;

export function SettingsRow(props: SettingsRowProps) {
  const { primary } = useAccentColor();

  if (props.type === 'toggle') {
    return (
      <View className="flex-row justify-between items-center py-3">
        <View className="flex-1 gap-1 mr-4">
          <Text className="text-base font-medium text-gray-900 dark:text-white">
            {props.title}
          </Text>
          {props.description && (
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {props.description}
            </Text>
          )}
        </View>
        <Switch
          value={props.value}
          onValueChange={(v) => {
            lightHaptic();
            props.onValueChange(v);
          }}
          trackColor={{ false: '#d1d5db', true: primary }}
          thumbColor="#fff"
        />
      </View>
    );
  }

  return (
    <View className="py-3 gap-1">
      <Text className="text-base font-medium text-gray-900 dark:text-white">
        {props.title}
      </Text>
      {props.description && (
        <Text className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {props.description}
        </Text>
      )}
      <View className="flex-row gap-2 flex-wrap">
        {props.options.map((option) => {
          const selected = props.value === option.value;
          return (
            <Pressable
              key={option.value}
              className={`px-4 py-2 rounded-full border ${
                selected
                  ? 'border-transparent'
                  : 'bg-transparent border-gray-300 dark:border-gray-600'
              }`}
              style={selected ? { backgroundColor: primary } : undefined}
              onPress={() => {
                lightHaptic();
                props.onValueChange(option.value);
              }}
            >
              <Text
                className={`text-sm font-medium ${
                  selected ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
