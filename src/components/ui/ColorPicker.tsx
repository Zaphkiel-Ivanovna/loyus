import { View, Pressable } from 'react-native';
import { Check } from 'lucide-react-native';

interface ColorPickerProps {
  colors: readonly string[];
  selected: string;
  onSelect: (color: string) => void;
}

export function ColorPicker({ colors, selected, onSelect }: ColorPickerProps) {
  return (
    <View className="flex-row gap-3 flex-wrap">
      {colors.map((color) => {
        const isSelected = selected === color;
        return (
          <Pressable
            key={color}
            className="w-10 h-10 rounded-full items-center justify-center active:scale-95"
            style={{
              backgroundColor: color,
              borderWidth: 2,
              borderColor: isSelected ? 'white' : 'transparent',
            }}
            onPress={() => onSelect(color)}
          >
            {isSelected && <Check size={20} color="white" strokeWidth={3} />}
          </Pressable>
        );
      })}
    </View>
  );
}
