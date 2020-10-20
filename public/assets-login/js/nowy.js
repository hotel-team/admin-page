var app = new Vue({
    el: '#app',
    data: {
      day: true,
      day_fade_out:false,
      night: false,
      night_fade_out:false,

    },
    methods: {
      toogle: function(){
        if (this.day == true)
        {
          this.day= !this.day;
          this.day_fade_out = !this.day_fade_out;
          
          setTimeout(() => this.night = !this.night, 2000);
          setTimeout(() => this.day_fade_out = !this.day_fade_out, 2000);
        }
        else
        {
          this.night= !this.night;
          this.night_fade_out = !this.night_fade_out;
          ;
          setTimeout(() => this.day = !this.day, 2000);
          setTimeout(() => this.night_fade_out = !this.night_fade_out, 2000);
        }

        }
      }
    }
)