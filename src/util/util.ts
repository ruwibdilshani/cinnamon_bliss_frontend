export function formatDate(date: string | Date) {
    if (typeof date === "string") {
        return date.split('T')[0];
    } else if (date instanceof Date) {
        return date.toISOString().split('T')[0];
    }
    return "";
}

