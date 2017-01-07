#pragma strict

//Misc. Variables
 var menu = false;
 private var showingCursor = false;

 //Battle Commands
 var attackselect = false;
 var specialselect = false;
 var bagselect = false;
 var sharestats = false;

 //Allowing the use of Hero and Enemy Scripts
 public var heroscript: Hero;
 public var enemyscript: Enemy;

 //Various Battle Statistics
 public var cripple = false;
 var awardexp = true;
 var awardgold = true;


 //The ability to buy things in the shop
 var headpurchase = false;
 var bodypurchase = false;
 var weaponpurchase = false;

 //Buying Headgear in the shop
 var purchasinghelmet = false;
 var purchasinghood = false;
 var purchasingcap = false;


 //Buying Armor in the Shop
 var purchasingshirt = false;
 var purchasingcloak = false;
 var purchasingplate = false;


 //Allowing the character to equip items
 var openheadequip = false;
 var openbodyequip = false;
 var openweaponequip = false;

 // Buying Weapons in Shop
 var purchasingbat = false;
 var purchasingwand = false;
 var purchasingsword = false;

 //Pickups
 var berrydrop = false;
 var potiondrop = false;
 var crowndrop = false;
 var robedrop = false;
 var scepterdrop = false;

 var crowncandrop = true;
 var robecandrop = true;
 var sceptercandrop = true;

 //Misc. Shop commands
 var buygear = false;
 var purchasefood = false;
 var buypotion = false;
 var buyberry = false;
 var consumableshop = false;
 var buyshop = false;
 var gearselect = false;




 function Start(){


 enemyscript = GetComponent.<Enemy>();
 heroscript = GetComponent.<Hero>();





 }
 
  function OnGUI()
 {
 		//Sharing Enemy and Hero Health in the battle menu
 	   	 GUI.Box (Rect (20, 190, 80, 40), "HP: " + Mathf.Round(heroscript.health) +"/"+ (25 + heroscript.level *5) + "\nMP: " + Mathf.Round(heroscript.mana) + "/" + (8 + heroscript.level*2));
 	   	 GUI.Box(Rect (490,195, 80, 30), "HP: " + Mathf.Round(enemyscript.ehealth) +"/" + (20 + (heroscript.level *5)));
 	   	 GUI.Box(Rect (490,160, 80, 30), "Enemy");

 	

   //Hero's options for combat
   if (menu == true)
   {

   	 
   	//Sharing The hero's stats in combat
 	GUI.Box (Rect (50,10,80,40), " ");
 	
 	if (GUI.Button (Rect (60, 20, 60, 20), "Stats")){
 	 		sharestats = true;
 	 		attackselect = false;
			specialselect = false;
 			bagselect = false;
 	 	}

 	 //Sharing the Hero's attack choices in combat
     GUI.Box (Rect (50, 60,80,110), "Commands");
 
     if (GUI.Button (Rect (60,80,60,20), "Attack")) {
        attackselect = true;
        bagselect = false;
        sharestats = false;
     }

     //Closing out of the attack menu
     if (GUI.Button (Rect (60,140,60,20), "Close")) {
        menu = false;
        attackselect = false;
        bagselect = false;
        specialselect = false;
        sharestats = false;
     }

     //Opening the hero's bag in combat
     if (GUI.Button (Rect (60,110,60,20), "Bag")){
     	bagselect = true;
     	attackselect = false;
     	specialselect = false;
     	sharestats = false;
     }
     //if (GUI.Button (Rect (60, 170, 60, 20), "Debug")){
     //	heroscript.exp = (heroscript.exp +5);
     //	}	
  }

  //Hero's Combat Abilities
  if (attackselect == true){
  	GUI.Box (Rect (140,60,80,110), "Skills");

  		//Selecting the Hero's Special Attacks
  		if (GUI.Button (Rect (150, 80, 60, 20), "Special")){
  			specialselect = true;
  		}

  		// Selecting the Hero's Basic Attacks
  		if (GUI.Button (Rect (150, 110, 60, 20), "Basic")){
  			attackselect = false;
  			specialselect = false;  			

  			heroscript.health = Mathf.Round(heroscript.health - ((enemyscript.eattack)/heroscript.defense));
  			enemyscript.ehealth = Mathf.Round(enemyscript.ehealth - ((((2*heroscript.level)+10)/(250.0))*((heroscript.attack)/(enemyscript.edefense))*(heroscript.basedmg)+2));

  		}

  		// Closing  out of the hero's attack menu
  		if (GUI.Button (Rect (150, 140, 60, 20), "Cancel")){
  			attackselect = false;
  			specialselect = false;
  		}
  }

  //Hero's Special Abilities
  if (specialselect == true){
  	GUI.Box (Rect (230, 20, 80, 140), "Specials");

		//Using "Cripple"
  		if (GUI.Button (Rect (240, 40, 60, 20), "Cripple") && heroscript.mana >= 5){
  			specialselect = false;
  			heroscript.mana = (heroscript.mana - 5);
  			cripple = true;
  			enemyscript.eattack = Mathf.Round(enemyscript.eattack - ((heroscript.magic)));
  			heroscript.health = Mathf.Round(heroscript.health - ((enemyscript.eattack)/heroscript.defense));

  		}

  		//Using "Burst"
  		if (GUI.Button (Rect (240, 70, 60, 20), "Burst") && heroscript.mana >= 2){
  			specialselect = false;
  			heroscript.mana = (heroscript.mana - 2);
  			enemyscript.ehealth = Mathf.Round(enemyscript.ehealth - ((heroscript.magic*4)/(enemyscript.edefense)));
  			heroscript.health = Mathf.Round(heroscript.health - ((enemyscript.eattack)/heroscript.defense));

  		}

  		//Using "Recover"
  		if (GUI.Button (Rect (240, 100, 60, 20), "Recover") && heroscript.mana >= 4){
  			specialselect = false;
  			heroscript.health = (heroscript.health + (3 + (2 * heroscript.magic)));
  			heroscript.mana = (heroscript.mana - 4);
  			heroscript.health = Mathf.Round(heroscript.health - ((enemyscript.eattack)/heroscript.defense));

  		}

  		//Closing out of the special abilities menu
  		if (GUI.Button (Rect (240, 130, 60, 20), "Cancel")){
  			specialselect = false;
  			heroscript.health = Mathf.Round(heroscript.health - ((enemyscript.eattack)/heroscript.defense));

  		}
  }

  //Hero's Bag
  if (bagselect == true){
  	GUI.Box (Rect (140, 60, 90, 110), "Bag");

		//Using the hero's stock of potions
  		if ((GUI.Button (Rect (150, 80,70, 20), "Potion: " + heroscript.potioncount) && (heroscript.potioncount > 0))){
  			var drinkpotion = true;
  			if(drinkpotion == true){
  				heroscript.potioncount = heroscript.potioncount -1;
  				heroscript.health = Mathf.Round(heroscript.health + ((heroscript.health)/2));
  				drinkpotion = false;
  			}
  		}

  		//Using the hero's stock of berries
  		if ((GUI.Button (Rect (150, 110,70, 20), "Berry: " + heroscript.berrycount) && (heroscript.berrycount > 0))){
  			var eatberry = true;
  			if(eatberry == true){
  				heroscript.berrycount = heroscript.berrycount -1;
  				heroscript.mana = Mathf.Round(heroscript.mana + ((heroscript.mana)/2));
  				eatberry = false;
  			}
  		}

  		//Closing out of the Hero's bag
  		if (GUI.Button (Rect (150, 140, 70, 20), "Cancel")){
  			bagselect = false;
  		}
  }

  //Hero's stat breakdown
  if (sharestats == true){
  	 GUI.Box (Rect (140, 60, 80, 110), "Stats" +"\nATK:" + heroscript.attack + "\nDEF: " + heroscript.defense + "\nMAGIC: " + heroscript.magic + "\nSPD: " + heroscript.speed);
  	 	if (GUI.Button (Rect (150, 140, 60, 20), "Close")){
  		sharestats = false;
  	}
  }

  //Enemy Stats and Combat Log
	if (menu == true){
	if (cripple ==true){
		GUI.Box(Rect (490, 85, 80, 30), "Crippled");
	}

  // Defeating Enemy and Awarding your stats
	}
	if (menu == true && enemyscript.ehealth == 0){
		GUI.Box(Rect (320, 10, 160, 160), "Victory!");
				var stopgeneratingberry = false;

			//Supposed Drop system that did not actually work out (currently does nothing)
			if(stopgeneratingberry == false){
				var berryrange = Random.Range(1, 1);

				if(berryrange > 0 && berryrange < 11){
				stopgeneratingberry = true;
				}
				if(berryrange == 1){
					berrydrop = true;
				}
			}

		//Closing out of the combat menu
		if( GUI.Button (Rect (350, 40, 100, 50), "Close")){
			menu = false;
		}

		//Reseting the enemy
		if( GUI.Button (Rect (350, 100, 100, 50), "Keep Fighting")){
			// Rewards/Reset
			heroscript.health = (25 + heroscript.level *5);
			heroscript.mana = (8 + heroscript.level *2);
			awardexp = true;
			awardgold = true;

				stopgeneratingberry = false;

			var potionrange;
			var crownrange; 
			var roberange;
			var scepterrange;


			// Reseting the enemy
			enemyscript.ehealth = 20 + (heroscript.level *5);
			cripple = false;
			enemyscript.eattack = 10 + (heroscript.level*3);
			enemyscript.edefense= 5 + (heroscript.level*3);

		}
	//Awarding the Hero with experience and gold
	if (enemyscript.ehealth == 0 && awardexp == true && awardgold == true){

		heroscript.gold =heroscript.gold +20;
		heroscript.exp = heroscript.exp +20;
		awardexp = false;
		}
	}

	//Opening the out of combat menu
	if (menu == false){

		//Level
		GUI.Box (Rect (50, 10, 80, 40), " ");
		GUI.Button (Rect (60, 20, 60, 20), "Lvl: " + heroscript.level);
		GUI.Box (Rect (140, 10, 80, 40), " ");
		GUI.Button (Rect (150, 20,60, 20), "¥: " + heroscript.gold);

		//Outside of Combat Menu
		GUI.Box (Rect (50 , 60, 80, 110), "Equipment");

		// Opening up the gear menu
		if(GUI.Button (Rect (60, 80, 60, 20), "Gear")){
				gearselect = true;
				buyshop = false;
				consumableshop = false;
				buyberry = false;
				buypotion = false;
			}

		// Opening up the Shop menu
		if(GUI.Button (Rect (60, 110, 60, 20), "Shop")){
				gearselect = false;
				buyshop = true;
				consumableshop = false;
				buyberry = false;
				buypotion = false;
			}

		//Returning to combat
		if(GUI.Button (Rect (60, 140, 60, 20), "Return")){
				menu = true;
				gearselect = false;
				buyshop = false;
				consumableshop = false;
				buyberry = false;
				buypotion = false;
			}

	//Equiping your gear
	if(gearselect == true && menu == false){

			
			GUI.Box(Rect (140, 60, 80 , 140), "Equip Gear");  

			//Equiping your headgear
			if(GUI.Button (Rect (150, 80, 60, 20), "Head")){
				openheadequip = true;
				openbodyequip = false;
				openweaponequip = false;
			}

			//Equiping your body armor
			if((GUI.Button (Rect (150, 110, 60, 20), "Body")) && gearselect == true){
				openbodyequip = true;
				openheadequip = false;
				openweaponequip = false;
			}

			//Equiping your weapon
			if((GUI.Button (Rect (150, 140, 60, 20), "Weapon")) && gearselect == true){
				openweaponequip = true;
				openheadequip = false;
				openbodyequip = false;
			}

			//Exiting the combat menu
			if((GUI.Button (Rect (150, 170, 60, 20), "Cancel")) && gearselect == true){
				gearselect = false;
				openweaponequip = false;
				openheadequip = false;
				openbodyequip = false;
			}
		}

		//Equiping your headgear
		if(gearselect == true && openheadequip == true){
			GUI.Box(Rect (230, 60, 80, 200), "Headgear");

			//Equip Cap
			if(heroscript.cap == true){
				if(GUI.Button (Rect (240, 80, 60, 20), "Cap")){
					heroscript.capon = true;
					heroscript.helmeton = false;
					heroscript.hoodon = false;
				}
			}

			//Equip Hood
			if(heroscript.hood == true){
				if(GUI.Button (Rect (240, 110, 60, 20), "Hood")){
					heroscript.hoodon = true;
					heroscript.capon = false;
					heroscript.helmeton = false;
				}
			}

			//Equip Helmet
			if(heroscript.helmet == true){
				if(GUI.Button (Rect (240, 130, 60, 20), "Helmet")){
					heroscript.helmeton = true;
					heroscript.capon = false;
					heroscript.hoodon = false;
				}
			}

			//Closing out of your headgear equip menu
			if(GUI.Button (Rect (240, 230, 60, 20), "Close")){
				openheadequip = false;
			}
		}

		//Equiping your body armor
		if(gearselect == true && openbodyequip == true){
			GUI.Box(Rect (230, 60, 80, 200), "Bodygear");

			//Equip shirt
			if(heroscript.shirt == true){
				if(GUI.Button (Rect (240, 80, 60, 20), "Shirt")){
					heroscript.shirton = true;
					heroscript.cloakon = false;
					heroscript.plateon = false;
				}
			}

			//Equip Cloak
			if(heroscript.cloak == true){
				if(GUI.Button (Rect (240, 110, 60, 20), "Cloak")){
					heroscript.shirton = false;
					heroscript.cloakon = true;
					heroscript.plateon = false;
				}
			}

			//Equip plate
			if(heroscript.plate == true){
				if(GUI.Button (Rect (240, 130, 60, 20), "Plate")){
					heroscript.shirton = false;
					heroscript.cloakon = false;
					heroscript.plateon = true;
				}
			}

			//Closing out of your body armor equip menu
			if(GUI.Button (Rect (240, 230, 60, 20), "Close")){
				openbodyequip = false;
			}
		}

		//Equping your weaponry
		if(gearselect == true && openweaponequip == true){
			GUI.Box(Rect (230, 60, 80, 200), "Weaponry");

			//Equip bat
			if(heroscript.bat == true){
				if(GUI.Button (Rect (240, 80, 60, 20), "Bat")){
					heroscript.baton = true;
					heroscript.wandon = false;
					heroscript.swordon = false;
				}
			}

			//Equip wand
			if(heroscript.wand == true){
				if(GUI.Button (Rect (240, 110, 60, 20), "Wand")){
					heroscript.wandon = true;
					heroscript.baton = false;
					heroscript.swordon = false;
				}
			}

			//Equip sword
			if(heroscript.sword == true){
				if(GUI.Button (Rect (240, 130, 60, 20), "Sword")){
					heroscript.swordon = true;
					heroscript.baton = false;
					heroscript.wandon = false;
				}
			}

			//Closing out of your weapon equip menu
			if(GUI.Button (Rect (240, 230, 60, 20), "Close")){
				openweaponequip = false;
			}
		}
	//Sharing what is equipped//
	GUI.Box(Rect (600, 10, 160, 110), "Equipment");

	//Sharing what headgear is equipped
		if(heroscript.headtype == 0){
		GUI.Button(Rect (620, 30, 120, 20), "Head: Nothing"); 
		}
		if(heroscript.headtype == 1){
		GUI.Button(Rect (620, 30, 120, 20), "Head: Cap"); 
		}
		if(heroscript.headtype == 2){
		GUI.Button(Rect (620, 30, 120, 20), "Head: Hood"); 
		}
		if(heroscript.headtype == 3){
		GUI.Button(Rect (620, 30, 120, 20), "Head: Helmet"); 
		}

	//Sharing what body armor is equipped
		if(heroscript.bodytype == 0){
			GUI.Button(Rect (620, 60, 120, 20), "Body: Nothing"); 
		}
		if(heroscript.bodytype == 1){
		GUI.Button(Rect (620, 60, 120, 20), "Body: Shirt"); 
		}
		if(heroscript.bodytype == 2){
		GUI.Button(Rect (620, 60, 120, 20), "Body: Cloak"); 
		}
		if(heroscript.bodytype == 3){
		GUI.Button(Rect (620, 60, 120, 20), "Body: Plate");
		}

	//Sharing what weapon is equipped
		if(heroscript.weapontype == 0){
		GUI.Button(Rect (620, 90, 120, 20), "Weapon: Nothing"); 
		}
		if(heroscript.weapontype == 1){
		GUI.Button(Rect (620, 90, 120, 20), "Weapon: Bat"); 
		}
		if(heroscript.weapontype == 2){
		GUI.Button(Rect (620, 90, 120, 20), "Weapon: Wand"); 
		}
		if(heroscript.weapontype == 3){
		GUI.Button(Rect (620, 90, 120, 20), "Weapon: Sword"); 
		}

	//Navigating your equipment shop//
	if(buyshop == true && menu == false){
			GUI.Box(Rect (140, 60, 80, 110), "Shop");

			if(GUI.Button(Rect (150, 80, 60, 20), "Gear")){
				consumableshop = false;
				buyberry = false;
				buypotion = false;
				buygear = true;

			}
			//Selecting what gear type to buy
			if(buygear == true && menu == false){
						GUI.Box(Rect (230, 60, 80, 140), "Equipment");

						//Buy some headgear
							if(GUI.Button(Rect (240, 80, 60, 20), "Head")){
									headpurchase = true;
									bodypurchase = false;
									weaponpurchase = false;
								}

						//Buy some body armor
							if(GUI.Button(Rect (240, 110, 60, 20), "Body")){
									bodypurchase = true;
									headpurchase = false;
									weaponpurchase = false;
								}

						//Buy a weapon
							if(GUI.Button(Rect (240, 140, 60, 20), "Weapon")){
									weaponpurchase = true;
									bodypurchase = false;
									headpurchase = false;
								}

						//Close out of your menu
							if(GUI.Button(Rect (240, 170, 60, 20), "Close")){
									buygear = false;
									weaponpurchase = false;
									bodypurchase = false;
									headpurchase = false;
								}
					}

			//headgear purchase
			if(buygear == true && headpurchase == true){
				GUI.Box(Rect (320, 60, 80, 140), "Head");

			//Buy a cap
				if((GUI.Button (Rect (330, 80, 60, 20), "Cap") && headpurchase == true)){
					purchasingcap = true;
					purchasinghood = false;
					purchasinghelmet = false;
				}

			//Buy a hood
				if((GUI.Button (Rect (330, 110, 60, 20), "Hood") && headpurchase == true)){
					purchasinghood = true;
					purchasinghelmet = false;
					purchasingcap = false;
				}

			//Buy a helmet
				if((GUI.Button (Rect (330, 140, 60, 20), "Helmet") && headpurchase == true)){
					purchasinghelmet = true;
					purchasinghood = false;
					purchasingcap = false;
				}

			//Close out of your headgear burchase menu
				if(GUI.Button(Rect (330, 170, 60, 20), "Close")){
					headpurchase = false;
				}

			}

		//Purchasing your cap
			if(purchasingcap == true && headpurchase == true && buygear == true && heroscript.cap == false){
				GUI.Box(Rect(410, 65, 160, 130), "Buy a cap that \ngives some magic?");
				if((GUI.Button (Rect (420,110, 65,70), "Buy: 20¥")) && heroscript.gold >= 20 && purchasingcap == true){
					heroscript.gold = heroscript.gold - 20;
					purchasingcap = false;
					heroscript.cap = true;
				}
				if(GUI.Button (Rect (495,110, 65,70), "Cancel")){
					purchasingcap = false;
				}
				 
			}

		//Purchasing your hood
			if(purchasinghood == true && headpurchase == true && buygear == true && heroscript.hood == false){
				GUI.Box(Rect(410, 65, 160, 130), "Buy a hood that \ngives more magic?");
				if((GUI.Button (Rect (420,110, 65,70), "Buy: 40¥")) && heroscript.gold >= 40 && purchasinghood == true){
					heroscript.gold = heroscript.gold - 40;
					purchasinghood = false; 
					heroscript.hood = true;
				}
				if(GUI.Button (Rect (495,110, 65,70), "Cancel")){
					purchasinghood = false;
				}
			}

		//Purchasing your helmet
			if(purchasinghelmet == true && headpurchase == true && buygear == true && heroscript.helmet == false){
				
				GUI.Box(Rect(410, 65, 160, 130), "Buy a helmet that \ngives lots of magic?");
				if((GUI.Button (Rect (420,110, 65,70), "Buy: 60¥")) && heroscript.gold >= 60 && purchasinghelmet == true){
					heroscript.gold = heroscript.gold - 60;
					purchasinghelmet = false; 
					heroscript.helmet = true;
				}
				if(GUI.Button (Rect (495,110, 65,70), "Cancel")){
					purchasinghelmet = false;
				}
			}


			//bodygear purchase
			if(buygear == true && bodypurchase == true){
				GUI.Box(Rect (320, 60, 80, 140), "Body");

			//Buy a shirt
				if((GUI.Button(Rect (330, 80, 60, 20), "Shirt")&& bodypurchase == true)){
					purchasingshirt = true;
					purchasingcloak = false;
					purchasingplate = false;
				}

			//Buy a cloak
				if((GUI.Button(Rect (330, 110, 60, 20), "Cloak") && bodypurchase == true)){
					purchasingshirt = false;
					purchasingcloak = true;
					purchasingplate = false;
				}

			//Buy a plate
				if((GUI.Button(Rect (330, 140, 60, 20), "Plate") && bodypurchase == true)){
					purchasingshirt = false;
					purchasingcloak = false;
					purchasingplate = true;
				}

			//Close out of your body armor purchase menu
				if(GUI.Button(Rect (330, 170, 60, 20), "Close")){
					bodypurchase = false;
				}
			}
			if(purchasingshirt == true && bodypurchase == true && buygear == true && heroscript.shirt == false){
				GUI.Box(Rect (410,65,160,130), "Buy a shirt that \ngives some defense?");
				if((GUI.Button (Rect (420,110,65,70), "Buy: 20¥")) && heroscript.gold >= 20 && purchasingshirt == true){
					heroscript.gold = heroscript.gold -20;
					purchasingshirt = false;
					heroscript.shirt = true;
				}
				if((GUI.Button (Rect (495, 110, 65, 70), "Cancel"))){
					purchasingshirt = false;
				}
			}

			if(purchasingcloak == true && bodypurchase == true && buygear == true && heroscript.cloak == false){
				GUI.Box(Rect (410,65,160,130), "Buy a cloak that \ngives more defense?");
				if((GUI.Button (Rect (420,110,65,70), "Buy: 40¥")) && heroscript.gold >= 40 && purchasingcloak == true){
					heroscript.gold = heroscript.gold -40;
					purchasingcloak = false;
					heroscript.cloak = true;
				}
				if((GUI.Button (Rect (495, 110, 65, 70), "Cancel"))){
					purchasingcloak = false;
				}
			}

			if(purchasingplate == true && bodypurchase == true && buygear == true && heroscript.plate == false){
				GUI.Box(Rect (410,65,160,130), "Buy a chestplate that \ngives lots of defense?");
				if((GUI.Button (Rect (420,110,65,70), "Buy: 60¥")) && heroscript.gold >= 60 && purchasingplate == true){
					heroscript.gold = heroscript.gold -60;
					purchasingplate = false;
					heroscript.plate = true;
				}
				if((GUI.Button (Rect (495, 110, 65, 70), "Cancel"))){
					purchasingplate = false;
				}
			}
			//weapon purchasing
			if(buygear == true && weaponpurchase == true){
				GUI.Box(Rect (320, 60, 80, 140), "Weapon");
				if((GUI.Button(Rect (330, 80, 60, 20), "Bat")) && weaponpurchase == true){
					purchasingbat = true;
					purchasingwand = false;
					purchasingsword = false;
				}
				if((GUI.Button(Rect (330, 110, 60, 20), "Wand")) && weaponpurchase == true){
					purchasingbat = false;
					purchasingwand = true;
					purchasingsword = false;
				}
				if((GUI.Button(Rect (330, 140, 60, 20), "Sword")) && weaponpurchase == true){
					purchasingbat = false;
					purchasingwand = false;
					purchasingsword = true;
				}
				if(GUI.Button(Rect (330, 170, 60, 20), "Close")){
					weaponpurchase = false;
				}
			}
			if(purchasingbat == true && weaponpurchase == true && buygear == true && heroscript.bat == false){
				GUI.Box(Rect (410,65,160,130), "Buy a bat that \ngives some attack?");
				if((GUI.Button (Rect (420,110,65,70), "Buy: 20¥")) && heroscript.gold >= 20 && purchasingbat == true){
					heroscript.gold = heroscript.gold -20;
					purchasingbat = false;
					heroscript.bat = true;
				}
				if((GUI.Button (Rect (495, 110, 65, 70), "Cancel"))){
					purchasingbat = false;
				}
			}
			if(purchasingwand == true && weaponpurchase == true && buygear == true && heroscript.wand == false){
				GUI.Box(Rect (410,65,160,130), "Buy a wand that \ngives more attack?");
				if((GUI.Button (Rect (420,110,65,70), "Buy: 40¥")) && heroscript.gold >= 40 && purchasingwand == true){
					heroscript.gold = heroscript.gold -40;
					purchasingwand = false;
					heroscript.wand = true;
				}
				if((GUI.Button (Rect (495, 110, 65, 70), "Cancel"))){
					purchasingwand = false;
				}
			}
			if(purchasingsword == true && weaponpurchase == true && buygear == true && heroscript.wand == false){
				GUI.Box(Rect (410,65,160,130), "Buy a sword that \ngives lots of attack?");
				if((GUI.Button (Rect (420,110,65,70), "Buy: 60¥")) && heroscript.gold >= 60 && purchasingsword == true){
					heroscript.gold = heroscript.gold -60;
					purchasingsword= false;
					heroscript.sword = true;
				}
				if((GUI.Button (Rect (495, 110, 65, 70), "Cancel"))){
					purchasingsword = false;
				}
			}




			if(GUI.Button(Rect (150, 110, 60, 20), "Food")){
				consumableshop = true;
				buygear = false;
			}

			if(GUI.Button(Rect (150, 140, 60, 20), "Cancel")){
				buyshop = false;
				consumableshop = false;
				buyberry = false;
				buypotion = false;
				buygear = false;
			}
		}
	if(consumableshop == true && menu == false){
		GUI.Box(Rect (230, 60, 80, 110), "Consumable");
		if(GUI.Button(Rect (240, 80, 60, 20), "Potion")){
			buypotion = true;
			buyberry = false;
		}
		if(GUI.Button(Rect (240, 110, 60, 20), "Berry")){
			buyberry = true;
			buypotion = false;
		}
		if(GUI.Button(Rect (240, 140, 60, 20), "Close")){
			buyberry = false;
			buypotion = false;
			consumableshop = false;
		}
		if(buyberry == true && menu == false && heroscript.gold >= 10){
			GUI.Box(Rect (320, 60, 200, 120), "Buy a berry that restores mana?");
			if(GUI.Button(Rect (330, 90, 80, 80), "Buy: 10¥")){
					purchasefood = true;
				}
			if(GUI.Button(Rect (430, 90, 80, 80), "Cancel")){
					buyberry = false;
				}
			
			}
		if(buypotion == true && menu == false && heroscript.gold >= 10){
			GUI.Box(Rect (320, 60, 200, 120), "Buy a potion that restores health?");
			if(GUI.Button(Rect (330, 90, 80, 80), "Buy: 10¥")){
					purchasefood = true;
				}
			if(GUI.Button(Rect (430, 90, 80, 80), "Cancel")){
					buypotion = false;
				}
			}
		}
	}
	
	if(purchasefood == true && buyberry == true){
			heroscript.gold = heroscript.gold -10;
			heroscript.berrycount = heroscript.berrycount + 1;
			purchasefood = false;
		}
	if(purchasefood == true && buypotion == true){
			heroscript.gold = heroscript.gold -10;
			heroscript.potioncount = heroscript.potioncount +1;
			purchasefood = false;
			}
		}
	
function Update(){
 
     //check if pause button (escape key) is pressed
     if(Input.GetKeyDown("b")){
 
         //check if game is already paused       
         if(showingCursor == true){
         showingCursor = false;
         menu = false;
         attackselect = false;
         specialselect = false;
         bagselect = false;
         sharestats = false;
         }
 
         //else if game isn't paused, then pause it
         else if(showingCursor == false){
         Cursor.visible = true;
         showingCursor = true;
         menu = true;
         }
     }
 }
