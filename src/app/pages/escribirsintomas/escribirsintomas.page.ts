import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,Platform } from '@ionic/angular';
import { VoiceRecognitionService } from 'src/app/service/voice-recognition.service';
import { RestService } from 'src/app/services/rest.service';


@Component({
  selector: 'app-escribirsintomas',
  templateUrl: './escribirsintomas.page.html',
  styleUrls: ['./escribirsintomas.page.scss'],
  providers: [VoiceRecognitionService]
})
export class EscribirsintomasPage implements OnInit {
  dataPost:any
  dataFor:any[] = []
  user:any
  dataArray:any[] = []

  constructor(private router: Router, 
    public navCtrl: NavController, 
    public service: VoiceRecognitionService,
    private _httpService: RestService)
  {
    this.service.init()
  }

deleteText(){
  this.service.text ="";
}

  showToggle:boolean = true;
  showToggleFun(){
    if(this.showToggle == true){
      this.showToggle = false;
    }else{
      this.showToggle = true;
    }
  }
  startService(){
    this.service.start()
  }
 
  stopService(){
    this.service.stop()
  }
  ngOnInit() {
    this.user = localStorage.getItem('user')
    this.dataFor = JSON.parse(this.user)
  }
  sendToSymptoms(text:string){
    console.log("string ingreso",text);
    let symtoms ={
      simptons:text
    }
    this.dataArray.push(symtoms)
    let userSyntomsTmpS = {
      data: this.dataArray
    }
    this.dataPost = {
      id_user: this.dataFor['id'],
      id_user_symptoms: 0,
      flag: "No conocido",
      data_symptoms: userSyntomsTmpS,
      descripcion: "na"
    }
    this._httpService.post('symptoms', this.dataPost).subscribe(
      response => {
        if (!response) {

          console.error('Error: no se encontro usuario');
        } else {
          console.log("response", response);
          //traer el el respose con alerta y  mandarla alertas
          this.routerClick('tabs')

        }
      }
    );
  }
  routerClick(link: string) {
    this.router.navigateByUrl(link);
  }

}
