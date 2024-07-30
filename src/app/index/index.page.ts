import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  slides = [
    {
      description: "Keiji Kiriya, un soldado, muere en batalla pero revive en un bucle de tiempo. Debe mejorar sus habilidades para enfrentar a los extraterrestres llamados “Mimics”. Ciencia ficción y acción se combinan en esta historia",
      manga: "All you need is Kill",
      autor: "Hiroshi Sakurazaka",
      image: "https://m.media-amazon.com/images/I/51Dg6sNIhRL.jpg" 
    },
    {
      description: "Guts, un mercenario errante, se une al carismático líder Griffith en busca de gloria. En un mundo medieval oscuro, lucha contra demonios y traiciones. Épica fantasía y supervivencia se entrelazan en esta saga",
      manga: "Berserk",
      autor: "Gege Akutami",
      image: "https://m.media-amazon.com/images/I/71lnvXSiITL._AC_UF1000,1000_QL80_.jpg" 
    },
    {
      description: "Narra la historia de Naruto Uzumaki, un ninja adolescente cuyo objetivo es convertirse en Hokage y ser reconocido en su aldea. Aventuras, amistad y poderes ninja se entrelazan en esta épica serie",
      manga: "Naruto",
      autor: "Masashi Kishimoto",
      image: "https://http2.mlstatic.com/D_NQ_NP_647285-MCO50242530238_062022-O.webp" 
    },
    {
      description: "Yuji Itadori, estudiante, se convierte en anfitrión de una poderosa maldición. Junto a hechiceros, lucha contra seres sobrenaturales. Acción, magia y oscuros secretos en esta serie",
      manga: "Jujutsu Kaisen",
      autor: "Gege Akutami",
      image: "https://www.comicquestcol.com/wp-content/uploads/2021/01/JUJU-1.jpg" 
    }
  ]

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
  }

  close(){
    this.storage.set("isIndexShowed", true)
    this.router.navigateByUrl("/menu/home")
  }

}
