//https://www.bram.us/2015/12/04/vibrant-js-extract-prominent-colors-from-an-image/

//http://jariz.github.io/vibrant.js/


window.onload= function () {
    
    document.addEventListener("deviceready", init, false);
//    init();//comment out when testing on phone
};


function init() {
    // Application Code
    
    var options = {
        
        quality: 100, 
        sourceType: Camera.PictureSourceType.CAMERA
    }
    
    $("#palette").on("click", takePic)
    
    function takePic() {
        navigator.camera.getPicture(success, error, options);
    }
    
    function success(imageData) {
        var panel = '<div class="panel panel-default"><div class="panel-body"><img data-src="' + imageData + '"></div></div>'
        $("#result").html(panel);
        
        getPalette()
    }
    
    function getPalette() {
     var example, examples, i, img, len, results;
    examples = document.querySelectorAll('.examples > div');
    results = [];
    for (i = 0, len = examples.length; i < len; i++) {
      example = examples[i];
      img = example.querySelector('img');
      img.setAttribute('src', img.getAttribute('data-src'));
      results.push(img.addEventListener('load', function(e) {
        var color, colorHolder, colorName, colors, j, len1, panel, profile, profileName, profiles, results1, vibrant;
        vibrant = new Vibrant(this);
        panel = e.target.parentElement;
        while (!panel.classList.contains('panel')) {
          panel = panel.parentElement;
        }
//        panel.style.backgroundColor = vibrant.VibrantSwatch.getHex();
        panel.style = vibrant.VibrantSwatch.getHex();
        panel.style.color = vibrant.VibrantSwatch.getTitleTextColor();
        colors = document.createElement('div');
        colors.classList.add('colors');
        panel.querySelector('.panel-body').appendChild(colors);
        profiles = ['VibrantSwatch', 'MutedSwatch', 'DarkVibrantSwatch', 'DarkMutedSwatch', 'LightVibrantSwatch', 'LightMutedSwatch'];
        results1 = [];
        for (j = 0, len1 = profiles.length; j < len1; j++) {
          profileName = profiles[j];
          profile = vibrant[profileName];
          if (!profile) {
            continue;
          }
          colorHolder = document.createElement('div');
          color = document.createElement('div');
          color.classList.add('color');
          color.classList.add('shadow-z-1');
          color.style.backgroundColor = profile.getHex();
          colorName = document.createElement('span');
          colorName.innerHTML = profileName.substring(0, profileName.length - 6);
          colorHolder.appendChild(color);
          colorHolder.appendChild(colorName);
          results1.push(colors.appendChild(colorHolder));
        }
        return results1;
      }));
    }
    return results;   
    }

    
    function error(message) {
        document.write(message);
    } 
     
}