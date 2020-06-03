
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe'
})

export class FilterPipe implements PipeTransform {
    transform(value: any, args?: any): any {

        if (!value) return null;
        if (!args) return value;

        args = args.toString().toLowerCase();

        return value.filter(function (item: any) {
            return JSON.stringify(item).toString().toLowerCase().includes(args);
        });
    }
}