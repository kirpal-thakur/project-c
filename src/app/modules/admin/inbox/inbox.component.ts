import { Component, inject } from '@angular/core';
import Talk from 'talkjs';
import { InboxPopupComponent } from './inbox-popup/inbox-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent {
  readonly dialog = inject(MatDialog);
  userData:any;
  private inbox: any;
  private chatUserSession:any;
  ngAfterViewInit(): void{
      const userDataString = localStorage.getItem('userData');
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
        this.chatUserSession = new Talk.Session({
        appId: "tHcyGZjg",
        me: me,
      });
      this.inbox = this.chatUserSession.createInbox({
        showChatHeader: true
      });
      this.inbox.mount(document.getElementById("talkjs-container"));
    }
  });
  }

  editinbox() {
    this.dialog.open(InboxPopupComponent, {
      height: '450px',
      width: '40vw',
    })
    .afterClosed()
      .subscribe(users => {
        const conv_id = "" + Date.now();
        const conversation = this.chatUserSession.getOrCreateConversation(conv_id);
        const me = new Talk.User(this.chatUserSession.me.id);
        conversation.setParticipant(me);
          for(let user of users.data){
            let currUser = new Talk.User({
              id: user.id,
              name: user.first_name,
              email: user.username,
              photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
              welcomeMessage: "Hi!",
            });
            conversation.setParticipant(currUser);
          }
          this.inbox = this.chatUserSession.createInbox({
            showChatHeader: true
          });
        // this.inbox.mount(document.getElementById("talkjs-container"));
      });
  }
}
