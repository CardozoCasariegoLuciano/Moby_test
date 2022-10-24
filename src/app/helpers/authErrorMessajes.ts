export const convertMessage = (code: string): string => {
  switch (code) {
    case 'auth/wrong-password': {
      return 'Wrong email or password';
    }
    case 'auth/email-already-in-use': {
      return 'Email already taken';
    }
    case 'auth/weak-password': {
      return 'Password too weak';
    }
    case 'auth/user-not-found': {
      return 'Wrong email or password';
    }
    default: {
      return 'something went wrong';
    }
  }
};
