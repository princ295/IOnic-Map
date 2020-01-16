import { Component, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation";


import { Observable } from "rxjs/Observable";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  MyLocation,
  GoogleMapsAnimation,
  Geocoder,
  ILatLng,
} from '@ionic-native/google-maps';

declare let google: any;

import { Platform, LoadingController } from "@ionic/angular";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map',{static: true}) mapElement: any;

  private loading: any;
  private map: GoogleMap;
  private originMarker: Marker;
  public destintion: any;

  autocompleteItems;
  autocomplete;
 
  service = new google.maps.places.AutocompleteService();
  direction = new google.maps.DirectionsService();
// ******************
  directionsDisplay = new google.maps.DirectionsRenderer;

  dservice : any = new google.maps.DistanceMatrixService();
 

  constructor( private platform : Platform,  private loadingCtrl : LoadingController, private zone: NgZone) {
    console.log(google)
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

 getCurrentLocation(){

 // this.loading = await this.loadingCtrl.create({message:'Lodding....'});

 // await this.loading.present()
    
    let option = {timeout: 10000, enableHighAccuracy : true}
    
    let locationObs = Observable.create(observable =>{
    
      Geolocation.getCurrentPosition(option).then(resp => {
        let lat = resp.coords.latitude;
        let lng = resp.coords.longitude;
  
        let location = new google.maps.LatLag(lat, lng)
        
        observable.next(location)
        //this.loading.dismiss()
      }, (err) =>{
        console.log('Geolocation err :'+ err)
      })

    })
  
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'IN'} }, (predictions, status) => {
      me.autocompleteItems = []; 
      me.zone.run( () => {
        predictions.forEach( (prediction) => {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });
  }


  chooseItem(item: any) {
    console.log(item)
    this.autocomplete.query = item
  }


  ngOnInit(){
    this.mapElement = this.mapElement.nativeElement;
    this.mapElement.style.width = this.platform.width() +'px';
    this.mapElement.style.height = this.platform.height() +'px';
    this.loadMap()
  }
  
  async loadMap(){
    console.log(google)
    this.loading = await this.loadingCtrl.create({message:'Map is Loading in Your Screen'});
    await this.loading.present();

    const mapOptions: GoogleMapOptions = {
      controls:{
        zoom: false
      }
    }
    this.map = GoogleMaps.create(this.mapElement); 
    try{
      await  this.map.one(GoogleMapsEvent.MAP_READY)
      this.addOriginMarker()
    }catch(error){
      console.log(error)
    }finally{

    }
  }
  async addOriginMarker(){
   try{
    const myLocation : MyLocation = await this.map.getMyLocation();
  
    console.log(myLocation)
    await this.map.moveCamera({
      target: myLocation.latLng,
      zoom:18
    })
    this.originMarker = this.map.addMarkerSync({
      title: 'Origin Your Current Location',
      icon: '#000',
      animation: GoogleMapsAnimation.BOUNCE,
      position: myLocation.latLng
    })
    console.log(myLocation)
    }
    catch(error){
      console.log(error)
    }finally{
  this.loading.dismiss()
    }
  }
  searchChanged(){
   
  }

 async calculateRoute(item: any){

  const info: any = await Geocoder.geocode({address:item})
  console.log(info)
  console.log(item)
    let destinationMarker: Marker  = await this.map.addMarkerSync({
      title : 'Destination Locations',
      icon : '#000',
      animation: GoogleMapsAnimation.BOUNCE,
      position: info[0].position
    });

    this.direction.route({
      origin: this.originMarker.getPosition(),
      destination  :destinationMarker.getPosition(),
      travelMode :'DRIVING'
    }, async results => {
      console.log(results)
      const point = new Array<ILatLng>();

      const routes =  results.routes[0].overview_path;
      for (let i=0; i < routes.length; i++){
        point[i]={
          lat: routes[i].lat(),
          lng: routes[i].lng()
        }
      }

     await this.map.addPolylineSync({
        points: point,
        color : '#000',
        width: 4
      })
     this.map.moveCamera({target:point})
    })


  // this.dservice.getDistanceMatrix(
  //   {
  //     origins: this.originMarker.getPosition(),
  //     destinations: destinationMarker.getPosition(),
  //     travelMode: 'DRIVING',
  //     unitSystem: google.maps.UnitSystem.METRIC,
  //     avoidHighways: false,
  //     avoidTolls: false,
  //   }, (response, status) => {
  //     console.log(response,status)
  //   })
 
 }

}
