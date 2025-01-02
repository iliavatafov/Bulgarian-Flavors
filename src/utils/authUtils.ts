interface Parent {
  password: string;
}

export function checkPasswordsForEquality(
  this: { parent: Parent },
  value: string | undefined
): boolean {
  const { password } = this.parent;
  return password ? value === password : true;
}
