import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "app",
})
export class AppPipe implements PipeTransform {
  transform(value: any[], searchTerm: string, selectedOption: string) {
    if (!searchTerm || !selectedOption) {
      return value;
    }

    return value.filter((item: any) => {
      switch (selectedOption) {
        case "empName":
          return item.empName.indexOf(searchTerm.toLowerCase()) > -1;
        case "department":
          if (item.department && typeof item.department === "string") {
            return item.department.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        } else {
            
            return false; // or handle it in a way that makes sense for your application
        }
        case "mobile":
          return item.mobile.indexOf(searchTerm) > -1;
        case "gender":
          return item.gender.toLowerCase() == searchTerm.toLowerCase();
        case "joinDate":
          const regex = new RegExp(searchTerm.toLowerCase());
          return regex.test(item.joinDate);
        case "email":
          return item.email.indexOf(searchTerm.toLowerCase()) > -1;
        default:
          return false;
      }
    });
  }
}
