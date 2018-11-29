import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class CloudProvider {
  files:any = [
    { url: 'https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3',
      name: 'Perfect by Ed Sheeran'
    },
    {
      url: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
      name: 'Man Atkeya Beparwah by Nusrat Fateh Ali Khan'
    },
    { url: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
      name: 'Penny Lane by The Beatles'
    }
  ];
  getFiles() {
    return of(this.files);
  }
}
