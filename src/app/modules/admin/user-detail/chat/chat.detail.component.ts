
import { Component, OnInit } from '@angular/core';
import Talk from 'talkjs';

@Component({
  selector: 'app-user-chat',
  templateUrl: './chat.detail.component.html',
  styleUrls: ['./chat.detail.component.scss']
})
export class ChatDetailComponent implements OnInit {

  ngOnInit(): void {

    Talk.ready.then(() => {
      const me = new Talk.User({
        id: "sebastian",
        name: "Sebastian",
        email: "sebastian@example.com",
        photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
        welcomeMessage: "Hi!",
      });

      const other = new Talk.User({
        id: "taylor",
        name: "Taylor",
        email: "taylor@example.com",
        photoUrl: "https://talkjs.com/new-web/avatar-8.jpg",
        welcomeMessage: "Hello, I'm Taylor. Nice to meet you too!",
      });
      const other1 = new Talk.User({
        id: "smith",
        name: "smith",
        email: "smith@example.com",
        photoUrl: "https://talkjs.com/new-web/avatar-8.jpg",
        welcomeMessage: "Hello, I'm smith. Nice to meet you too!",
      });
      const other3 = new Talk.User({
        id: "test",
        name: "test",
        email: "test@example.com",
        photoUrl: "https://talkjs.com/new-web/avatar-8.jpg",
        welcomeMessage: "Hello, I'm test. Nice to meet you too!",
      });

      const session = new Talk.Session({
        appId: "tHcyGZjg",
        me: me,
      });


      const conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, other3));
      conversation.setParticipant(me);
      conversation.setParticipant(other);
      conversation.setParticipant(other1);
      conversation.setParticipant(other3);

      const inbox = session.createInbox({
        showChatHeader: true
      });

      // const inbox = session.createInbox();
      inbox.select(conversation);
      inbox.mount(document.getElementById("talkjs-container"));
    })

    
    .catch((error) => {
      console.error('TalkJS initialization error:', error);
    });
  }

}
