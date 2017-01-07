#pragma strict

//combat stats
public var health: float = 30.0;
public var mana: float = 10.0;
public var speed: float = 1.0;
public var defense: float = 5.0;
public var attack: float = 10.0;
public var magic: float = 10.0;
public var basedmg: float = 50.0;

//Armor
public var headtype: int = 0;
public var bodytype: int = 0;
public var weapontype: int = 0;

public var oncecap = false;
public var oncehood = false;
public var oncehelmet = false;
public var onceshirt = false;
public var oncecloak = false;
public var onceplate = false;
public var oncebat = false;
public var oncewand = false;
public var oncesword = false;

//Drop system
public var berrydrop;
public var potiondrop;
public var crowndrop;
public var robedrop;
public var scepterdrop;

//Basic Shop Headgear
public var cap = false;
public var hood = false;
public var helmet = false;

public var crown = false;

	//Equiping the Basic Shop Headgear
	public var capon = false;
	public var hoodon = false;
	public var helmeton = false;

	public var crownon = false;

//Basic Shop Armor
public var shirt = false;
public var cloak = false;
public var plate = false;

public var robe = false;

	//Equiping the Basic Shop Armor
	public var shirton = false;
	public var cloakon = false;
	public var plateon = false;

	public var robeon = false;

//Basic Shop Weaponry
public var bat = false;
public var wand = false;
public var sword = false;

public var scepter = false;
	
	//Equiping Basic Shop Weaponry
	public var baton = false;
	public var wandon = false;
	public var swordon = false;

	public var scepteron = false;

//Equipment Key
	//Head
		//Cap- 1
		//Hood- 2
		//Helmet- 3
		//Crown- 4
	//Body
		//Shirt- 1
		//Cloak- 2
		//Plate- 3
		//Robe- 4
	//Weapon
		//Bat- 1
		//Wand- 2
		//Sword- 3
		//Scepter- 4



//Non combat related stats
public var exp: float = 0;
public var level: float = 1;
public var gold: int= 0;
public var berrycount: int = 0;
public var potioncount: int = 0;

function Start () {
	
}

function Update () {
	if(capon == true){
		headtype = 1;
		if(headtype == 1 && oncecap == false){
			magic = (4 + (6*level)) + 10;
			oncecap = true;
			oncehelmet = false;
			oncehood = false;
		}
	}
	if(hoodon == true){
		headtype = 2;
		if(headtype == 2 && oncehood == false){
			magic = (4 + (6*level)) + 15;
			oncehood = true;
			oncehelmet = false;
			oncecap = false;
		}

	}
	if(helmeton == true){
		headtype = 3;
		if(headtype == 3 && oncehelmet == false){
			magic = (4 + (6*level)) + 20;
			oncehelmet = true;
			oncehood = false;
			oncecap = false;
		}
	}

	if(shirton == true){
		bodytype = 1;
		if(bodytype == 1 && onceshirt == false){
			defense = (3 + (2*level)) + 4;
			onceshirt = true;
			oncecloak = false;
			onceplate = false;
		}
	}
	if(cloakon == true){
		bodytype = 2;
		if(bodytype == 2 && oncecloak == false){
			defense = (3 + (2*level)) + 6;
			onceshirt = false;
			oncecloak = true;
			onceplate = false;
		}
	}
	if(plateon == true && onceplate == false){
		bodytype = 3;
		if(bodytype == 3){
			defense = (3 + (2*level)) + 8;
			onceshirt = false;
			oncecloak = false;
			onceplate = true;
		}
	}

	if(baton == true){
		weapontype = 1;
		if(weapontype == 1 && oncebat == false){
			attack = (5 + (5*level)) + 4;
			oncebat = true;
			oncewand = false;
			oncesword = false;
		}
	}
	if(wandon == true && oncewand == false){
		weapontype = 2;
		if(weapontype == 2){
			attack = (5 + (5*level))+ 6;
			oncebat = false;
			oncewand = true;
			oncesword = false;
		}
	}
	if(swordon == true){
		weapontype = 3;
		if(weapontype == 3 && oncesword == false){
			attack = (5 + (5*level)) + 8;
			oncebat = false;
			oncewand = false;
			oncesword = true;
		}
	}

	

	if(exp >= (10 + (level * 2)))
		{
			exp = (exp - (10 + (level * 2)));
			level ++;
			mana = (mana + 2);
			health = (health +5);
			speed ++ ;
			defense = (defense + 2);
			attack = ( attack + 5);
			magic = (magic + 6);
		}

	if( health > (25 + (level *5))){
		health = (25 + level *5);
	}
	if( mana > (8 + (level *2))){
		mana = (8 + (level *2));
	}

	if( mana < 0){
		mana = (0);
}

}

