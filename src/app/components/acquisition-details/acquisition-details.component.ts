import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcquisitionService } from 'src/app/service/acquisition/acquisition.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-acquisition-details',
  templateUrl: './acquisition-details.component.html',
  styleUrls: ['./acquisition-details.component.css'],
})
export class AcquisitionDetailsComponent implements OnInit {
  pdfUrl: any = '';
  constructor(
    private route: ActivatedRoute,
    private acquisitionService: AcquisitionService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const filename = params['acquisitionName'];
      this.openAcquisition(filename);
    });
  }

  openAcquisition(filename: string) {
    this.acquisitionService.loadAcquisition(filename).subscribe((data) => {
      const pdfBlob = this.base64toBlob(data.pdfData, 'application/pdf');
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(pdfBlob)
      );
    });
  }

  base64toBlob(base64Data: string, contentType: string): Blob {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }
}
