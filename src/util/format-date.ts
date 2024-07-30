export function formatDate(data: string) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(data));
}