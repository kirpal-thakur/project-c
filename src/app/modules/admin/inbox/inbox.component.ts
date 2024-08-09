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
  newUser : { id: string; name: string; email: string; photoUrl: string }[] = [];
  createdGroups: { groupId: string, groupName: string }[] = [];
  user:any = {};
  constructor(private talkService : TalkService) {}
  
  async ngOnInit() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      console.log('userData',this.userData.role);
      this.user = {
          id: this.userData.id,
          name: this.userData.first_name,
          email: this.userData.username,
          photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
          role:(this.userData.role == '1') ? "hidden" : "default"
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
      console.log('conversation',conversation)
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


  editinbox() {
    this.dialog.open(InboxPopupComponent, {
      height: '450px',
      width: '40vw',
    })
    .afterClosed()
      .subscribe(users => {
        this.users = this.newUser;
        for(let user of users.data){
            this.users.push({
              id: user.id,
              name: user.first_name,
              email: user.username,
              photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
            })
        }
        const groupId = this.userData.id+"-"+ Date.now();
        const groupName = this.userData.first_name+ "-" + Date.now();
        this.groupName = groupName;
        this.groupId   = groupId;
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
