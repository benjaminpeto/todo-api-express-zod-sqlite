export function handleError(err: unknown, message: string): never {
    if (err instanceof Error) {
        throw new Error(err.message);
    } else {
        throw new Error(message);
    }
}
