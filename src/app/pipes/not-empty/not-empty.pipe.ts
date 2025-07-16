import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "notEmpty",
  standalone: false
})
export class NotEmptyPipe implements PipeTransform {
  transform(value: string | null, num = 2): string {
    const str = "-";

    return value ?? str.repeat(num);
  }
}

