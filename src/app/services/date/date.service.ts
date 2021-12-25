export class DateService {
    public static addDays(input: Date, days: number): Date {
        const output = new Date(input);
        output.setDate(output.getDate() + days);
        return output;
    }

    public static addMonths(input: Date, months: number): Date {
        const output = new Date(input);
        output.setMonth(output.getMonth() + months);
        return output;
    }

    public static withTimeAtStartOfDay(input: Date): Date {
        return new Date(input.toDateString());
    }

    public static max(dates: Date[]): Date {
        return dates.reduce((a, b) => (a > b ? a : b));
    }
}
