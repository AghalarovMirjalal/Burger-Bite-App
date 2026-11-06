import { Ionicons } from '@expo/vector-icons';
import { forwardRef, useState, type ComponentProps, type ComponentRef } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';
import { fonts, makeStyles, s, useTheme } from '../theme';

interface Props extends TextInputProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  error?: string;
  secure?: boolean;
}

export const TextField = forwardRef<ComponentRef<typeof TextInput>, Props>(function TextField({ icon, error, secure, style, ...rest }, ref) {
  const { colors } = useTheme();
  const styles = useStyles();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  return (
    <View>
      <View style={[styles.field, focused && styles.focused, !!error && styles.invalid]}>
        <Ionicons name={icon} size={s(19)} color={focused ? colors.orange : colors.muted} />
        <TextInput
          ref={ref}
          placeholderTextColor={colors.faint}
          selectionColor={colors.orange}
          secureTextEntry={secure && hidden}
          autoCorrect={false}
          {...rest}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          style={[styles.input, style]}
        />
        {secure && (
          <Pressable onPress={() => setHidden((v) => !v)} hitSlop={10}>
            <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={s(19)} color={colors.muted} />
          </Pressable>
        )}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
});

const useStyles = makeStyles((c) => ({
  field: {
    height: s(52),
    borderRadius: s(26),
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(18),
    gap: s(10),
  },
  focused: {
    borderColor: c.orange,
  },
  invalid: {
    borderColor: c.red,
  },
  input: {
    flex: 1,
    height: '100%',
    color: c.text,
    fontFamily: fonts.regular,
    fontSize: s(15),
    paddingVertical: 0,
    outlineWidth: 0,
  },
  error: {
    color: c.red,
    fontFamily: fonts.regular,
    fontSize: s(12),
    marginTop: s(5),
    marginLeft: s(18),
  },
}));
