export default class Question {
    constructor(id, surra_number,aya_number,audio_file_name,duration_ms,label) {
      this.id = id;
      this.surra_number = surra_number;
      this.aya_number = aya_number;
      this.audio_file_name = audio_file_name;
      this.duration_ms = duration_ms;
      this.label = label;
    }
  }