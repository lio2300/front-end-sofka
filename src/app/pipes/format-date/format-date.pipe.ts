import { Pipe, PipeTransform } from "@angular/core";
import moment from "moment";

@Pipe({
  name: "formatDate",
  standalone: false
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string, format: string): string | null{
    if (!value?.trim()?.length) {
      return null;
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      console.error("Invalid date:", value);
      return null;
    }

    return moment(date).format(format) || null;
  }
}
