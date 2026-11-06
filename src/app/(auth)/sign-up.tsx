import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { AuthScreen } from '../../components/AuthScreen';
import { Avatar } from '../../components/Avatar';
import { GradientButton } from '../../components/GradientButton';
import { TextField } from '../../components/TextField';
import { useAuth } from '../../context/AuthContext';
import { EMAIL_PATTERN } from '../../lib/format';
import { pickPhoto } from '../../lib/pickPhoto';
import { fonts, makeStyles, s } from '../../theme';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export default function SignUpScreen() {
  const styles = useStyles();
  const { signUp } = useAuth();
  const [photo, setPhoto] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  const {
    control,
    handleSubmit,
    setFocus,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({ defaultValues: { name: '', email: '', password: '', confirm: '' } });

  const name = watch('name');

  const choosePhoto = async () => {
    const uri = await pickPhoto();
    if (uri) setPhoto(uri);
  };

  const onSubmit = async ({ name, email, password }: SignUpForm) => {
    setFormError('');
    try {
      await signUp({ name, email, password, photo });
      router.replace('/home');
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Something went wrong');
    }
  };

  return (
    <AuthScreen title="Create" accent="account" subtitle="New here? Create an account to get started!">
      <Pressable onPress={choosePhoto} style={styles.photo}>
        <Avatar photo={photo} name={name} size={s(96)} />
        <View style={styles.camera}>
          <Ionicons name="camera" size={s(16)} color="#FFFFFF" />
        </View>
      </Pressable>
      <Text style={styles.photoHint}>{photo ? 'Tap to change photo' : 'Add a profile photo'}</Text>

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          rules={{
            required: 'Enter your name',
            validate: (v) => v.trim().length >= 2 || 'Name is too short',
          }}
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <TextField
              ref={ref}
              icon="person-outline"
              placeholder="Full name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
              onSubmitEditing={() => setFocus('email')}
            />
          )}
        />
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
          rules={{
            required: 'Create a password',
            minLength: { value: 6, message: 'At least 6 characters' },
          }}
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
              returnKeyType="next"
              onSubmitEditing={() => setFocus('confirm')}
            />
          )}
        />
        <Controller
          control={control}
          name="confirm"
          rules={{
            required: 'Repeat your password',
            validate: (v, form) => v === form.password || 'Passwords do not match',
          }}
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <TextField
              ref={ref}
              icon="shield-checkmark-outline"
              placeholder="Confirm password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.confirm?.message}
              secure
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
        />
      </View>

      {!!formError && <Text style={styles.formError}>{formError}</Text>}

      <GradientButton title="Sign Up" onPress={handleSubmit(onSubmit)} loading={isSubmitting} style={styles.button} />

      <Text style={styles.switch}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => router.replace('/log-in')}>
          Log in
        </Text>
      </Text>
    </AuthScreen>
  );
}

const useStyles = makeStyles((c) => ({
  photo: {
    alignSelf: 'center',
  },
  camera: {
    position: 'absolute',
    right: 0,
    bottom: s(2),
    width: s(30),
    height: s(30),
    borderRadius: s(15),
    backgroundColor: c.orange,
    borderWidth: 2,
    borderColor: c.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoHint: {
    color: c.muted,
    fontFamily: fonts.regular,
    fontSize: s(12),
    textAlign: 'center',
    marginTop: s(8),
    marginBottom: s(22),
  },
  form: {
    gap: s(14),
  },
  formError: {
    color: c.red,
    fontFamily: fonts.medium,
    fontSize: s(13),
    textAlign: 'center',
    marginTop: s(18),
  },
  button: {
    marginTop: s(28),
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
