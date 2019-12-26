import { Component, ViewChild, ElementRef } from '@angular/core';  
import { IRecord } from './app.interface';
import { Record } from './app.class';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {  
  public records: IRecord[] = []; 
  public csvHeaders: string[] = [];

  @ViewChild('csvReader' , {static: false}) csvReader: ElementRef;  
  
  /**
   * Listen for file selection and porcess / read selected csv file
   * @param $event 
   */
  csvFileUploadListener($event: any): void {  
    let files = $event.srcElement.files;  

    // Validate selected file is a type of CSV or not
    if (this.isValidCSVFile(files[0])) {  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;
        //Split by new line  
        let csvRecords = (<string>csvData).split(/\r\n|\n/); 
  
        this.csvHeaders = this.getHeaderArray(csvRecords);
        this.records = this.getRecords(csvRecords, this.csvHeaders.length);  
      };  
  
      reader.onerror = () => {  
        console.log('An error has occured while reading file.');
        this.fileReset();  
      };  
  
    } else {  
      alert("Please import a valid .csv file.");  
      this.fileReset();  
    }  
  }  
  
  /**
   * Gets records
   * @param csvRecords 
   * @param headerLength 
   * @returns array of records 
   */
  getRecords(csvRecords: string[], headerLength: number) {  
    let records = [];  
  
    for (let i = 1; i < csvRecords.length; i++) {
      // Replace all double quotes and split by comma  
      let curruntRecord = (<string>csvRecords[i]).replace(/"/g, "").split(',');
      
      if (curruntRecord.length == headerLength) {
        // Convert string array into Record object  
        let csvRecord: IRecord = new Record(curruntRecord[0], curruntRecord[1], +curruntRecord[2], curruntRecord[3]);  
        records.push(csvRecord);  
      }  
    }
    return records;  
  }  
  
  // Validate given file is a type of csv or not
  isValidCSVFile(file: File) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: string[]) { 
    // Replace all double quotes and split by comma 
    let headers = (<string>csvRecordsArr[0]).replace(/"/g, "").split(',');
    return headers ? headers : [];  
  }  
  
  /**
   * Reset selected file
   */
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  }  
}
