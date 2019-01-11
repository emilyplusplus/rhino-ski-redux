let assetManagerInstance = null;

class AssetManager {
    constructor() {
        this.assets = {};
    }

    static getInstance() {
      if(!assetManagerInstance) {
        assetManagerInstance = new AssetManager();
      }

      return assetManagerInstance;
    }

    getImage(name) {
      return this.assets[name]
    }

    setup() {
      let manager = this

      function loadImages(resolve, reject) {
        fetch('../config/assets.json').then(res => res.json()).then((assets_available) => {
          var assetPromises = [];
  
          _.each(assets_available, function(asset, assetName) {
              var assetImage = new Image();
              var assetDeferred = new $.Deferred();
  
              assetImage.onload = function() {
                  assetImage.width /= GAME_PIXEL_RATIO;
                  assetImage.height /= GAME_PIXEL_RATIO;
  
                  manager.assets[assetName] = assetImage;
                  assetDeferred.resolve();
              };
              assetImage.src = asset;
  
              assetPromises.push(assetDeferred.promise());
          });
  
          Promise.all(assetPromises).then(() => {
            resolve(manager.assets)
          }).catch((err) => {
            reject(err)
          });
        }).catch((err) => {
          reject(err)
        })
      }
      
      return new Promise(loadImages);
    }
}
