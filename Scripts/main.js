var imgdate;

var ctx;

//var canvas = document.getElementById("myCanvas");
//var context = canvas.getContext("2d");


window.onload = function() {
  var c = document.getElementById("canvas");
  ctx = c.getContext("2d");
  var img = document.getElementById("pic");
  ctx.drawImage(img, 10, 10, 50, 50);

}

function copy(){
  //just places image over the top of previous
  //need to figure out how to clear canvas for this and the gen algo
  var get = document.getElementById("pic");
  ctx.drawImage(get, 10, 10, 60, 60);
  //var copyImg =
}

function create() {
  console.log("hi");
  var imgData = ctx.getImageData(10, 10, 50, 50);
  var test = ctx.getImageData(10, 10, 50, 50).data;
  imgdate = test;
  //console.log(imgdate.length);
  setup();
  draw();
}

var mutationRate;
var totalPopulation = 100;
var generation = 0;

var population = [];
var matingPool = [];

var target;
var newImg;

//make population class and have a call in draw() maybe
//class Population{

  function setup(){
    // will be the image uploaded to website
    target = imgdate;
    mutationRate = 0.1;

    //initialize pop
    for(let i = 0; i < totalPopulation; i++){
      population.push(new DNA());
      population[i].genGenes();
    }
  }


  function draw(){
    //calc fitness and genes
    for(let i = 0; i < population.length; i++){
      population[i].calcFitness();
    }

    matingPool = [];

    //add each member n times from fitness
    //have option on webpage to use other selection options
    for(let i = 0; i < population.length; i++){
      var n = Math.round(population[i].fitness * 10000);
      for(let j = 0; j < n; j++){
        matingPool.push(population[i]);

      }
      //console.log(matingPool);
      //console.log(n + " " + population[i].fitness);
    }

    var best = new DNA();
    for(let i = 0; i < population.length; i++){
      //gets the best of the population kinda
      if(population[i].fitness > best.fitness){
        best = population[i];
      }
      //find better way of doing this
      var a = Math.floor(Math.random() * matingPool.length);
      var b = Math.floor(Math.random() * matingPool.length);
      var partnerA = matingPool[a];
      var partnerB = matingPool[b];
      var child = partnerA.crossover(partnerB);
      child.mutate(mutationRate);
      population[i] = child;

    }

    //var str = best.genes.join("");
    //console.log(str + "HIYA " + best.fitness + " " + matingPool.length);
    //loops
    //if(best.fitness == 1){
      //console.log("yaya we got it " + str);
      if(generation = 50){
        console.log("hi" + generation);
        generation++;
        draw();
      }else{
        console.log("made" + generation);
        newImg = ctx.createImageData(50, 50);
        for(let i = 0; i < best.genes.length; i++){
          newImg.data[i] = best.genes[i];
        }
        ctx.putImageData(newImg, 10, 100);
        //draw();
      }



  }


function DNA(){
  this.genes = [];
  this.fitness = 0;
  this.genGenes = function(){
    for(let i = 0; i < target.length; i++){
      this.genes.push(Math.floor(Math.random() *255));
    }
  };
  this.calcFitness = function(){
    var score = 0;
    for(let i = 0; i < this.genes.length; i++){
      if(this.genes[i] == target[i]){
        score++;
      }
    }
    this.fitness = score/target.length;
  };
  this.crossover = function(partner){
    // rewrite to midpoint or have that as option on website
    var child = new DNA();
    //var midpoint = Math.floor(Math.random() * this.genes.length);
    var rando;
    for(let i = 0; i < this.genes.length; i++){
      rando = Math.random();
      if(rando < 0.5){
        child.genes.splice(i, 1, this.genes[i]);
      } else{
        child.genes.splice(i, 1, partner.genes[i]);
      }
    }
    return child;
  };
  this.mutate = function(mutationRate){
    for(let i = 0; i < this.genes.length; i++){
      if(Math.random() < mutationRate){
        this.genes[i] = Math.floor(Math.random() *255);
      }
    }
  }
}
