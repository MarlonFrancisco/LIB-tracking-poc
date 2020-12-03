export const toKebabCase = (value: string) => {
  return (
    value &&
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[.<|>;"'{}[\]+=_()*&^%$#@!~`?]/g, "")
      .replace(/[\s]/g, "-")
      .toLowerCase()
  );
};
