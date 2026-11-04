export async function signIn(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  return { email, token: 'mock-token' };
}

export async function signUp(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  return { email, token: 'mock-token' };
}
