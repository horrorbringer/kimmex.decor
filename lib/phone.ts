export function getCambodianPhoneDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  const withoutCountryCode = digits.startsWith("855") ? digits.slice(3) : digits;
  return withoutCountryCode.replace(/^0/, "").slice(0, 9);
}

export function formatCambodianPhone(value: string) {
  const digits = getCambodianPhoneDigits(value);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
}

export function isValidCambodianPhone(value: string) {
  return /^[1-9]\d{7,8}$/.test(getCambodianPhoneDigits(value));
}

export function getInternationalCambodianPhone(value: string) {
  return `+855 ${formatCambodianPhone(value)}`;
}
