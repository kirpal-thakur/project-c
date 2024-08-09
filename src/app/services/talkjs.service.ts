// src/app/services/talkjs.service.ts
import { Injectable } from '@angular/core';
import Talk from 'talkjs';

@Injectable({
  providedIn: 'root',
})
export class TalkService {
  private session: Talk.Session | null = null;

  constructor() {}

  async init(user: { id: string; name: string; email: string; photoUrl: string,role: string }) {
    await Talk.ready;

    const me = new Talk.User({
      id: user.id,
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      welcomeMessage: 'Hey there! How can I help?',
      role:user.role
    });

    this.session = new Talk.Session({
       appId: 'tmI75KXB', //tHcyGZjg //tmI75KXB:live
      me: me,
    });
    return this.session;
  }


/*     createInbox(conversations: Talk.ConversationBuilder[]) {
        if (!this.session) {
        throw new Error('TalkJS session is not initialized');
        }
        const inbox = this.session.createInbox();
        inbox.setConversations(conversations);
        return inbox;
    } */

    createGroupConversation(users: { id: string; name: string; email: string; photoUrl: string }[], groupId: string, groupName: string) {
    if (!this.session) {
      throw new Error('TalkJS session is not initialized');
    }
    const conversation = this.session.getOrCreateConversation(groupId);
    conversation.setAttributes({
      subject: groupName
    });

    users.forEach(user => {
      const talkUser = new Talk.User({
        id: user.id,
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        welcomeMessage: 'Hey there! How can I help?',
        role:'default'
      });

      conversation.setParticipant(talkUser);
    });

    return conversation;
  }

  getOrCreateConversation(groupId: string) {
    if (!this.session) {
      throw new Error('TalkJS session is not initialized');
    }

    return this.session.getOrCreateConversation(groupId);
  }
}
