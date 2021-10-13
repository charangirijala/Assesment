import { Component, OnInit } from '@angular/core';
import { ApiconnectService } from '../apiconnect.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private us:ApiconnectService) { }

  ngOnInit(): void {
  }
  onUserSubmit(userObj){
    console.log(userObj)
    this.us.createUser(userObj).subscribe(
      res=>{
        //console.log(res.message)
        if(res.message==="New user created"){
          alert("New user created successfully")
        }
        else if(res.message==="User already exsists"){
          alert("User already exsists")
        }
      },
      err=>{
        alert("Something went wrong")
      }
    )
  }
}
