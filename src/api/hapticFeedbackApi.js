export const supportsVibration = () => {
  return navigator.vibrate !== undefined;
};

export const triggerHapticFeedback = (duration = 200) => {
  if (supportsVibration()) {
    navigator.vibrate(duration); // Vibrate for 200ms on default
  }
};
