import { Injectable } from "@angular/core";

//File to demo to understand  the loading of service
//@Injectable({providedIn: 'root'})
export class LoggingService {
    lastLog: string;

    printLog(message) {
        console.log(message);
        console.log(this.lastLog);
        this.lastLog = message;
    }
}