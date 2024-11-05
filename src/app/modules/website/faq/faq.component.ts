import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  selectedTab: string = 'talent'; // Default tab
  isOpen: { [key: string]: boolean[] } = {
    talent: [],
    club: [],
    scout: []
  };

  // Sections for each tab
  talentSections = [
    {
      title: 'What is Soccer?',
      content1: `Soccer, also known as football in most countries outside of the United States and Canada, is a popular team sport played between two teams of eleven players each. The game is played on a rectangular field with a goal at each end. The objective is to score by getting a ball into the opposing team's goal. Players primarily use their feet to move the ball, but they can also use their head or torso. The goalkeeper is the only player allowed to use their hands and arms, but only within the penalty area surrounding the goal.`,
      content2: `Soccer is governed by a set of rules known as the Laws of the Game, which include regulations on the field's dimensions, the ball, the duration of the match, and the roles of the players.`
    },
    {
      title: 'How can I create a profile on SoccerYou?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'What are the benefits of a premium membership?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'How do I connect with clubs and scouts on SoccerYou?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'Can I upload highlight videos and match reports to my profile?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'How does SoccerYou ensure the credibility of profiles?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'Is SoccerYou available in multiple languages?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'What kind of support does SoccerYou offer?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'How can clubs and scouts benefit from SoccerYou?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'What security measures does SoccerYou have in place?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
  ];

  clubSections = [
    {
      title: 'What is Soccer?',
      content1: `Soccer, also known as football in most countries outside of the United States and Canada, is a popular team sport played between two teams of eleven players each. The game is played on a rectangular field with a goal at each end. The objective is to score by getting a ball into the opposing team's goal. Players primarily use their feet to move the ball, but they can also use their head or torso. The goalkeeper is the only player allowed to use their hands and arms, but only within the penalty area surrounding the goal.`,
      content2: `Soccer is governed by a set of rules known as the Laws of the Game, which include regulations on the field's dimensions, the ball, the duration of the match, and the roles of the players.`
    },
    {
      title: 'How can I create a profile on SoccerYou?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'What are the benefits of a premium membership?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'How do I connect with clubs and scouts on SoccerYou?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'Can I upload highlight videos and match reports to my profile?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'How does SoccerYou ensure the credibility of profiles?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'Is SoccerYou available in multiple languages?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'What kind of support does SoccerYou offer?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'How can clubs and scouts benefit from SoccerYou?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'What security measures does SoccerYou have in place?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
  ];

  scoutSections = [
    {
      title: 'What is Soccer?',
      content1: `Soccer, also known as football in most countries outside of the United States and Canada, is a popular team sport played between two teams of eleven players each. The game is played on a rectangular field with a goal at each end. The objective is to score by getting a ball into the opposing team's goal. Players primarily use their feet to move the ball, but they can also use their head or torso. The goalkeeper is the only player allowed to use their hands and arms, but only within the penalty area surrounding the goal.`,
      content2: `Soccer is governed by a set of rules known as the Laws of the Game, which include regulations on the field's dimensions, the ball, the duration of the match, and the roles of the players.`
    },
    {
      title: 'How can I create a profile on SoccerYou?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'What are the benefits of a premium membership?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'How do I connect with clubs and scouts on SoccerYou?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'Can I upload highlight videos and match reports to my profile?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'How does SoccerYou ensure the credibility of profiles?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'Is SoccerYou available in multiple languages?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'What kind of support does SoccerYou offer?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'How can clubs and scouts benefit from SoccerYou?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
    {
      title: 'What security measures does SoccerYou have in place?',
      content1: `SoccerYou is a platform dedicated to soccer enthusiasts. It offers various features and information to help users stay engaged with the sport.`,
      content2: `On SoccerYou, you can find news, match updates, player statistics, and more. It's designed to enhance your soccer experience and keep you connected with the latest in the game.`
    },
  ];

  constructor() {
    this.initializeIsOpen();
  }

  // Initialize isOpen array based on the number of sections in each tab
  initializeIsOpen() {
    this.isOpen['talent'] = new Array(this.talentSections.length).fill(false);
    this.isOpen['club'] = new Array(this.clubSections.length).fill(false);
    this.isOpen['scout'] = new Array(this.scoutSections.length).fill(false);
  }

  // Toggle the visibility of content for a specific section
  toggleContent(index: number) {
    const currentSections = this.getCurrentSections();
    this.isOpen[this.selectedTab][index] = !this.isOpen[this.selectedTab][index];
  }

  // Get the current sections based on the selected tab
  getCurrentSections() {
    switch (this.selectedTab) {
      case 'club':
        return this.clubSections;
      case 'scout':
        return this.scoutSections;
      case 'talent':
      default:
        return this.talentSections;
    }
  }

  // Change the selected tab and reinitialize isOpen array
  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.initializeIsOpen();
  }
  ngOnInit() {
     this.adVisible = [true, true, true, true, true, true, true];
  }
  adVisible: boolean[] = [true, true, true, true, true, true, true]; // Array to manage ad visibility
  
  closeAd(index: number) {
    this.adVisible[index] = false; // Set the specific ad to not visible based on index
  }
}
