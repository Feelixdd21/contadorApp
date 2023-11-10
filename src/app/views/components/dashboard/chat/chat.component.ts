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
      text: "Buen día Sr. Alfonso",
      date: new Date(),
      reply: true,
      type: "text",
      files: [],
      user: {
        name: "Contador",
        avatar: ''
      }
    },
    {
      text: 'Buen día Contador',
      date: new Date(),
      reply: false,
      user: {
        name: 'Contribuyente',
        avatar: 'https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg',
      },
    },
    {
      text: "Entrego su determinación de impuestos del mes correspondiente",
      date: new Date(),
      reply: true,
      type: "text",
      files: [],
      user: {
        name: "Contador",
        avatar: ''
      }
    },
    {
      text: "Guardado en el apartado de carga de archivo",
      date: new Date(),
      reply: true,
      type: "text",
      files: [],
      user: {
        name: "Contador",
        avatar: ''
      }
    },
    {
      text: 'Muchas gracias contador',
      date: new Date(),
      reply: false,
      user: {
        name: 'Contribuyente',
        avatar: 'https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg',
      },
    },
    {
      text: 'Que tenga un buen día',
      date: new Date(),
      reply: false,
      user: {
        name: 'Contribuyente',
        avatar: 'https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg',
      },
    },
    {
      text: "De nada",
      date: new Date(),
      reply: true,
      type: "text",
      files: [],
      user: {
        name: "Contador",
        avatar: ''
      }
    },
    {
      text: "Quedo al pendiente de cualquier situación.",
      date: new Date(),
      reply: true,
      type: "text",
      files: [],
      user: {
        name: "Contador",
        avatar: ''
      }
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
