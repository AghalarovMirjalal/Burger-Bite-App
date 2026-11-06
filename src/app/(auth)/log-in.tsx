import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { AuthScreen } from '../../components/AuthScreen';
import { GradientButton } from '../../components/GradientButton';
import { TextField } from '../../components/TextField';
import { useAuth } from '../../context/AuthContext';
import { EMAIL_PATTERN } from '../../lib/format';
import { fonts, makeStyles, s } from '../../theme';

interface LogInForm {
  email: string;
  password: string;
}

export default function LogInScreen() {
  const styles = useStyles();
  const { signIn } = useAuth();
  const [formError, setFormError] = useState('');

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<LogInForm>({ defaultValues: { email: '', password: '' } });

  const onSubmit = async ({ email, password }: LogInForm) => {
    setFormError('');
    try {
      await signIn(email, password);
      router.replace('/home');
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Something went wrong');
    }
  };

  return (
    <AuthScreen title="Welcome" accent="back" subtitle="Log in to continue your burger journey">
      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Enter your email',
            pattern: { value: EMAIL_PATTERN, message: 'Enter a valid email' },
          }}
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <TextField
              ref={ref}
              icon="mail-outline"
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              returnKeyType="next"
              onSubmitEditing={() => setFocus('password')}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: 'Enter your password' }}
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <TextField
              ref={ref}
              icon="lock-closed-outline"
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
              secure
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
        />
      </View>

      {!!formError && <Text style={styles.formError}>{formError}</Text>}

      <GradientButton
        title="Log in"
        variant="red"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        style={styles.button}
      />

      <Text style={styles.switch}>
        Don&apos;t have an account?{' '}
        <Text style={styles.link} onPress={() => router.replace('/sign-up')}>
          Sign Up
        </Text>
      </Text>
    </AuthScreen>
  );
}

const useStyles = makeStyles((c) => ({
  form: {
    gap: s(16),
  },
  formError: {
    color: c.red,
    fontFamily: fonts.medium,
    fontSize: s(13),
    textAlign: 'center',
    marginTop: s(18),
  },
  button: {
    marginTop: s(30),
  },
  switch: {
    color: c.muted,
    fontFamily: fonts.regular,
    fontSize: s(13),
    textAlign: 'center',
    marginTop: s(22),
  },
  link: {
    color: c.orange,
    fontFamily: fonts.semibold,
  },
}));
