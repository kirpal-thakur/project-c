// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  // private readonly socketUrl: string = 'https://alerts.socceryou.ch/'; // Replace with your backend URL
  private readonly socketUrl: string = environment.socketUrl; // Replace with your backend URL

  constructor() {
    // Initialize the socket connection
    this.socket = io(this.socketUrl);

    let jsonData = localStorage.getItem("userData");
    let userId;
    if (jsonData) {
        let userData = JSON.parse(jsonData);
        userId = userData.id;
        this.connectUser(userData.id);
    }
    else{
      console.log("No data found in localStorage."); 
    }
  }

  // Method to emit 'connectUser' event
  private connectUser(userId: string): void {
    this.socket.emit('connectUser', userId);
  }



  // Method to emit events to the server
  emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  // Method to listen to events from the server
  on(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
    });
  }

  // Method to disconnect the socket when no longer needed
  disconnect(): void {
    this.socket.disconnect();
  }
}
