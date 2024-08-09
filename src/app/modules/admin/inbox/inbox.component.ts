import { Component, inject } from '@angular/core';
import Talk from 'talkjs';
import { InboxPopupComponent } from './inbox-popup/inbox-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { TalkService } from '../../../services/talkjs.service';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent {
  readonly dialog = inject(MatDialog);
  userData:any;
  groupName: string = '';
  groupId: string = '';
  users: { id: string; name: string; email: string; photoUrl: string }[] = [];
  newUser = { id: '', name: '', email: '', photoUrl: '' };
  createdGroups: { groupId: string, groupName: string }[] = [];
  user:any = {};
  constructor(private talkService : TalkService) {}
  
  async ngOnInit() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      this.user = {
          id: this.userData.id,
          name: this.userData.first_name,
          email: this.userData.username,
          photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
          role:"default"
      } 
      const session = await this.talkService.init(this.user);
      const chatbox = session.createInbox();
      chatbox.mount(document.getElementById('talkjs-container'));
    }
  }
  async createGroup() {
    if (this.groupName && this.groupId && this.users.length > 0) {
      const session = await this.talkService.init(this.user);
      const conversation = this.talkService.createGroupConversation(this.users, this.groupId, this.groupName);

      this.createdGroups.push({ groupId: this.groupId, groupName: this.groupName });

      const inbox = session.createInbox({
        selected: conversation
      });

      inbox.mount(document.getElementById('talkjs-container'));
    }
  }

  async openGroup(groupId: string) {
    const session = await this.talkService.init(this.user);
    const conversation = this.talkService.getOrCreateConversation(groupId);

    const inbox = session.createInbox({
      selected: conversation
    });

    inbox.mount(document.getElementById('talkjs-container'));
  }
  addUser() {
    if (this.newUser.id && this.newUser.name && this.newUser.email && this.newUser.photoUrl) {
      this.users.push({ ...this.newUser });
      this.newUser = { id: '', name: '', email: '', photoUrl: '' };
    }
  }

  editinbox() {
    this.dialog.open(InboxPopupComponent, {
      height: '450px',
      width: '40vw',
    })
    .afterClosed()
      .subscribe(users => {
        for(let user of users.data){
            this.users.push({
              id: user.id,
              name: user.first_name,
              email: user.username,
              photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
            })
        }
        this.groupName = "test2";
        this.groupId   = "123";
        this.createGroup();
       /*  const conv_id = "" + Date.now();
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
          }); */
        // this.inbox.mount(document.getElementById("talkjs-container"));
      });
  }
}
