import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { HttpClient } from '@angular/common/http'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public http: HttpClient, private readonly domSanitizer: DomSanitizer) { }

  ngOnInit() {
    //this.photoService.loadSaved();
  }

  img: any

  async pickImage() {
    const newPhotos = await Camera.pickImages({
      quality: 100,
      limit: 1,
      correctOrientation: true
    })

    if (newPhotos.photos.length > 0) {
      try {
        let p = newPhotos.photos.pop()

        //format of p: blob http://hash
        console.log(p?.webPath)
        if (p?.webPath) {
          this.img = this.domSanitizer.bypassSecurityTrustUrl(p?.webPath)
          this.http.get(p.webPath, { responseType: 'blob' }).subscribe((res: any) => {
            //console.log(res)
            //let b64 = this.convertBlobToBase64(res)
            //console.log(b64)
          });
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  // private readonly convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  //   const reader = new FileReader()
  //   reader.onerror = reject
  //   reader.onload = () => {
  //     resolve(reader.result)
  //   }
  //   reader.readAsDataURL(blob)
  // })

}
