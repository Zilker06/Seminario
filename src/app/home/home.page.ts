import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusicService } from '../services/music.service';
import { ModalController } from '@ionic/angular';
import { SongModalPage } from '../song-modal/song-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  artistsJson: any;
  artists: any;
  song = {
    name : '',
    playing: false,
    preview_url: ''
  }
  currentSong:any = '';
  newTime:any;
  constructor(private router:Router, private musicService: MusicService, private modalController: ModalController){}
  
  close(){
    this.router.navigateByUrl("/index")
  }

  ngOnInit() {
    this.artistsJson = this.musicService.getArtistsJson().artists;
    console.log("Json", this.artistsJson)
    this.musicService.getArtists().then(data =>{
      this.artists = data;
      console.log(data)
    })
  }

  async showSongs(artists:any){
    console.log(artists)
    const songs = await this.musicService.getArtistTracks(artists.id)
    const modal = await this.modalController.create({
      component: SongModalPage,
      componentProps: {
        name: artists.name,
        id: artists.id,
        songs: songs
      }
    });
    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data;
    })

    modal.present();
  }

  play(){
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", ()=>{
      this.newTime = (1 / this.currentSong.duration) * this.currentSong.currentTime;
    })
    this.song.playing = true;
  }

  pause(){
    this.currentSong.pause();
    this.song.playing = false;

  }
  
  parseTime(time = "0:00"){
    if (time) {
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime/60).toString();
      if (minutes.length == 1){
        minutes = "0" + minutes;
      }
      let seconds = (partTime % 60).toString();
      if (seconds.length == 1){
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds
    }
    return null
  }
}
/* 

Crear 4 slides
Asignar estilos y diseño
Modificar alguna custom propierty

*/ 