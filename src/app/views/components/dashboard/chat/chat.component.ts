import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  messages: any[] = [
    {
      text: "hola",
      date: "2023-11-04",
      reply: true,
      type: "text",
      files: [],
      user: {
        name: "Anfitrion",
        avatar: ''
      }
    },
    {
      text: 'Hola que tal',
      date: new Date(),
      reply: false,
      user: {
        name: 'Usuario',
        avatar: 'https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg',
      },
    },
  ];

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file: { src: any; type: any; }) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'Felix',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });

    console.log(this.messages);

  }
}
