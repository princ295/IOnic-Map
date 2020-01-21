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

  search: any = '';
  searchResult = new Array<any>();


  block_hide: boolean = false;
  button_hide: boolean = true;


  autocompleteItems;
  autocomplete;

 
  hide:boolean = false;
  _hide: boolean = true
  service = new google.maps.places.AutocompleteService();
  direction = new google.maps.DirectionsService()

  geoCoder = new google.maps.Geocoder();
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];


  searchChange(){
    this.hide = false
    if(!this.search.trim().length){
      return
    }this.service.getPlacePredictions({input: this.search},prediction =>{
      console.log(prediction)
      this.searchResult = prediction
    })
    console.log(this.search)
  }


  ngOnInit(){
    this.mapElement = this.mapElement.nativeElement;
    this.mapElement.style.width = this.platform.width() +'px';
    this.mapElement.style.height = this.platform.height() +'px';
    this.loadMap()
  }
 
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
  // changing current location address
  async changeSource(item: any){
    console.log('Chanage Souce locations functions excuting .....')
    this.hide = true

    console.log(item)
    this.search = item
    this.map.clear()
    const info: any = await Geocoder.geocode({address:item})

    console.log(info)

    await this.map.moveCamera({
      target: info[0].position,
      zoom:18
    })
    let updatesouce: Marker  = await this.map.addMarkerSync({
      title : 'Update Source Locations',
      icon : '#000',
      animation: GoogleMapsAnimation.BOUNCE,
      position: info[0].position
    });
    console.log('data inserted sucess fully')
    
  }

  // loading  map 
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

    const info: any = await this.geoCoder.geocode({'latLng': myLocation.latLng},(result)=>{
      if(result[0]){
        console.log("----------------------------------------------------------------------")
        console.log(result)
       this.search = result[0].formatted_address
       this.hide = true
      }
    })
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

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
    this.hide = true
    console.log("hide status is true......................")
    this.loading.dismiss()
    this.hide = true
    }
  }
  // searchChanged(){
   
  // }

 async calculateRoute(item: any){
  this.block_hide = await true
  this.map.clear()
   const info: any = await Geocoder.geocode({address:item})
   const source : any = await Geocoder.geocode({address: this.search})
   console.log(info)
   console.log(item)
    this.originMarker = this.map.addMarkerSync({
      title: 'Origin Your Current Location',
      icon: '#000',
      animation: GoogleMapsAnimation.BOUNCE,
      position: source[0].position
    })
    let destinationMarker: Marker  = await this.map.addMarkerSync({
      title : 'Destination Locations',
      icon : 'green',
      animation: GoogleMapsAnimation.BOUNCE,
      position: info[0].position
    });

  await this.direction.route({
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
        color : 'blue',
        width: 3
      })
     this.map.moveCamera({target:point})
    })
    this.button_hide = false
 }


// display new route in map
 async back(){
    try{
      console.log("Getting response ........")
      this.block_hide=await false
      this.button_hide=await true
      this.autocomplete.query=''
      this.map.clear()
    }catch(error){
      console.log(error)
    }
    finally{

    }
 }
}
