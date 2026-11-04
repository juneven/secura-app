export const Illustrations = {
  welcomeHero: require('../../assets/images/c4dbba5dd059222c878e44594baa9bb6cbe40ade.png'), // tangan melambai
  loginHero: require('../../assets/images/LoginScreen.png'),
  signupHero: require('../../assets/images/CreateAccount.png'),
  forgotHero: require('../../assets/images/ForgotPassword.png'),
  otpHero: require('../../assets/images/VerifyOTP.png'),
  resetHero: require('../../assets/images/ResetPassword.png'),
  successHero: require('../../assets/images/PasswordUpdated.png'),
} as const;

export type IllustrationName = keyof typeof Illustrations;

// Welcome.png: tulisan "Secura" di bawah kanvas 2048x2048
export const Logo = {
  source: require('../../assets/images/Welcome.png'),
  canvas: 2048,
  // Area tulisan (piksel) untuk memotong tampilan
  box: { x: 192, y: 1447, width: 1664, height: 245 },
} as const;
