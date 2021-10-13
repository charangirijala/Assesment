import { Component, OnInit } from '@angular/core';
import { ApiconnectService } from '../apiconnect.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:ApiconnectService) { }

  ngOnInit(): void {
  }
  onLogin(obj){
    //console.log(obj)
    this.us.loginUser(obj).subscribe(
      res=>{
          console.log(res)
          if(res.message=='Invalid mail id'){
            alert("Invalid mail id..")
          }
          else if(res.message==='Invalid password'){
            alert("Invalid password")
          }
          else if(res.message==='Login success'){
            alert("Login success")
          }
      },
      err=>{
        alert("Something went wrong")
      }
    )
  }
}
