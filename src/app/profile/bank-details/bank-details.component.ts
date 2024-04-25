import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/Service/data.service';
export function uppercaseValidator(c: FormControl) {
  let regex = /[A-Z]/g
  if (regex.test(c.value)) {
    return null;
  } else {
    return { lowercase: true }
  }
}
@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {
  bankDetailsForm: FormGroup;
  public bankNames: any[] = [];
  public stateName: any[] = [];
  public districtName: any[] = [];
  public submitted:boolean=false;
  public sidebarShow: boolean = false;
  public  state: string = '';
  constructor(private fb :FormBuilder, private service:DataService){
    this.bankDetailsForm =this.fb.group({
      bankName:[],
      state:[],
      district:[],
      bankBranch:[],
      accountNumber:[],
      AccountType:[],
      IFSCCode:['',Validators.required]
    })
    
  }

  ngOnInit(): void {
    this.bankDetails()
    this.stateDetails()
    this.districtDetails()
  }

  public bankDetails(){
    this.service.getSpecificBankDetails().subscribe((bankNames: any[])=>{
      
      this.bankNames = bankNames;
      console.log(this.bankNames)
    },(error)=>{
      console.error('Error fetching bank names:', error);
    })
  }

  public stateDetails(){
    this.service.getStateName().subscribe((state: any[])=>{
      this.stateName = state;
      console.log(this.stateName)
    },(error)=>{
      console.error('Error fetching bank names:', error);
    })
  }

  public districtDetails(){
    this.service.getDistrictName().subscribe((district: any[])=>{
      this.districtName = district;
      console.log(this.districtName)
    },(error)=>{
      console.error('Error fetching bank names:', error);
    })
    
  }

  onKeyup(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }


  get f(){
   return  this.bankDetailsForm.controls;
  }

  public onSubmit(){
    this.submitted =true;
    if(this.bankDetailsForm.invalid){
      return
    }
    let data ={
      ...this.bankDetailsForm.value
    }
    console.log(this.bankDetailsForm.value);
    this.service.postBankDetails(data).subscribe((res)=>{
      console.log(res);
      this.submitted=false
      this.bankDetailsForm.reset();
      this.bankDetails()
      this.stateDetails()
      this.districtDetails()
    },(error)=>{
      console.log(error)
    })


  }

  public cancelBtn(){
    this.submitted=false;
    this.bankDetailsForm.reset()

  }
  public keyPressNumbers(event: any) {
    var charCode = event.which ? event.which : event.keyCode;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  public toggleSidebar() {
    this.sidebarShow = !this.sidebarShow;
    const card = document.querySelector('.card');
    card.classList.toggle('opened', this.sidebarShow);
}
}
