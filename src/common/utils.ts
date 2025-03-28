export function toEnum<T extends Record<string, string>>(enumObj: T, value: string): T[keyof T] | null {
    const upperValue = value.toUpperCase() as keyof T;
    return upperValue in enumObj ? enumObj[upperValue] : null;
}
