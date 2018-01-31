import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	wallet:any;
	btcWallet:any;
	ltcWallet:any;
	totalBalance:number;
	ethPrice:any;
	btcPrice:any;
	ltcPrice:any;
	Math:Math = Math;
	btcAddress:string;
  ethAddress:string;
  ltcAddress:string;
	coinData:any;
  btcPriceData:any;
  btcPriceLast7Days:any = [];

	@ViewChild('lineCanvasBTC', {read: ElementRef}) lineCanvasBTC: ElementRef;
	@ViewChild('lineCanvasLTC', {read: ElementRef}) lineCanvasLTC: ElementRef;
	@ViewChild('lineCanvasETH', {read: ElementRef}) lineCanvasETH: ElementRef;
	public lineChart: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public storage: Storage) {
  	this.getBtcEthLtcPrices();
    
  }

  ngAfterViewInit(){

  }

  ionViewDidLoad(){
  	this.ethChart();
  	this.btcChart(); 
  	this.ltcChart();
  }

  ionViewWillEnter(){
    this.totalBalance = 0;
  
  	this.storage.get('wallet').then((val) => {
  		if(val != null){
  			this.ethAddress = JSON.parse(val);
  			this.restProvider.getWallet(this.ethAddress).subscribe(wallet => {
		  		this.wallet = wallet;
		  		this.getImgUrls();
		  		//add total balance
          this.totalBalance += (this.wallet.ETH.balance * this.ethPrice);
		  		this.wallet.tokens.forEach(obj => {
            this.totalBalance += (obj.tokenInfo.price.rate * (obj.balance * Math.pow(10, -obj.tokenInfo.decimals)));
          });

	  		});
  		}else{
  			//this.ethAddress = "";
  		}
  	})
    this.storage.get('btcWallet').then((val) => {
      if(val != null){
        this.btcAddress = JSON.parse(val);
        this.restProvider.getBTCtxs(this.btcAddress).subscribe(txs => {
          this.btcWallet = txs;
          //add total balance
          this.totalBalance += (this.btcPrice * (this.btcWallet.balance * Math.pow(10, -8)));
        });
      }else{
        //
      }
    })
    this.storage.get('ltcWallet').then((val) => {
      if(val != null){
        this.ltcAddress = JSON.parse(val);
        this.restProvider.getLTCtxs(this.ltcAddress).subscribe(txs => {
          this.ltcWallet = txs;
          //add total balance
          this.totalBalance += (this.ltcPrice * (this.ltcWallet.balance * Math.pow(10, -8)));
        });
      }else{
        //
      }
    })

  }

  btcChart(){
    this.restProvider.getCoinPriceHistory('BTC').subscribe(res => {
      let coinHistory = res['Data'].map((a) => (a.close));
      let coinTimes = res['Data'].map((a) => (a.time));

    this.lineChart = new Chart(this.lineCanvasBTC.nativeElement, {
        type: 'line',
        options: {
	        legend: {
	            display: false,
	        	},
	        scales: {
	            xAxes: [{
	                 display: false
	               }],
	            yAxes: [{
	                 display: false
	               }]
	            },
        	},
        data: {
            labels: coinTimes,
            datasets: [
                {
                    label: "Today",
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "rgba(255,153,0,0.4)",
                    borderColor: "rgba(255,153,0,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(255,153,0,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255,153,0,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: coinHistory,
                    spanGaps: false,
                    }
                ]
            }
 
        });
    });
    
  }

  ethChart(){
    this.restProvider.getCoinPriceHistory('ETH').subscribe(res => {
      let coinHistory = res['Data'].map((a) => (a.close));
      let coinTimes = res['Data'].map((a) => (a.time));

    this.lineChart = new Chart(this.lineCanvasETH.nativeElement, {
        type: 'line',
        options: {
	        legend: {
	            display: false,
	        	},
	        scales: {
	            xAxes: [{
	                 display: false
	               }],
	            yAxes: [{
	                 display: false
	               }]
	            },
        	},
        data: {
            labels: coinTimes,
            datasets: [
                {
                    label: "Today",
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "rgba(4,4,4,0.4)",
                    borderColor: "rgba(4,4,4,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(4,4,4,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(4,4,4,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: coinHistory,
                    spanGaps: false,
                    }
                ]
            }
 
        });
    });
    
  }

  ltcChart(){
    this.restProvider.getCoinPriceHistory('LTC').subscribe(res => {
      let coinHistory = res['Data'].map((a) => (a.close));
      let coinTimes = res['Data'].map((a) => (a.time));

    this.lineChart = new Chart(this.lineCanvasLTC.nativeElement, {
        type: 'line',
        options: {
	        legend: {
	            display: false,
	        	},
	        scales: {
	            xAxes: [{
	                 display: false
	               }],
	            yAxes: [{
	                 display: false
	               }]
	            },
        	},
        data: {
            labels: coinTimes,
            datasets: [
                {
                    label: "Today",
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "rgba(192,192,192,.4)",
                    borderColor: "rgba(192,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(192,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(192,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: coinHistory,
                    spanGaps: false,
                    }
                ]
            }
 
        });
    });
    
  }

  getBtcEthLtcPrices(){
  	this.restProvider.getCoinPrice('BTC').subscribe(btc => {
		  this.btcPrice = btc['USD'];
	  });
  	this.restProvider.getCoinPrice('ETH').subscribe(eth => {
		  this.ethPrice = eth['USD'];
	  });
  	this.restProvider.getCoinPrice('LTC').subscribe(ltc => {
		  this.ltcPrice = ltc['USD'];
	  });
  }

 

  getImgUrls(){
  	if(this.ethAddress != null) {
  		this.restProvider.getCoinImgs().subscribe(coinData => {
  			this.coinData = coinData;
  			this.wallet.ETH.imgUrl = 'https://www.cryptocompare.com'+this.coinData['Data']['ETH']['ImageUrl'];
  			this.wallet.tokens.forEach(obj => {
  				obj.imgUrl = 'https://www.cryptocompare.com'+this.coinData['Data'][obj.tokenInfo.symbol]['ImageUrl'];
  			})
  		});
	  }
  }

 

}
