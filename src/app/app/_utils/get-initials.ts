export function getInitials(fullName: string): string {
  const nameParts = fullName.split(' ')

  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase()
  }

  const initials = nameParts
    .map((name) => name.charAt(0).toUpperCase())
    .join('')
  return initials
}
