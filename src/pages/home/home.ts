import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CloudProvider} from '../../providers/cloud/cloud';
import {AudioProvider} from "../../providers/audio/audio";
import {Store} from '@ngrx/store';
import {pluck, filter, map, distinctUntilChanged} from 'rxjs/operators';
import {CANPLAY, LOADEDMETADATA, PLAYING, TIMEUPDATE, LOADSTART, RESET} from '../../providers/store/store';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  files: any = [];
  currentFile: any = {};
  constructor(public navCtrl: NavController, public cloudProvider: CloudProvider,  public audioProvider: AudioProvider
  ,private store: Store<any>
  ) {
    this.getDocuments();

  }


  getDocuments() {
    this.cloudProvider.getFiles().subscribe(files => {
      this.files = files;
      console.log(this.files);
    });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.playStream(file.url);
  }
  playStream(url) {
    this.resetState();
    this.audioProvider.playStream(url).subscribe(event => {
      const audioObj = event.target;

      switch (event.type) {
        case 'canplay':
          return this.store.dispatch({ type: CANPLAY, payload: { value: true } });

        case 'loadedmetadata':
          return this.store.dispatch({
            type: LOADEDMETADATA,
            payload: {
              value: true,
              data: {
                time: this.audioProvider.formatTime(
                  audioObj.duration * 1000,
                  'HH:mm:ss'
                ),
                timeSec: audioObj.duration,
                mediaType: 'mp3'
              }
            }
          });

        case 'playing':
          return this.store.dispatch({ type: PLAYING, payload: { value: true } });

        case 'pause':
          return this.store.dispatch({ type: PLAYING, payload: { value: false } });

        case 'timeupdate':
          return this.store.dispatch({
            type: TIMEUPDATE,
            payload: {
              timeSec: audioObj.currentTime,
              time: this.audioProvider.formatTime(
                audioObj.currentTime * 1000,
                'HH:mm:ss'
              )
            }
          });

        case 'loadstart':
          return this.store.dispatch({ type: LOADSTART, payload: { value: true } });
      }
    });
  }

  resetState() {
    this.audioProvider.stop();
    this.store.dispatch({ type: RESET });
  }

}
