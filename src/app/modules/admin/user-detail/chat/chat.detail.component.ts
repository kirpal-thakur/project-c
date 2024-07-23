
import { Component, OnInit } from '@angular/core';
import Talk from 'talkjs';
import { UserService } from '../../../../services/user.service';
@Component({
  selector: 'app-user-chat',
  templateUrl: './chat.detail.component.html',
  styleUrls: ['./chat.detail.component.scss']
})
export class ChatDetailComponent implements OnInit {
  userData: any; 
  otherUsers: any;
  constructor(private userService: UserService){

  }
  ngOnInit(): void {
      
  }
  ngAfterViewInit(): void{
    this.fetchUsers();
  }

  async fetchUsers(): Promise<void> {
    const userDataString = localStorage.getItem('userData');
        try {
         
          const response: any = await this.userService.getUsers().toPromise();
          if (response && response.status && response.data && response.data.userData) {
            Talk.ready.then(() => {
            if (userDataString) {
            this.userData = JSON.parse(userDataString);
            const me = new Talk.User({
              id: this.userData.id,
              name: this.userData.first_name,
              email: this.userData.username,
              photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
              welcomeMessage: "Hi!",
            });
            
            const session = new Talk.Session({
              appId: "tHcyGZjg",
              me: me,
            });
            let conversation; 
            for (let user of response.data.userData) {
              let other = new Talk.User({
                id: user.id,
                name: user.first_name,
                email: user.username,
                photoUrl: "https://talkjs.com/new-web/avatar-8.jpg",
                welcomeMessage: "Hello, I'm Taylor. Nice to meet you too!",
              });
              conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, other));
              conversation.setParticipant(me);
              conversation.setParticipant(other);
             }
             const inbox = session.createInbox({
               showChatHeader: true
             });
            inbox.select(conversation);      
             // const inbox = session.createInbox();
             inbox.mount(document.getElementById("talkjs-container"));
            //end here
            }
              }).catch((error) => {
                console.error('TalkJS initialization error:', error);
              });
            } else {
            console.error('Invalid API response structure:', response);
          }
         
          
        } catch (error) {
          console.error('Error fetching users:', error);
        }
   
  }
}
